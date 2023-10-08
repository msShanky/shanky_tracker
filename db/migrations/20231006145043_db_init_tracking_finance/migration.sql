-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('RESET_PASSWORD');

-- CreateEnum
CREATE TYPE "RecurringPeriod" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "expired_at" TIMESTAMP(3),
    "handle" TEXT NOT NULL,
    "hashed_session_token" TEXT,
    "anti_csrf_token" TEXT,
    "public_data" TEXT,
    "private_data" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "sent_to" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_mode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_mode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_purpose" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_purpose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagMapping" (
    "id" SERIAL NOT NULL,
    "tag_name" TEXT NOT NULL,
    "transaction_mode_id" INTEGER,
    "transaction_purpose_id" INTEGER,
    "bankTransactionId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_transaction" (
    "id" SERIAL NOT NULL,
    "transaction_date" TEXT NOT NULL,
    "credit_amount" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "debit_amount" DECIMAL(65,30) NOT NULL,
    "ref_number" TEXT NOT NULL,
    "closing_balance" DECIMAL(65,30) NOT NULL,
    "bank_name" TEXT NOT NULL,
    "transaction_mode_id" INTEGER NOT NULL,
    "transaction_purpose_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bank_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "progress" TEXT NOT NULL,
    "baseUnit" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tracker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracker_entry" (
    "id" SERIAL NOT NULL,
    "tracking_id" INTEGER NOT NULL,
    "unit" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tracker_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracking_goal" (
    "id" SERIAL NOT NULL,
    "tracker_id" INTEGER NOT NULL,
    "recurring_period" "RecurringPeriod" NOT NULL,
    "target_unit" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tracking_goal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_handle_key" ON "session"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "token_hashedToken_type_key" ON "token"("hashedToken", "type");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMapping" ADD CONSTRAINT "TagMapping_transaction_mode_id_fkey" FOREIGN KEY ("transaction_mode_id") REFERENCES "transaction_mode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMapping" ADD CONSTRAINT "TagMapping_transaction_purpose_id_fkey" FOREIGN KEY ("transaction_purpose_id") REFERENCES "transaction_purpose"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMapping" ADD CONSTRAINT "TagMapping_bankTransactionId_fkey" FOREIGN KEY ("bankTransactionId") REFERENCES "bank_transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_transaction" ADD CONSTRAINT "bank_transaction_transaction_mode_id_fkey" FOREIGN KEY ("transaction_mode_id") REFERENCES "transaction_mode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_transaction" ADD CONSTRAINT "bank_transaction_transaction_purpose_id_fkey" FOREIGN KEY ("transaction_purpose_id") REFERENCES "transaction_purpose"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracker_entry" ADD CONSTRAINT "tracker_entry_tracking_id_fkey" FOREIGN KEY ("tracking_id") REFERENCES "tracker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracking_goal" ADD CONSTRAINT "tracking_goal_tracker_id_fkey" FOREIGN KEY ("tracker_id") REFERENCES "tracker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
