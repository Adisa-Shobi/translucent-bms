import { TransactionStatus } from "@/types/transaction"
import { Badge } from "../../ui/badge"
import { cn } from "@/lib/utils"

export const StatusBadge = ({ status }: { status: TransactionStatus }) => {

    const statusClasses = {
        [TransactionStatus.APPROVED]: "bg-success-tint text-success",
        [TransactionStatus.PENDING]: "bg-warning-tint text-warning",
        [TransactionStatus.REJECTED]: "bg-reject-tint text-reject",
        [TransactionStatus.VALIDATED]: "bg-primary-tint text-primary",
        default: "bg-primary-tint"
    }

    const getStyles = ({ status }: { status: TransactionStatus }) => {
        return cn(
            "m-2 text-white rounded-lg ml-0 hover:bg-transparent cursor-default h-fit",
            statusClasses[status] || statusClasses.default
        )
    }

    return (
        <Badge className={getStyles({ status: status })}
        >
            {status.toString()}
        </Badge >
    )
}