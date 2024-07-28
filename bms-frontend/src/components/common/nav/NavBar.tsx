"use client";
import { FreezeBudget } from "./FreezeButton";
import UserAvatar from "./UserAvatar";

export const NavBar = () => {



    return (
        <header className="sticky bg-background top-0 z-50 px-12 justify-between flex items-center w-full h-20 border-b-[1px] " >
            <div>
                Logo
            </div>

            <div className="flex items-center w-1/4 justify-between" >
                <FreezeBudget />
                <UserAvatar />
            </div>

        </header>
    )
}

