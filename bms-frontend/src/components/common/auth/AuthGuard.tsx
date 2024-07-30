"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { AuthLoader } from "./AuthLoader";

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>(true);

    const guestRoutes: string[] = ["/login", "/register"];

    useEffect(() => {
        const isGuestRoute = guestRoutes.includes(pathname);
        setLoading(true);

        if (status === "loading") {
            // Still loading, do nothing
            return;
        } else if (status === "authenticated" && isGuestRoute) {
            router.push(pathname === "/login" ? "/" : pathname);
        } else if (status === "unauthenticated" && !isGuestRoute) {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, [pathname, status, router]);

    if (loading) {
        return <AuthLoader />;
    }

    return <>{children}</>;
}
