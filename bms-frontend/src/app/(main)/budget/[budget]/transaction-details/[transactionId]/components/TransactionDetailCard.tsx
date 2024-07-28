import { StatusBadge } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toDDMMMYYYY } from "@/lib/helpers/datetimeFormatters";
import { toMoney } from "@/lib/utils";
import { TransactionDetail } from "@/types/transaction";
import { BsCash } from "react-icons/bs";

export const TransactionDetailCard = ({ transaction }: { transaction: TransactionDetail }) => {

    const transactionInfo = [
        { heading: "Purpose", info: transaction?.purpose },
        { heading: "Transaction ID", info: transaction?.transactionId },
        { heading: "Transaction Date", info: toDDMMMYYYY(transaction?.createdAt) },
    ]

    return (
        <Card className="border border-secondary rounded-lg p-4" >
            <div className='flex gap-2 w-full items-center c-subtitle text-sm font-semibold'>
                <BsCash size={25} />
                Amount
            </div>
            <div className="flex w-full justify-between items-center" >
                <h1 className="c-heading-2 font-normal my-4" >
                    ${toMoney(transaction.amount)}
                </h1>

                <StatusBadge status={transaction.status} />
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