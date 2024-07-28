import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useParams } from "next/navigation";
import { CreateTransactionForm } from "./CreateTransactionForm";
import { cn } from "@/lib/utils";


export const CreateBudgetButton = () => {
    const { budget } = useParams();
    const showFreeze = budget ? true : false;
    return (
        <>

            <Dialog >
                <DialogTrigger className={cn(
                    showFreeze ? "visible" : "invisible"
                )}>
                    <Button className="text-white" >
                        Create Transaction
                    </Button>
                </DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>New Transaction</DialogTitle>
                        <DialogDescription className="!mt-4">
                            Add a new transaction to the Budget. An admin will have to approve your transaction
                        </DialogDescription>
                        <CreateTransactionForm budgetId={budget as string} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>

    )
}