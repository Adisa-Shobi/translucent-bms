"use client";
import { GaugeChart } from "@/components/common/GuageChart";
import { Button } from "@/components/ui/button";
import { getBudgetSummary } from "@/lib/api/budget/budget";
import { toDDMMM, toDDMMMYYYY } from "@/lib/helpers/datetimeFormatters";
import { cn, getBalancePercentageFromBalance, getBalancePercentageFromExpense, toMoney } from "@/lib/utils";
import { BudgetSummaryType } from "@/types/summary";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const BudgetSummary = () => {
    const { budget } = useParams();
    const [summary, setSummary] = useState<BudgetSummaryType>();
    const [showBalance, setShowBalance] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getBudgetSummary(budget as string).then((res: BudgetSummaryType) => {
            if (res) {
                setSummary(res);
            }
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div className="border rounded-lg p-4">
            <div className="flex justify-between" >
                <div className="flex flex-col justify-between" >
                    <div>
                        <div className="flex text-secondary items-center gap-1">
                            <Button
                                onClick={() => {
                                    setShowBalance(!showBalance);
                                }}
                                variant="ghost"  >
                                {!showBalance ? <FiEyeOff /> : <FiEye />}
                            </Button>
                            <p className="c-subheading" >
                                {showBalance ? "Hide" : "Show"} Balance
                            </p>
                        </div>
                        <h1 className="c-heading-1 mt-4" >
                            {showBalance ? `$${toMoney(summary?.aggregates?.balance || 0)}` : "******"}
                        </h1>
                        <p className="c-subtitle text-sm mt-2" >
                            {`${toDDMMMYYYY(summary?.budget.createdAt)} - ${toDDMMMYYYY(summary?.budget.endAt)}`}
                        </p>
                    </div>
                    <AvgWeeklyExp weekExp={summary?.aggregates.weeklyAvgExpense} prevWeekExp={summary?.aggregates.prevWeeklyAvgExpense} />

                </div>
                <div className="flex flex-col justify-center items-center gap-1" >
                    <GaugeChart value={getBalancePercentageFromBalance(summary?.budget.amount || 0, summary?.aggregates.balance || 0)} />
                    <p className="c-subtitle" >Starting Balance: <span className="c-subheading text-black" >${toMoney(summary?.budget.amount, 0) || 0}</span></p>
                </div>

            </div>

            <div className="flex w-full justify-between" >




            </div>

        </div>
    );

}

const AvgWeeklyExp = ({ weekExp, prevWeekExp }: { weekExp?: number, prevWeekExp?: number }) => {
    const incr = (weekExp || 0) >= (prevWeekExp || 0);

    return (
        <div className="flex gap-3 items-center" >
            <p className="c-subtitle" >
                Avg Weekly Expenditure
            </p>
            <span className={cn(
                "flex items-center gap-1",
                incr ? "text-success" : "text-destructive"
            )} >
                {incr ? <FaCircleArrowUp /> : <FaCircleArrowDown />} {toMoney(weekExp || 0, 1)}
            </span>
        </div>
    );
} 