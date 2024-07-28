"use client";
import { getUserExpenditure } from "@/lib/api/budget/budget";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const AvgUserExpense = () => {
    const { budget } = useParams();
    const [loading, setLoading] = useState(false);
    const [expenditure, setExpenditure] = useState<number>(0);

    const loadUserExpenditure = (budgetId: string) => {
        setLoading(true);
        getUserExpenditure(budgetId).then((res) => {
            if (res) {
                setExpenditure(res);
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        loadUserExpenditure(budget as string);
    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            Avg User Expense
        </div>
    );
};