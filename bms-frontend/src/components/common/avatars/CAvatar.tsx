import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface CAvatarProps {
    photo: string;
    initials: string;
}

export const CAvatar = (props: CAvatarProps) => {
    return (
        <Avatar>
            <AvatarImage src={props.photo} />
            <AvatarFallback>{props.initials}</AvatarFallback>
        </Avatar>
    );
};