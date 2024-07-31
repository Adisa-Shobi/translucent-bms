"use client";
import React, { useState } from 'react';
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Transaction, TransactionResponse, TransactionStatus, TransactionCreator } from "@/types/transaction";
import { StatusBadge, TableSkeleton } from "@/components/common";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from '@/components/ui/button';
import { getTransactions } from '@/lib/api/budget/budget';
import { useParams, useRouter } from 'next/navigation';
import { toMoney } from '@/lib/utils';

export const BudgetTransactionsTable = () => {
    const { budget } = useParams();
    const router = useRouter();
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [totalExpenses, setTotalExpenses] = useState<TransactionResponse>();
    const [loading, setLoading] = useState(false);


    const loadExpenses = (budgetId: string) => {
        setLoading(true);
        getTransactions(budgetId, {
            limit: pagination.pageSize,
            skip: pagination.pageIndex * pagination.pageSize,
        }).then((res) => {
            if (res) {
                setTotalExpenses(res);
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    React.useEffect(() => {
        loadExpenses(budget as string);
    }, [pagination]);

    const columns = React.useMemo<ColumnDef<Transaction>[]>(
        () => [
            {
                id: 'serialNumber',
                header: 'S/N',
                cell: ({ row, table }) => table.getState().pagination.pageSize * table.getState().pagination.pageIndex + row.index + 1,
            },
            {
                accessorKey: 'creator',
                header: 'Creator',
                cell: ({ getValue }) => `${getValue<TransactionCreator>().firstName} ${getValue<TransactionCreator>().lastName}`,
            },
            {
                accessorKey: 'transactionId',
                header: 'Transaction ID',
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                cell: ({ getValue }) => `$${toMoney(getValue<number>())}`,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ getValue }) => <StatusBadge status={getValue<TransactionStatus>()} />,
            },
            {
                accessorKey: 'createdAt',
                header: 'Date & Time',
                cell: ({ getValue }) => new Date(getValue<string>()).toLocaleString(),
            },
            {
                id: 'action',
                header: 'Action',
                cell: ({ row }) => {
                    console.log(row.original);
                    return (
                        <Button variant='ghost' onClick={() => {
                            router.push(`/budget/${budget}/transaction-details/${row.original.id}`)
                        }} className='text-primary font-semibold' >Details</Button>
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data: totalExpenses?.transactions || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        onPaginationChange: setPagination,
        rowCount: totalExpenses?.aggregates.count || 0,
        state: {
            pagination: {
                ...pagination,
                pageSize: pagination.pageSize,
            },
        },
    });

    if (loading) {
        return (
            <TableSkeleton rows={5} columns={4} />
        );
    }

    return (
        <div className="p-4">
            <Table>
                <TableCaption>A list of recent transactions that occurred on this budget.</TableCaption>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex items-center justify-between space-x-2 py-4">
                <Pagination className='justify-end'>
                    <PaginationContent  >
                        <PaginationItem>
                            {table.getCanPreviousPage() ? (
                                <PaginationPrevious href="#" onClick={() => table.previousPage()} />
                            ) : (
                                <PaginationPrevious href="#" className="opacity-50 pointer-events-none" />
                            )}
                        </PaginationItem>
                        {Array.from({ length: table.getPageCount() }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    className={i === table.getState().pagination.pageIndex ? "bg-blue-500 text-white" : ""}
                                    onClick={() => table.setPageIndex(i)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            {table.getCanNextPage() ? (
                                <PaginationNext href="#" onClick={() => table.nextPage()} />
                            ) : (
                                <PaginationNext href="#" className="opacity-50 pointer-events-none" />
                            )}
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};