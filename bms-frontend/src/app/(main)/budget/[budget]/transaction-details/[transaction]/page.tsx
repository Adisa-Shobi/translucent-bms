import React from 'react'
import { TransactionDetailCard } from './components/TransactionDetailCard'

export default function page() {
    return (
        <div className='flex' >
            <div className='w-1/2'>
                <TransactionDetailCard />
            </div>
            <div className='w-1/2'>
                TransactionAction
            </div>
        </div>
    )
}
