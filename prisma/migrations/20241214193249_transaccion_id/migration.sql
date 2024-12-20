-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "transactionId" TEXT,
ALTER COLUMN "isPaid" SET DEFAULT false;
