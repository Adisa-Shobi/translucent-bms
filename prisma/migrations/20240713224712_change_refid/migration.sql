-- DropForeignKey
ALTER TABLE "BudgetAdmin" DROP CONSTRAINT "BudgetAdmin_userId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetMembers" DROP CONSTRAINT "BudgetMembers_userId_fkey";

-- AddForeignKey
ALTER TABLE "BudgetAdmin" ADD CONSTRAINT "BudgetAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetMembers" ADD CONSTRAINT "BudgetMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
