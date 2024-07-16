-- CreateTable
CREATE TABLE "Reciept" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reciept_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reciept_transactionId_key" ON "Reciept"("transactionId");

-- AddForeignKey
ALTER TABLE "Reciept" ADD CONSTRAINT "Reciept_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
