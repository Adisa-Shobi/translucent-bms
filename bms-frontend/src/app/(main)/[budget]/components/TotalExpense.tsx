"use client";
import {  StatusBadge } from "@/components/common";
import { Separator } from "@/components/ui/separator";
import { getTransactions } from "@/lib/api/budget/budget";
import { toMoney } from "@/lib/utils";
import { Transaction, TransactionResponse } from "@/types/transaction";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { StatSkeleton } from "./StatSkeleton";

export const TotalExpense = () => {
    // const { budget } = useParams();
    const searchParams = useSearchParams();
    const budget_id = searchParams.get("budget_id");
    const [loading, setLoading] = useState(false);
    const [totalExpenses, setTotalExpenses] = useState<TransactionResponse>();
    const pathname = usePathname();
    const router = useRouter();

    const loadExpenses = (budgetId: string) => {
        setLoading(true);
        getTransactions(budgetId, {
            limit: 3,
        }).then((res) => {
            if (res) {
                setTotalExpenses(res);
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        loadExpenses(budget_id as string);
    }, []);

    return (
        loading ?
            <StatSkeleton /> :
            <div className="border rounded-lg p-4 h-[400px] overflow-clip" >
                <h3 className="c-subheading text-secondary text-base" >
                    Total Expense
                </h3>
                <h1 className="c-heading-4 mt-3" >
                    {totalExpenses?.aggregates.total.currency.symbol}{toMoney(totalExpenses?.aggregates.total.amount, 1)}
                </h1>
                <Separator className="mt-4 mb-1 text-secondary" />
                <h1 className="c-subheading mb-4 text-secondary" >
                    Recent Transactions
                </h1>
                <div className="flex flex-col gap-2" >
                    {
                        totalExpenses?.transactions.map((transaction, index) => {
                            return (
                                <TransactionItem key={index} transaction={transaction} />
                            )
                        })
                    }
                </div>
                <div className="flex justify-end" >
                    <a onClick={() => {
                        router.push(`${pathname}/transactions?budget_id=${budget_id}`,)
                    }} aria-disabled={true} className=" flex items-center text-sm cursor-pointer pt-3 text-primary underline font-semibold" >
                        View Transactions <GoArrowUpRight />
                    </a>
                </div>
            </div >
    );
};


const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    return (
        <div className="border-b border-secondary flex justify-between items-center" >
            <div >
                <h1 className="c-heading-6" >
                    {transaction.purpose}
                </h1>
                <StatusBadge status={transaction.status} />
            </div>
            <p className="c-heading-7" >
                {transaction.budget.currency.symbol}{toMoney(transaction.amount, 1)}
            </p>
        </div>
    );
}