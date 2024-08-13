import { LoadingButton } from "@/components/common"
import { toast } from "@/components/ui/use-toast";
import { removeMember } from "@/lib/api/budget/budget"
import { useState } from "react"
import { MemberOpButtonProps } from "./types/ButtonProps";


export const RemoveMember = ({ budgetId, onFinish, email }: MemberOpButtonProps) => {
    const [loading, setLoading] = useState(false);

    const removeMemberReq = (budget: string, email: string) => {
        setLoading(true);
        removeMember(budget, { email }).then((res) => {
            if (res) {
                toast({
                    description: "User removed"
                })
                onFinish();
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleRemoveMember = () => {
        removeMemberReq(budgetId, email);
    }

    return (
        <LoadingButton onClick={handleRemoveMember} loading={loading} variant="outline" className="border-destructive text-destructive font-semibold" >
            Remove
        </LoadingButton>
    )
}