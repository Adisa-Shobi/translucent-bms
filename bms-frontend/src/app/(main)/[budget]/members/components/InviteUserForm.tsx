import { CustomForm, FormInput, LoadingButton } from "@/components/common";
import { toast } from "@/components/ui/use-toast";
import { addMember } from "@/lib/api/budget/budget";
import { InviteMemberDto } from "@/types/budget";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const InviteUserForm = ({ onFinish }: { onFinish: () => void }) => {
    const { budget } = useParams();
    const [loading, setLoading] = useState(false);
    const inviteUserSchema = z.object({
        email: z.string().email()
    })

    const addMemberReq = (id: string, data: InviteMemberDto) => {
        setLoading(true);
        addMember(id, data).then((res) => {
            if (res) {
                toast({
                    description: "User invited successfully"
                })
                inviteUserForm.reset();
                onFinish();
            }
        }).finally(() => {
            setLoading(false);
        })

    }

    const inviteUserForm = useForm<z.infer<typeof inviteUserSchema>>({
        resolver: zodResolver(inviteUserSchema),
        defaultValues: {
            email: ""
        }
    });

    const handleInviteUser = (values: z.infer<typeof inviteUserSchema>) => {
        addMemberReq(budget as string, values);
    }

    return (
        <CustomForm form={inviteUserForm} onSubmit={handleInviteUser}>
            <FormInput form={inviteUserForm} name="email" label="Email" placeholder="" />
            <div className="flex justify-end" >
                <LoadingButton className="c-primary-btn" type="submit" loading={loading} >
                    Invite
                </LoadingButton>
            </div>
        </CustomForm>
    )
}