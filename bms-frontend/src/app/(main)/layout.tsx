import { NavBar } from '@/components/common';
import React from 'react'

export default function layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            <main>
                <div className='px-12 pt-12'>
                    {children}
                </div>
            </main>
        </>
    )
}
