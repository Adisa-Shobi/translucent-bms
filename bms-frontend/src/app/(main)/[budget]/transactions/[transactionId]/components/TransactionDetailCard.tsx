import { StatusBadge } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toDDMMMYYYY } from "@/lib/helpers/datetimeFormatters";
import { toMoney } from "@/lib/utils";
import { TransactionDetail } from "@/types/transaction";
import { useEffect, useState } from "react";
import { BsCash } from "react-icons/bs";

export const TransactionDetailCard = ({ transaction, loading }: { transaction: TransactionDetail | null, loading: boolean }) => {
    const [transactionInfo, setTransactionInfo] = useState<{ heading: string, info: string }[]>([]);


    console.log(transaction, loading);
    useEffect(() => {
        if (!transaction) return;
        setTransactionInfo([
            { heading: "Creator", info: `${transaction.creator.firstName} ${transaction.creator.lastName}` },
            { heading: "Purpose", info: transaction?.purpose },
            { heading: "Transaction ID", info: transaction?.transactionId },
            { heading: "Transaction Date", info: toDDMMMYYYY(transaction?.createdAt) },
        ])
    }, [loading]);


    return (
        loading || !transaction ? <TransactionDetailsSkeleton /> :
            <Card className="border border-secondary rounded-lg p-4" >
                <div className='flex gap-2 w-full items-center c-subtitle text-sm font-semibold'>
                    <BsCash size={25} />
                    Amount
                </div>
                <div className="flex w-full justify-between items-center" >
                    <h1 className="c-heading-2 font-normal my-4" >
                        {transaction?.budget?.currency?.symbol}{toMoney(transaction?.amount)}
                    </h1>

                    <StatusBadge status={transaction?.status} />
                </div>

                <Separator className="border-secondary mb-5" />
                <div className='c-subheading text-secondary text-lg'>
                    Transaction Details
                </div>
                <div className="my-6" >
                    {transactionInfo.map((item, index) => (
                        <>
                            <TransactionDetailItem key={index} heading={item.heading} info={item.info} />
                            {index !== transactionInfo.length - 1 && <Separator className="border-secondary" />}
                        </>
                    ))}


                </div>
            </Card>
    );
};

const TransactionDetailsSkeleton = () => {
    return (
        <div className="p-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-8 my-2 w-[200px]" />
            <div className="flex flex-col" >
                {[1, 2, 3, 4, 5, 6].map((_, index) => (<Skeleton key={index} className="h-6 my-4 w-full" />))}
            </div>
        </div>
    )
}

const TransactionDetailItem = ({ heading, info }: { heading: string, info: string }) => {
    return (
        <div className=" py-4" >
            <div className="flex justify-between" >
                <h1 className="c-subheading text-lg" >
                    {heading}
                </h1>
                <p className="text-secondary" >
                    {info}
                </p>
            </div>
        </div>
    );
}