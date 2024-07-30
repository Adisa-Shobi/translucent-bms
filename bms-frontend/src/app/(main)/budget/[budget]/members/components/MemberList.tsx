import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitalsFromName } from "@/lib/utils";
import { useParams } from "next/navigation";
import { RemoveMember } from "./RemoveMember";
import { RemoveAdmin } from "./RemoveAdmin";
import { AddAdmin } from "./AddAdmin";


interface MemberListProps {
    members: Member[]
    admins: Admin[]
    loadMembers: () => void;
    loadAdmins: () => void;
}

export const MemberList = ({ members, admins, loadMembers, loadAdmins }: MemberListProps) => {
    const { budget } = useParams();

    return (
        <div className="border rounded-lg border-secondary p-4" >
            {
                members.map((usr, index) => {
                    const isAdmin = admins?.find((admin) => admin.user.id === usr.user.id) ? true : false;
                    return (
                        <UserItem
                            key={index}
                            user={usr.user}
                            isAdmin={isAdmin}
                            budget={budget as string}
                            loadAdmins={loadAdmins}
                            loadMembers={loadMembers}
                        />
                    )
                })
            }

        </div>
    )
}

interface UserItemProps {
    user: User;
    isAdmin: boolean;
    budget: string;
    loadMembers: () => void;
    loadAdmins: () => void;
}

const UserItem = ({ user, isAdmin, budget, loadMembers, loadAdmins }: UserItemProps) => {
    return (
        <div className="flex justify-between border-b border-secondary py-3" >
            <div className="flex gap-4 items-center" >
                <Avatar>
                    <AvatarImage src={user.profilePhoto} alt="@shadcn" />
                    <AvatarFallback>{getInitalsFromName(user.firstName, user.lastName)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="c-heading-6" >{user?.firstName} {user?.lastName}</h1>
                    <p className="c-subtitle text-sm" >{isAdmin ? "Admin" : "Member"}</p>
                </div>
            </div>
            <div className="flex gap-2" >
                {
                    isAdmin ? <RemoveAdmin email={user.email} budgetId={budget} onFinish={() => {
                        loadAdmins();
                    }} /> : <AddAdmin email={user.email} budgetId={budget} onFinish={() => {
                        loadAdmins();
                    }} />
                }
                <RemoveMember email={user.email} budgetId={budget} onFinish={() => {
                    loadMembers();
                }} />
            </div>
        </div>
    )
}
