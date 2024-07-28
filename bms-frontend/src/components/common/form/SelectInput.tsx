import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HTMLInputTypeAttribute } from "react";
import { UseFormReturn } from "react-hook-form";

interface SelectOptions {
    value: string;
    label: string;
}

interface FormFieldProps {
    form: UseFormReturn<any>;
    label: string;
    name: string;
    placeholder: string;
    options: SelectOptions[],
    description?: string;
    hideBorder?: boolean;
    disabled?: boolean;
}

export const SelectInput = (props: FormFieldProps) => {
    return (
        <FormField
            disabled={props.disabled}
            control={props.form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem className="mb-4">
                    <FormLabel className="c-input-label" >{props.label}</FormLabel>
                    {/* <Input type={props.type || 'text'} placeholder={props.placeholder} {...field} /> */}
                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                        <FormControl >
                            <SelectTrigger className={`${!useFormField()?.error ? "c-input-field" : "c-input-field-error"} ${!props.hideBorder && "border-double"}`}>
                                <SelectValue placeholder={props.placeholder} />
                            </SelectTrigger>

                        </FormControl>
                        <SelectContent>
                            {props.options.map((item) => {
                                return (
                                    <SelectItem key={item.value} value={item.value.toString()}>{item.label}</SelectItem>
                                )
                            })}
                            {/* <SelectItem value={1}>m@example.com</SelectItem>
                            <SelectItem value="2">m@google.com</SelectItem>
                            <SelectItem value="3">m@support.com</SelectItem> */}
                        </SelectContent>
                    </Select>
                    {props.description && <FormDescription>{props.description}</FormDescription>}
                    <FormMessage className="c-input-error" />
                </FormItem>
            )}
        />
    )
}