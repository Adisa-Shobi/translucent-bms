import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useParams, useSearchParams } from "next/navigation";
import { CreateTransactionForm } from "./CreateTransactionForm";
import { cn } from "@/lib/utils";
import { useState } from "react";


export const CreateTransactionButton = () => {  
    const [open, setOpen] = useState(false);    
    const searchParams = useSearchParams();  
    const budget_id = searchParams.get("budget_id");
    const { budget } = useParams();
    const showFreeze = budget_id ? true : false;
    return (
        <>

            <Dialog open={open} onOpenChange={setOpen} >
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
                        <CreateTransactionForm budgetId={budget_id as string} budget={budget as string} closeModal={() => {setOpen(false)}}/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>

    )
}