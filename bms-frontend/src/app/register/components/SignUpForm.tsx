"use client"
import { CustomForm, FormInput, LoadingButton, PasswordInput } from "@/components/common";
import { toast } from "@/components/ui/use-toast";
import { registerRequest } from "@/lib/api/auth/auth";
import { validatePassword } from "@/lib/helpers/validators/password-validator";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function SignUpForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const signUpSchema = z.object({
        firstName: z.string().min(2, "First Name must be at least 2 character(s)").max(20),
        lastName: z.string().min(2, "Last Name must be at least 2 character(s)").max(20),
        email: z.string().email(),
        password: z.string().min(8)
    }).superRefine(({ password }, ctx) => {
        const errorMesaage = validatePassword(password);
        if (errorMesaage) {
            ctx.addIssue({
                code: "custom",
                message: errorMesaage,
                path: ['password']
            });
        }

    });

    const signUpForm = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
    });

    const handleSignUp = (values: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true);
        registerRequest(values).then((res) => {
            console.log(res);
            if (res !== null) {
                toast({
                    variant: 'default',
                    title: 'Successfully Registered',
                });
                router.push('/login');
            }
        }).finally(() => {
            setIsSubmitting(false);
        });
    }

    return (
        <CustomForm form={signUpForm} onSubmit={handleSignUp} >
            <div className="flex gap-4 w-full" >
                <FormInput hideBorder form={signUpForm} name="firstName" label="First Name" placeholder="John" />
                <FormInput hideBorder form={signUpForm} name="lastName" label="Last Name" placeholder="Doe" />
            </div>
            <FormInput hideBorder form={signUpForm} name="email" label="Email" placeholder="janedoe@gmail.com" />
            <PasswordInput form={signUpForm} name="password" label="Password" placeholder="" />
            <LoadingButton
                type="submit"
                className="c-primary-btn-wide"
                loading={isSubmitting}
            >
                Register
            </LoadingButton>
        </CustomForm>
    )
}
