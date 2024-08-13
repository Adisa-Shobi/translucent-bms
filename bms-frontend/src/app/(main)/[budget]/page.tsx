import { AvgUserExpense } from "./components/AvgUserExpense";
import { BudgetSummary } from "./components/BudgetSummary";
import { TotalExpense } from "./components/TotalExpense";

export default function BudgetDashboard() {



    return (
        <div className="flex flex-col gap-5 mb-6" >
            <BudgetSummary />
            <div className="flex gap-5" >
                <div className="w-1/2" >
                    <AvgUserExpense />
                </div>
                <div className="w-1/2" >
                    <TotalExpense />
                </div>
            </div>
        </div>
    )
}
