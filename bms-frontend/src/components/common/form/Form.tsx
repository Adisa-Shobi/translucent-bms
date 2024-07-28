"use client"
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

import React from "react";

interface CustomFormProps {
    form: UseFormReturn<any>
    children: React.ReactNode
    onSubmit: (values: any) => void
}

export const CustomForm = React.memo((props: CustomFormProps) => {
    return (
        <Form {...props.form}>
            <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
                {props.children}
            </form>
        </Form>
    );
});

CustomForm.displayName = 'CustomForm';
