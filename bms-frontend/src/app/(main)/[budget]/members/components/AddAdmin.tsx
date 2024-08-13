import { LoadingButton } from "@/components/common"
import { toast } from "@/components/ui/use-toast"
import { addAdmin } from "@/lib/api/budget/budget"
import { useState } from "react"
import { MemberOpButtonProps } from "./types/ButtonProps"

export const AddAdmin = ({ budgetId, onFinish, email }: MemberOpButtonProps) => {
    const [loading, setLoading] = useState(false);

    const addAdminReq = (budget: string, email: string) => {
        setLoading(true);
        addAdmin(budget, { email }).then((res) => {
            if (res) {
                toast({
                    description: "Admin added successfully"
                })
                onFinish();
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleAddAdmin = () => {
        addAdminReq(budgetId, email);
    }

    return (
        <LoadingButton onClick={handleAddAdmin} loading={loading} variant="outline" className="border-secondary text-secondary font-semibold" >
            Add Admin
        </LoadingButton>
    )
}