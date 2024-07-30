import { getInitalsFromName } from '@/lib/utils'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { CAvatar } from './CAvatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'

export default function UserAvatar() {
    const { data } = useSession()
    const initials = getInitalsFromName(data?.user?.firstName, data?.user?.lastName)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='cursor-pointer'>
                    <CAvatar photo={data?.user?.profilePhoto ?? ""} initials={initials} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-min">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>

                    <DropdownMenuItem onClick={() => {
                        signOut();
                    }} className='text-reject hover:!text-reject hover:!bg-reject-tint' >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
