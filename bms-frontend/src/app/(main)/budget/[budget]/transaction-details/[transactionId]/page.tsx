"use client";
import { useEffect, useState } from 'react'
import { TransactionDetailCard } from './components/TransactionDetailCard'
import { useParams } from 'next/navigation'
import { fetchTransaction } from '@/lib/api/transaction/transaction'
import { TransactionButtons } from './components/TransactionButtons';
import { FilePreview } from './components/FilePreview';

export default function Page() {
    const [transaction, setTransaction] = useState<any>(null)
    const [loading, setLoading] = useState(false)
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
        <div className='flex h-min' >
            <div className='w-1/2'>
                <TransactionDetailCard transaction={transaction} />
            </div>
            <div className='w-1/2 flex flex-col justify-between h-auto'>
                <FilePreview url={transaction?.reciept?.file?.url} fileName={transaction?.reciept?.file?.url} />
                <TransactionButtons loadTransaction={loadTransaction} transaction={transaction} />
            </div>
        </div>
    )
}
