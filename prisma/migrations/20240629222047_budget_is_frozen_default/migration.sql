-- DropIndex
DROP INDEX "Budget_ownerId_key";

-- AlterTable
ALTER TABLE "Budget" ALTER COLUMN "isFrozen" SET DEFAULT false;
