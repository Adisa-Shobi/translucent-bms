import { LoadingButton } from "@/components/common";
import { Button } from "@/components/ui/button";
import { approveTransaction, rejectTransaction } from "@/lib/api/transaction/transaction";
import { TransactionDetail, TransactionStatus } from "@/types/transaction";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";

export const TransactionButtons = ({ transaction, loadTransaction }: {
    transaction: TransactionDetail,
    loadTransaction: (id: string) => void
}) => {
    const [loading, setLoading] = useState(false)
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        getSession().then((sess) => {
            setLoading(true);
            setSession(sess);
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className="flex flex-col px-4 w-full h-full justify-end">
            <div className="flex w-full gap-2" >
                {transaction.status === TransactionStatus.PENDING && <>
                    <RejectButton loadTransaction={loadTransaction} transactionId={transaction.id} />
                    <ApprovalButton loadTransaction={loadTransaction} transactionId={transaction.id} />
                </>}
                {transaction.status === TransactionStatus.REJECTED && <>
                    <BackButton />
                    {/* <ApprovalButton loadTransaction={loadTransaction} transactionId={transaction.id} /> */}
                </>}
                {transaction.status === TransactionStatus.APPROVED && <>
                    <BackButton />
                    <ValidateButton loadTransaction={loadTransaction} transactionId={transaction.id} />
                </>}
                {
                    transaction.status === TransactionStatus.VALIDATED && <>
                        <BackButton />
                    </>
                }
            </div>
        </div>
    );
};

const ApprovalButton = ({ transactionId, loadTransaction }: { transactionId: string, loadTransaction: (id: string) => void }) => {

    const [loading, setLoading] = useState(false)

    const requestApprove = (id: string) => {
        setLoading(true);
        approveTransaction(id).then((res) => {
            if (res) {
                loadTransaction(id)
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleApprove = () => {
        requestApprove(transactionId);
    }

    return (
        <LoadingButton className="bg-success text-white hover:bg-success-tint hover:text-success w-full" onClick={handleApprove} loading={loading} >
            Approve
        </LoadingButton>
    );
}

const BackButton = () => {
    return (
        <Button
            className="text-white w-full"
            onClick={() => {
                window.history.back();
            }} >
            Back
        </Button>
    );
}

const ValidateButton = ({ transactionId, loadTransaction }: { transactionId: string, loadTransaction: (id: string) => void }) => {
    const [loading, setLoading] = useState(false)
    return (
        <LoadingButton className="bg-destructive  text-white hover:bg-reject-tint w-full hover:text-reject"
            onClick={() => { }} loading={loading}
        >
            <FaRegFileAlt />
            Validate
        </LoadingButton>
    );
}

const RejectButton = ({ transactionId, loadTransaction }: { transactionId: string, loadTransaction: (id: string) => void }) => {

    const [loading, setLoading] = useState(false)

    const requestReject = (id: string) => {
        setLoading(true);
        rejectTransaction(id).then((res) => {
            if (res) {
                loadTransaction(id)
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleReject = () => {
        requestReject(transactionId);
    }

    return (
        <LoadingButton className="bg-destructive  text-white hover:bg-reject-tint w-full hover:text-reject" onClick={handleReject} loading={loading} >
            Reject
        </LoadingButton>
    );
}
