import { NavBar } from '@/components/common';
import { NavBreadCrumb } from '@/components/common/NavBreadCrumb';
import React from 'react'

export default function layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            <main>
                <div className='px-12'>
                    <NavBreadCrumb />
                    {children}
                </div>
            </main>
        </>
    )
}
