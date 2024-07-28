import React from 'react'
import { BudgetTransactionsTable } from './components/BudgetTransactionsTable'

export default function BudgetTransactions() {
    return (
        <div>
            <h1 className='c-heading-4' >Budget Transactions</h1>
            <p className='c-subheading text-secondary' >Track all transactions made within your budget</p>
            <div className='mt-8' >
                <BudgetTransactionsTable />
            </div>
        </div>
    )
}
