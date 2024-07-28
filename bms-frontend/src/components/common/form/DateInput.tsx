import React, { HTMLInputTypeAttribute } from 'react'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from '@/components/ui/form'

interface FormFieldProps {
    form: UseFormReturn<any>;
    label: string;
    name: string;
    placeholder: string;
    description?: string;
    type?: HTMLInputTypeAttribute;
    hideBorder?: boolean;
}

export const DateInput = (props: FormFieldProps) => {

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem className="mb-4">
                    <FormLabel className="c-input-label" >{props.label}</FormLabel>

                    <Popover >
                        <div className={cn(
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            !useFormField()?.error ? "c-input-field-focus" : "c-input-field-error-focus",
                            "border-double border !h-fit"
                        )}>
                            <PopoverTrigger asChild  >
                                <FormControl>
                                    <Button
                                        variant={"ghost"}
                                        className={cn(
                                            "w-full  h-max justify-start text-left font-normal c-input-field",
                                            !field.value && "text-muted-foreground",
                                            !props.hideBorder && "border-double"
                                        )}
                                        {...field}
                                    >
                                        <span className='w-full' >
                                            {field.value ? format(field.value, "PPP") : props.placeholder}
                                        </span>
                                        <CalendarIcon className="mr-2 h-4 w-4 text-input" />
                                    </Button>

                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    fromDate={new Date()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </div>

                    </Popover>
                    {props.description && <FormDescription>{props.description}</FormDescription>}
                    <FormMessage className="c-input-error" />
                </FormItem>
            )}
        >

        </FormField>

    )
}



