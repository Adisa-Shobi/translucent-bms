/*
  Warnings:

  - You are about to drop the column `url` on the `Reciept` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileId]` on the table `Reciept` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileId` to the `Reciept` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reciept" DROP COLUMN "url",
ADD COLUMN     "fileId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reciept_fileId_key" ON "Reciept"("fileId");

-- AddForeignKey
ALTER TABLE "Reciept" ADD CONSTRAINT "Reciept_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
