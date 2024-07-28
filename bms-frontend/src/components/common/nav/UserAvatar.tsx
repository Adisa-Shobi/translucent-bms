import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitalsFromName } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function UserAvatar() {
    const { data } = useSession()
    const initials = getInitalsFromName(data?.user?.firstName, data?.user?.lastName)

    return (
        <Avatar>
            <AvatarImage src={data?.user?.profilePhoto} />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    )
}
