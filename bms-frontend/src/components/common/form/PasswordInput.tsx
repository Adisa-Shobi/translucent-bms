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
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

interface FormFieldProps {
    form: UseFormReturn<any>;
    label: string;
    name: string;
    placeholder?: string;
    description?: string;
    showForgotPassword?: boolean;
}

export function PasswordInput(props: FormFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem className="mb-4">
                    <div className="flex justify-between w-full">
                        <FormLabel className="c-input-label" >{props.label}</FormLabel>
                        {props.showForgotPassword && (
                            <div className="text-right text-sm text-primary-color font-semibold">
                                <a href="/password-reset" >Forgot password?</a>
                            </div>
                        )}
                    </div>
                    {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        <div className={`pr-3 bg-white flex flex-row items-center c-input-field  focus-within:ring-2 ${useFormField()?.error ? "focus-within:ring-destructive" : "focus-within:ring-primary"} focus-within:ring-offset-2 rounded-lg`}>

                            <FormControl className="border-none focus-visible:ring-transparent focus-visible:outline-none w-full">
                                <Input className="c-input-text" type={showPassword ? 'text' : 'password'} placeholder={props.placeholder || ""} {...field} />
                            </FormControl>
                            <span onClick={() => {
                                setShowPassword(!showPassword);
                            }} >
                                {!showPassword ? <FiEyeOff /> : <FiEye />}
                            </span>
                        </div>
                    }

                    {props.description && <FormDescription>{props.description}</FormDescription>}
                    <FormMessage className="c-input-error" />
                </FormItem>
            )}
        />
    );
}