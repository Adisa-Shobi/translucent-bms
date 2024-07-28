import { Budget, Member } from '@/types/budget'
import { GoPerson } from "react-icons/go";
import { IoMdMore } from "react-icons/io";
import React from 'react'
import { Button } from '@/components/ui/button';
import { DateRangeBadge } from '@/components/common';
import { BalanceBar } from './BalanceBar';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';


// This component is used to display the budget card
export const BudgetCard = ({ budget }: { budget: Budget }) => {
    const router = useRouter();
    return (
        <Card
            onClick={() => {
                router.push(`/budget/${budget.id}`)
            }}
            className='drop-shadow-sm min-w-[300px] border rounded-lg p-4 cursor-pointer' >
            <div className='flex justify-between items-center' >
                <BudgetCardTitleAndDesc title={budget.title} description={budget.description} />
                <div className='flex justify-between' >
                    <BudgetCardMembers members={budget.members} />
                    <Button variant="ghost" className='text-secondary px-3 mx-2' >
                        <IoMdMore />
                    </Button>
                </div>
            </div>
            <div className='mt-12' >
                <DateRangeBadge startDate={budget.createdAt} endDate={budget.endAt} />
            </div>
            <BalanceBar amount={budget.amount} expenses={budget.expenses} />
        </Card>
    )
}

// This component is used to display the title and description of the budget
const BudgetCardTitleAndDesc = ({ title, description }: { title: string, description: string }) => {
    return <div className='max-w-[160px] text-nowrap '>
        <h1 className='c-heading-6 overflow-ellipsis overflow-hidden' >
            {title}
        </h1>
        <p className='c-subtitle text-nowrap overflow-hidden overflow-ellipsis' >
            {description}
        </p>
    </div>
}

// This component is used to display the number of members in the budget
const BudgetCardMembers = ({ members }: { members: Member[] }) => {
    return (<div className='flex items-center text-secondary gap-1'>
        <GoPerson size={20} />
        <span className='c-subtitle' >{members.length} Member{members.length !== 1 && "s"}</span>
    </div>)
}