/*
  Warnings:

  - You are about to drop the `TagMapping` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `entryDateTime` to the `tracker_entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TagMapping" DROP CONSTRAINT "TagMapping_bankTransactionId_fkey";

-- DropForeignKey
ALTER TABLE "TagMapping" DROP CONSTRAINT "TagMapping_transaction_mode_id_fkey";

-- DropForeignKey
ALTER TABLE "TagMapping" DROP CONSTRAINT "TagMapping_transaction_purpose_id_fkey";

-- AlterTable
ALTER TABLE "tracker_entry" ADD COLUMN     "entryDateTime" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "TagMapping";

-- CreateTable
CREATE TABLE "tag_mapping" (
    "id" SERIAL NOT NULL,
    "tag_name" TEXT NOT NULL,
    "transaction_mode_id" INTEGER,
    "transaction_purpose_id" INTEGER,
    "bankTransactionId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tag_mapping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tag_mapping" ADD CONSTRAINT "tag_mapping_transaction_mode_id_fkey" FOREIGN KEY ("transaction_mode_id") REFERENCES "transaction_mode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_mapping" ADD CONSTRAINT "tag_mapping_transaction_purpose_id_fkey" FOREIGN KEY ("transaction_purpose_id") REFERENCES "transaction_purpose"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_mapping" ADD CONSTRAINT "tag_mapping_bankTransactionId_fkey" FOREIGN KEY ("bankTransactionId") REFERENCES "bank_transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
