"use client";
import { useEffect, useState } from "react";
import { AddMemberButton } from "./components/AddMemberButton";
import { MemberList } from "./components/MemberList";
import { useParams, useSearchParams } from "next/navigation";
import { getAdmins, getMembers } from "@/lib/api/budget/budget";
import { SkeletonCard } from "@/components/common";

export default function Page() {
    const [members, setMembers] = useState<Member[]>([]);
    const searchParams = useSearchParams();
    const  budget_id  = searchParams.get("budget_id");
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(false);

    const loadMembers = (budgetId: string) => {
        setLoading(true);
        getMembers(budgetId).then((res) => {
            if (res) {
                setMembers(res.members);
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    const loadAdmins = (budgetId: string) => {
        setLoading(true);
        getAdmins(budgetId).then((res) => {
            if (res) {
                setAdmins(res.admins);
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        loadMembers(budget_id as string);
        loadAdmins(budget_id as string);
    }, [budget_id]);



    return (
        <div className="flex justify-center">
            {loading ? <SkeletonCard /> : <div className="flex  flex-col gap-8 w-3/5">
                <div className="w-full flex justify-end">
                    <AddMemberButton onFinish={() =>
                        loadMembers(budget_id as string)
                    } />
                </div>
                <MemberList
                    admins={admins}
                    members={members}
                    loadAdmins={() => loadAdmins(budget_id as string)}
                    loadMembers={() => loadMembers(budget_id as string)}
                />
            </div>}
        </div>
    )
}






