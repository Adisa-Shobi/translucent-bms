"use client";
import React, { useEffect } from 'react'
import { TransactionDetailCard } from './components/TransactionDetailCard'
import { useParams } from 'next/navigation'
import { fetchTransaction } from '@/lib/api/transaction/transaction'
import { TransactionButtons } from './components/TransactionButtons';

export default function page() {
    const [transaction, setTransaction] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(false)
    const { transactionId } = useParams()

    const loadTransaction = (id: string) => {
        setLoading(true)
        fetchTransaction(id).then((res) => {
            console.log("Response", res)
            if (res)
                setTransaction(res)
        }).finally(() => {
            setLoading(false)
        });
    }

    useEffect(() => {
        if (transactionId) {
            loadTransaction(transactionId as string)
        }
    }, [])

    if (loading || !transaction) {
        return <div>Loading...</div>
    }

    return (
        <div className='flex' >
            <div className='w-1/2'>
                <TransactionDetailCard transaction={transaction} />
            </div>
            <div className='w-1/2'>
                <TransactionButtons loadTransaction={loadTransaction} transaction={transaction} />
            </div>
        </div>
    )
}
