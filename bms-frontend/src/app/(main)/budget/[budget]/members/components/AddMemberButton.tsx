"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InviteUserForm } from "./InviteUserForm";


export const AddMemberButton = () => {
    return (
        <>
            <Dialog >
                <DialogTrigger >
                    <Button className="text-white" >
                        Add Member
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[400px]" >
                    <DialogHeader>
                        <DialogTitle>Invite User</DialogTitle>
                        <DialogDescription className="!mt-4">
                            Send an invite to a new user to join your budget
                        </DialogDescription>
                        <InviteUserForm />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

