-- AlterTable
ALTER TABLE "users" ADD COLUMN "supabaseId" TEXT;

-- Update existing users with placeholder values (they'll be updated when they sign in)
UPDATE "users" SET "supabaseId" = 'temp_' || "clerkId" WHERE "supabaseId" IS NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "supabaseId" SET NOT NULL;

-- DropIndex
DROP INDEX "users_clerkId_key";

-- CreateIndex
CREATE UNIQUE INDEX "users_supabaseId_key" ON "users"("supabaseId");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "clerkId";
