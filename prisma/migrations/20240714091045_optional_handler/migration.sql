-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_handlerId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "handlerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_handlerId_fkey" FOREIGN KEY ("handlerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
