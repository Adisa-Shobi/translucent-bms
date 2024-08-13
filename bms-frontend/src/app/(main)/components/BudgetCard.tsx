import { Budget, Member } from '@/types/budget'
import { GoPerson, GoTrash } from "react-icons/go";
import { IoMdMore } from "react-icons/io";
import React from 'react'
import { Button } from '@/components/ui/button';
import { DateRangeBadge, LoadingButton } from '@/components/common';
import { BalanceBar } from './BalanceBar';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { deleteBudget } from '@/lib/api/budget/budget';
import Link from 'next/link';





// This component is used to display the budget card
export const BudgetCard = ({ budget, onDelete }: { budget: Budget, onDelete: () => void }) => {
    return (
        <Card

            className='drop-shadow-sm min-w-[300px] border rounded-lg p-4' >
            <div className='flex justify-between items-center' >
                <BudgetCardTitleAndDesc id={budget.id} title={budget.title} description={budget.description} />
                <div className='flex justify-between' >
                    <BudgetCardMembers members={budget.members} />
                    <BudgetMenu budget={budget} onDelete={onDelete} />
                </div>
            </div>
            <div className='mt-12' >
                <DateRangeBadge startDate={budget.createdAt} endDate={budget.endAt} />
            </div>
            <BalanceBar amount={budget.amount} expenses={budget.expenses} />
        </Card>
    )
}

const BudgetMenu = ({ budget, onDelete }: { budget: Budget, onDelete: () => void }) => {

    const deleteBudgetReq = (id: string) => {
        deleteBudget(id).then((res) => {
            if (res)
                onDelete();
        });
    }

    const handleDelete = () => {
        deleteBudgetReq(budget.id);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className='text-secondary px-3 mx-2' >
                    <IoMdMore />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-min">
                {/* <DropdownMenuLabel>Options</DropdownMenuLabel> */}
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuGroup>
                    <DropdownMenuItem className='items-center'>
                        <a href={`/${budget.title}/members?budget_id=${budget.id}`} className='flex' >

                            <GoPerson size={20} className='mr-3' />
                            <span>Manage</span>
                            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='text-destructive items-center'>
                        <span onClick={handleDelete} className='flex' >
                            <GoTrash size={20} className='mr-3' />
                            <span>Delete </span>
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// This component is used to display the title and description of the budget
const BudgetCardTitleAndDesc = ({ id, title, description }: { id: string, title: string, description: string }) => {
    const router = useRouter();
    return <Link
    href={{pathname: `/${title}`, query: {budget_id: id}}}
        // onClick={() => {
        //     router.push(`/${title}?budget_id=${id}`);
        // }}
        className='max-w-[160px] text-nowrap cursor-pointer'>
        <h1 className='c-heading-6 overflow-ellipsis overflow-hidden' >
            {title}
        </h1>
        <p className='c-subtitle text-nowrap overflow-hidden overflow-ellipsis' >
            {description}
        </p>
    </Link>
}

// This component is used to display the number of members in the budget
const BudgetCardMembers = ({ members }: { members: Member[] }) => {
    return (<div className='flex items-center text-secondary gap-1'>
        <GoPerson size={20} />
        <span className='c-subtitle' >{members.length} Member{members.length !== 1 && "s"}</span>
    </div>)
}