import { Progress } from '@/components/ui/progress'
import { getBalancePercentageFromExpense } from '@/lib/utils';

interface BalanceBarProps {
    amount: number;
    expenses: number;
}

export const BalanceBar = (props: BalanceBarProps) => {

    const percentageBalance = getBalancePercentageFromExpense(props.amount, props.expenses);

    return (
        <div className='flex flex-col mt-2 gap-2 c-heading-5' >
            <span>{percentageBalance}% left</span>
            <Progress value={percentageBalance} className="w-full bg-primary-tint" />
        </div>
    )
}
