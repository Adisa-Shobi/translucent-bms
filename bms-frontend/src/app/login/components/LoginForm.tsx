"use client";
import { CustomForm, FormInput, LoadingButton, PasswordInput } from "@/components/common";
import { useToast } from "@/components/ui/use-toast";
import { authEndpoints } from "@/lib/api/auth/authEnpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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

        // const login = async (credentials: any): Promise<any> => {
        //     try {
        //         return axios.post(
        //             `${process.env.NEXT_PUBLIC_API_ENDPOINT}${authEndpoints.login.post.url}`,
        //             credentials,
        //             {
        //                 headers: {
        //                     "User-Agent": "next-auth",
        //                     "Content-Type": "application/json",
        //                 }
        //             }
        //         ).then((res) => {
        //             return res.data;
        //         });
        //     } catch (err: any) {
        //         if (err?.response?.statusCode === 401) {
        //             throw new Error("Invalid credentials");
        //         } else {
        //             throw new Error("Something went wrong");
        //         }
        //     }
        // };
        // login(values);


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
