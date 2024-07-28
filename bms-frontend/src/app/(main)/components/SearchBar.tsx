import { Input } from '@/components/ui/input';
import { IoSearchOutline } from "react-icons/io5";
import React from 'react'

interface SearchBarProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}



export const SearchBar = function (props: SearchBarProps) {

    const handleSearch = (e: any) => {
        props.setSearch(e.target.value);
    }

    return (
        <div className={`border pr-3 bg-white flex flex-row items-center w-full px-4 rounded-lg`}>
            <IoSearchOutline className='text-input' />
            <Input value={props.search} onChange={handleSearch} className="border-none c-no-ring" type="search" placeholder="Search Budgets..." />
        </div>
    )
}
