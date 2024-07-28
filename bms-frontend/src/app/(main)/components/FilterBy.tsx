import { Button } from '@/components/ui/button'
import { FaChevronDown } from "react-icons/fa";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'

interface FilterByProps {
    filters: {
        ownerBudgets: boolean,
        adminBudgets: boolean,
        memberBudgets: boolean,
    },
    setFilters: React.Dispatch<React.SetStateAction<{
        ownerBudgets: boolean,
        adminBudgets: boolean,
        memberBudgets: boolean,
    }>>
}

export const FilterBy = function (prop: FilterByProps) {

    const handleOwner = () => {
        prop.setFilters({
            ...prop.filters,
            ownerBudgets: !prop.filters.ownerBudgets
        })
    };

    const handleAdmin = () => {
        prop.setFilters({
            ...prop.filters,
            adminBudgets: !prop.filters.adminBudgets
        })
    };

    const handleMember = () => {
        prop.setFilters({
            ...prop.filters,
            memberBudgets: !prop.filters.memberBudgets
        })
    };

    const oneFilterActive = Object.values(prop.filters).some((val) => val === true);

    return (
        <div className='w-52' >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className={`font-normal ${oneFilterActive && "border-primary text-primary"} c-no-ring border bg-white hover:bg-white gap-4 w-full`}>
                        FILTER BY
                        <FaChevronDown className='stroke-[0.5px]' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-full' >
                    {/* <DropdownMenuLabel></DropdownMenuLabel>
                    <DropdownMenuSeparator /> */}
                    <DropdownMenuCheckboxItem
                        checked={prop.filters.ownerBudgets}
                        onCheckedChange={handleOwner}
                    >
                        Owner
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={prop.filters.adminBudgets}
                        onCheckedChange={handleAdmin}
                    // disabled
                    >
                        Admin
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={prop.filters.memberBudgets}
                        onCheckedChange={handleMember}
                    >
                        Member
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    )
}
