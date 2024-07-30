"use client"
import type { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    useFormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute } from "react";
import React from "react";

interface FormFieldProps {
    form: UseFormReturn<any>;
    label: string;
    name: string;
    placeholder: string;
    description?: string;
    type?: HTMLInputTypeAttribute;
    hideBorder?: boolean;
}

// million-ignore
export const FormInput = React.memo((props: FormFieldProps) => {

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem className="mb-4">
                    <FormLabel className="c-input-label" >{props.label}</FormLabel>
                    {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        <FormControl className={`${!useFormField()?.error ? "c-input-field" : "c-input-field-error"} ${!props.hideBorder && "border-double"}`}>
                            <Input type={props.type || 'text'} placeholder={props.placeholder} {...field} />
                        </FormControl>
                    }
                    {props.description && <FormDescription className="text-xs" >{props.description}</FormDescription>}
                    <FormMessage className="c-input-error" />
                </FormItem>
            )}
        />
    );
});

FormInput.displayName = 'FormInput';