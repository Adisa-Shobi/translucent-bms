"use client";
import { StatusBadge } from "@/components/common";
import { Separator } from "@/components/ui/separator";
import { getTransactions } from "@/lib/api/budget/budget";
import { toMoney } from "@/lib/utils";
import { Transaction, TransactionResponse, TransactionStatus } from "@/types/transaction";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

export const TotalExpense = () => {
    const { budget } = useParams();
    const [loading, setLoading] = useState(false);
    const [totalExpenses, setTotalExpenses] = useState<TransactionResponse>();
    const pathname = usePathname();

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
        loadExpenses(budget as string);
    }, [])

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="border rounded-lg p-4 h-[400px] overflow-clip" >
            <h3 className="c-subheading text-secondary text-base" >
                Total Expense
            </h3>
            <h1 className="c-heading-4 mt-3" >
                ${toMoney(totalExpenses?.aggregates.total, 1)}
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
                <a href={`${pathname}/transactions`} aria-disabled={true} className=" flex items-center text-sm cursor-pointer pt-3 text-primary underline font-semibold" >
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
                ${toMoney(transaction.amount, 1)}
            </p>
        </div>
    );
}