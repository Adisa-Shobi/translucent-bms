/*
  Warnings:

  - You are about to drop the column `currency` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `approverId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `currencyId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `currencyId` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handlerId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BudgetAdmin" DROP CONSTRAINT "BudgetAdmin_userId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetMembers" DROP CONSTRAINT "BudgetMembers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_approverId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_currencyId_fkey";

-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "currency",
ADD COLUMN     "currencyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "approverId",
DROP COLUMN "currencyId",
ADD COLUMN     "handlerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetAdmin" ADD CONSTRAINT "BudgetAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetMembers" ADD CONSTRAINT "BudgetMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_handlerId_fkey" FOREIGN KEY ("handlerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
