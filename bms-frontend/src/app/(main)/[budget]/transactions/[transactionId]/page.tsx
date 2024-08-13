"use client";
import { useEffect, useState } from 'react'
import { TransactionDetailCard } from './components/TransactionDetailCard'
import { useSearchParams } from 'next/navigation'
import { fetchTransaction } from '@/lib/api/transaction/transaction'
import { TransactionDetail } from '@/types/transaction';
import { FilePreview } from './components/FilePreview';
import { TransactionButtons } from './components/TransactionButtons';

export default function Page() {
    const [transaction, setTransaction] = useState<TransactionDetail | null>(null)
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const transaction_id = searchParams.get('transaction_id')

    const loadTransaction = (id: string) => {
        setLoading(true)
        fetchTransaction(id).then((res) => {
            if (res)
                setTransaction(res)
        }).finally(() => {
            setLoading(false)
        });
    }

    useEffect(() => {
        if (transaction_id) {
            loadTransaction(transaction_id as string)
        }
    }, [])

    return (
        <div className='flex h-min' >
            <div className='w-1/2'>
                <TransactionDetailCard loading={loading} transaction={transaction} />
            </div>
            <div className='w-1/2 flex flex-col justify-between h-auto'>
                {!loading && transaction?.reciept && <FilePreview url={transaction.reciept.file.url} fileName={transaction?.reciept?.file?.url} />}
                {!loading && transaction && <TransactionButtons loadTransaction={loadTransaction} transaction={transaction} />}

            </div>
        </div >
    )
}
