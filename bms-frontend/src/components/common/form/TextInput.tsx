import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { HTMLInputTypeAttribute } from "react";
import { UseFormReturn } from "react-hook-form";

interface FormFieldProps {
    form: UseFormReturn<any>;
    label: string;
    name: string;
    placeholder: string;
    description?: string;
    type?: HTMLInputTypeAttribute;
    hideBorder?: boolean;
}

export const TextInput = (props: FormFieldProps) => {
    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem className="mb-4">
                    <FormLabel className="c-input-label" >{props.label}</FormLabel>
                    <FormControl className={`${!useFormField()?.error ? "c-input-field" : "c-input-field-error"} ${!props.hideBorder && "border-double"}`}>
                        {/* <Input type={props.type || 'text'} placeholder={props.placeholder} {...field} /> */}
                        <Textarea placeholder={props.placeholder} {...field} />
                    </FormControl>
                    {props.description && <FormDescription>{props.description}</FormDescription>}
                    <FormMessage className="c-input-error" />
                </FormItem>
            )}
        />
    )
};