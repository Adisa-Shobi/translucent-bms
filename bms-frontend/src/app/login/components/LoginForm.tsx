"use client";
import { CustomForm, FormInput, LoadingButton, PasswordInput } from "@/components/common";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string()
    });

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin = async (values: z.infer<typeof loginSchema>) => {
        setIsSubmitting(true);
        signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        }).then((response) => {
            if (response?.error) {
                toast({

                    variant: 'destructive',
                    title: 'Login Failed',
                    description: "Invalid email or password",
                    duration: 5000,
                });
            }
        }).finally(() => {
            setIsSubmitting(false);
        });





    }


    return (
        <CustomForm form={loginForm} onSubmit={handleLogin} >
            <FormInput hideBorder form={loginForm} name="email" label="Email" placeholder="janedoe@gmail.com" />
            <PasswordInput form={loginForm} name="password" label="Password" placeholder="" />
            <LoadingButton className="c-primary-btn-wide" type="submit" loading={isSubmitting}>
                Login
            </LoadingButton>
        </CustomForm>

    )
}
