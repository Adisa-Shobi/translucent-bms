import React from 'react'

export default function layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className='px-12 pt-12'>
                {children}
            </div>

        </div>
    )
}
