"use client";
import { CreateBudgetButton } from "./CreateTransaction";
import { FreezeBudget } from "./FreezeButton";
import UserAvatar from "../avatars/UserAvatar";

export const NavBar = () => {



    return (
        <header className="sticky bg-background top-0 z-50 px-12 justify-between flex items-center w-full h-20 border-b-[1px] " >
            <div>
                BMS
            </div>

            <div className="flex items-center w-2/6 justify-between" >
                <FreezeBudget />
                <CreateBudgetButton />
                <UserAvatar />
            </div>

        </header>
    )
}

