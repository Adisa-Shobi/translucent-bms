import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomForm } from "../form/Form";
import { FormInput } from "../form/FormInput";
import { LoadingButton } from "../button/LoadingButton";
import { useState } from "react";
import { CreateTransactionDto } from "@/types/transaction";
import { createTransaction } from "@/lib/api/budget/budget";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const CreateTransactionForm = ({ budgetId }: { budgetId: string }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const createTransactionSchema = z.object({
        purpose: z.string().min(3, "Purpose must be at least 3 character(s)").max(20),
        amount: z.coerce.number({ message: "Amount must be a number" }).gte(1, "Amount must be at least 1"),
    });

    const postTransaction = ({ id, data }: { id: string, data: CreateTransactionDto }) => {
        setLoading(true);
        createTransaction(id, data).then((res) => {
            if (res) {
                toast({
                    description: "Transaction created successfully",
                })
                createTransactionForm.reset();
                router.push(`/budget/${budgetId}/transactions`);
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    const createTransactionForm = useForm<z.infer<typeof createTransactionSchema>>({
        resolver: zodResolver(createTransactionSchema),
        defaultValues: {
            purpose: "",
            amount: 0,
        }
    });

    const handleCreateTransaction = (values: z.infer<typeof createTransactionSchema>) => {
        postTransaction({
            id: budgetId,
            data: values
        });
    }

    return (
        <CustomForm form={createTransactionForm} onSubmit={handleCreateTransaction}>
            <FormInput form={createTransactionForm} name="purpose" label="Purpose" placeholder="" description="What will the amount receieved from the transaction be used for?" />
            <FormInput form={createTransactionForm} name="amount" label="Amount" type="number" placeholder="" description="How much will this transaction cost?" />
            <div className="flex justify-end" >
                <LoadingButton className="c-primary-btn" type="submit" loading={loading} >
                    Create
                </LoadingButton>
            </div>
        </CustomForm>
    );

};