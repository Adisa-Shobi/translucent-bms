import { LoadingButton } from "@/components/common";
import { Button } from "@/components/ui/button";
import { approveTransaction, rejectTransaction, validateTransaction } from "@/lib/api/transaction/transaction";
import { TransactionDetail, TransactionStatus } from "@/types/transaction";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
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
        <div className="flex flex-col px-4 w-full h-fill-available justify-end end-0">
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
            variant="outline"
            className="border-primary text-primary hover:text-primary w-full"
            onClick={() => {
                window.history.back();
            }} >
            Back
        </Button>
    );
}

const ValidateButton = ({ transactionId, loadTransaction }: { transactionId: string, loadTransaction: (id: string) => void }) => {
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleButtonClick = () => {
        fileInputRef?.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        if (selectedFile)
            uploadFile(transactionId, selectedFile);
    };

    const uploadFile = (transaction: string, file: File) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        validateTransaction(transaction, formData).then((res) => {
            if (res) {
                loadTransaction(transaction);
            }
        }).finally(() => {
            setLoading(false);
            setFile(null);
        })
    };


    return (
        <div className="w-full">
            <LoadingButton className="bg-success  text-white gap-2 hover:bg-success-tint w-full hover:text-success"
                onClick={handleButtonClick} loading={loading}
            >
                <FaRegFileAlt />
                Validate
            </LoadingButton>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />

        </div>

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
