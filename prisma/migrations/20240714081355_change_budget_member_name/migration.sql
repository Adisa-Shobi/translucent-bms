/*
  Warnings:

  - You are about to drop the `BudgetMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BudgetMembers" DROP CONSTRAINT "BudgetMembers_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetMembers" DROP CONSTRAINT "BudgetMembers_userId_fkey";

-- DropTable
DROP TABLE "BudgetMembers";

-- CreateTable
CREATE TABLE "BudgetMember" (
    "budgetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BudgetMember_pkey" PRIMARY KEY ("budgetId","userId")
);

-- AddForeignKey
ALTER TABLE "BudgetMember" ADD CONSTRAINT "BudgetMember_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetMember" ADD CONSTRAINT "BudgetMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
