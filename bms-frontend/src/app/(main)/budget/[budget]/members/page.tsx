"use client";
import { useEffect, useState } from "react";
import { AddMemberButton } from "./components/AddMemberButton";
import { MemberList } from "./components/MemberList";
import { useParams } from "next/navigation";
import { getAdmins, getMembers } from "@/lib/api/budget/budget";
import { SkeletonCard, SkeletonCardList } from "@/components/common";

export default function Page() {
    const [members, setMembers] = useState<Member[]>([]);
    const { budget } = useParams();
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
            console.log(res);
            if (res) {
                setAdmins(res.admins);
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        loadMembers(budget as string);
        loadAdmins(budget as string);
    }, [budget]);



    return (
        <div className="flex justify-center">
            {loading ? <SkeletonCard /> : <div className="flex  flex-col gap-8 w-3/5">
                <div className="w-full flex justify-end">
                    <AddMemberButton onFinish={() =>
                        loadMembers(budget as string)
                    } />
                </div>
                <MemberList
                    admins={admins}
                    members={members}
                    loadAdmins={() => loadAdmins(budget as string)}
                    loadMembers={() => loadMembers(budget as string)}
                />
            </div>}
        </div>
    )
}






