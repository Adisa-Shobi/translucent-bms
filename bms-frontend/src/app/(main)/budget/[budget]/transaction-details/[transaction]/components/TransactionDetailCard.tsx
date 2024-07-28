import { Card } from "@/components/ui/card";
import { BsCash } from "react-icons/bs";

export const TransactionDetailCard = () => {
    return (
        <Card className="border border-secondary rounded-lg p-4" >
            <div className='w-full text-secondary'>
                <BsCash />
                Amount
            </div>
            <div className='w-1/2'>
                TransactionAction
            </div>
        </Card>
    );
};