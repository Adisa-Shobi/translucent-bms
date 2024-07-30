import { LoadingButton } from "@/components/common"
import { toast } from "@/components/ui/use-toast"
import { removeAdmin } from "@/lib/api/budget/budget"
import { useState } from "react"
import { MemberOpButtonProps } from "./types/ButtonProps"

export const RemoveAdmin = ({ budgetId, onFinish, email }: MemberOpButtonProps) => {
    const [loading, setLoading] = useState(false)

    const removeAdminReq = (budget: string, email: string) => {
        setLoading(true);
        removeAdmin(budget, { email }).then((res) => {
            if (res) {
                toast({
                    description: "Admin removed successfully"
                });
                onFinish();
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleRemoveAdmin = () => {
        removeAdminReq(budgetId, email);
    }

    return (
        <LoadingButton onClick={handleRemoveAdmin} variant="outline" loading={loading} className="border-secondary text-secondary font-semibold" >
            Remove Admin
        </LoadingButton>
    )
}
