"use client";
import { CAvatar } from "@/components/common";
import { Separator } from "@/components/ui/separator";
import { getUserExpenditure } from "@/lib/api/budget/budget";
import { getInitalsFromName, toMoney } from "@/lib/utils";
import { UserExpenditure, UserExpenditureResponse } from "@/types/transaction";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StatSkeleton } from "./StatSkeleton";

export const AvgUserExpense = () => {
    // const { budget } = useParams();
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const budget_id = searchParams.get("budget_id");
    const [expenditure, setExpenditure] = useState<UserExpenditureResponse>();

    const loadUserExpenditure = (budgetId: string) => {
        setLoading(true);
        getUserExpenditure(budgetId, {
            limit: 3,
        }).then((res) => {
            if (res) {
                setExpenditure(res);
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        loadUserExpenditure(budget_id as string);
    }, []);

    return (
        loading ? <StatSkeleton /> :
            <div className="border rounded-lg p-4 h-[400px]" >
                <h3 className="c-subheading text-secondary text-base" >
                    Avg User Expense
                </h3>
                <h1 className="c-heading-4 mt-3" >
                    {expenditure?.aggregates.currency.symbol}{toMoney(expenditure?.aggregates.avgUserExpenditure, 1)}
                </h1>
                <Separator className="mt-4 mb-1 text-secondary" />
                <h1 className="c-subheading mb-4 text-secondary" >
                    User Expenditure
                </h1>
                <div className="flex flex-col gap-2" >
                    {
                        expenditure?.expenditures.map((itm, index) => {
                            return (
                                <UserExpenditureItem key={index} userExpenditure={itm} />
                            );
                        })
                    }

                </div>
            </div>
    );
};

const UserExpenditureItem = ({ userExpenditure }: { userExpenditure: UserExpenditure }) => {
    return (
        <div className="border-b border-secondary flex justify-between items-center pb-4" >
            <div className="flex gap-2" >
                <CAvatar photo="" initials={getInitalsFromName(userExpenditure.firstName, userExpenditure.lastName)} />
                <div>
                    <h1 className="c-heading-6" >
                        {userExpenditure.firstName} {userExpenditure.lastName}
                    </h1>
                    <p className="c-subtitle" >
                        {userExpenditure.email}
                    </p>
                </div>
            </div>
            <p className="c-heading-7" >
                {userExpenditure.totalTransactions.currency.symbol}{toMoney(userExpenditure.totalTransactions.amount, 2)}
            </p>
        </div>
    );
};
