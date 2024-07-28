"use client";
import { CustomForm, DateInput, FormInput, LoadingButton, SelectInput, TextInput } from "@/components/common";
import { toast } from "@/components/ui/use-toast";
import { createBudget } from "@/lib/api/budget/budget";
import { getAllCurrency } from "@/lib/api/currency/currency";
import { toDDMMMYYYY } from "@/lib/helpers/datetimeFormatters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


export default function CreateBudgetForm() {
    const [loading, setLoading] = useState(false);
    const [currencyOptions, setCurrencyOptions] = useState<{ label: string, value: string }[]>([]);
    const [currencyLoading, setCurrencyLoading] = useState(false);
    const router = useRouter();

    const loadCurrency = () => {
        setCurrencyLoading(true);
        getAllCurrency().then((res) => {
            if (res) {
                setCurrencyOptions(
                    res.map((itm: any) => {
                        return {
                            label: itm?.name,
                            value: itm?.id,
                        }
                    })
                )
            }
        }).finally(() => {
            setCurrencyLoading(false);
        })
    }

    useEffect(() => {
        loadCurrency();
    }, []);

    const createBudgetSchema = z.object({
        title: z.string().min(3, "Title must be at least 3 character(s)").max(20),
        description: z.string().min(10, "Description must be at least 5 character(s)").max(100),
        amount: z.coerce.number({ message: "Amount must be a number" }).gte(1, "Amount must be at least 1"),
        currency: z.string({ message: "Currency is required" }),
        endAt: z.date().min(new Date(new Date().setHours(0, 0, 0, 0)), "End date must be at the start of the day")
    });

    const createBudgetForm = useForm<z.infer<typeof createBudgetSchema>>({
        resolver: zodResolver(createBudgetSchema),
        defaultValues: {
            title: "",
            description: "",
            endAt: new Date(),
        }
    });

    const handleCreateBudget = (values: z.infer<typeof createBudgetSchema>) => {
        setLoading(true);
        createBudget({
            ...values,
            currencyId: parseInt(values.currency),
            endAt: values.endAt.toISOString()
        }).then((res) => {
            if (res) {
                toast({
                    description: "Budget created successfully",
                });
                router.replace("/");
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <CustomForm form={createBudgetForm} onSubmit={handleCreateBudget}>
            <FormInput form={createBudgetForm} name="title" label="Budget Title" placeholder="e.g. New Project" />
            <SelectInput disabled={currencyLoading} form={createBudgetForm} options={currencyOptions} name="currency" label="Currency" placeholder="e.g. NGN" />
            <FormInput form={createBudgetForm} type="number" name="amount" label="Starting Balance" placeholder="e.g. 1,000,000" />
            <DateInput form={createBudgetForm} name="endAt" label="End Date" placeholder={`e.g. ${toDDMMMYYYY(new Date().toISOString())}`} />
            <TextInput form={createBudgetForm} name="description" label="Description" placeholder="What is this buget for?" />
            <div className="flex justify-end" >
                <LoadingButton className="c-primary-btn" type="submit" loading={loading} >
                    Create
                </LoadingButton>
            </div>
        </CustomForm>
    )
}
