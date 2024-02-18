-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "GradeEnumType" AS ENUM ('user', 'player', 'manager');

-- CreateEnum
CREATE TYPE "ProgressEnumType" AS ENUM ('up', 'equal', 'down');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pseudo" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" VARCHAR(255),
    "verified" BOOLEAN DEFAULT false,
    "esl" VARCHAR(255),
    "twitter" VARCHAR(255),
    "grade" "GradeEnumType" NOT NULL DEFAULT 'user',
    "password" TEXT NOT NULL,
    "role" "RoleEnumType" DEFAULT 'user',
    "verification_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "password_reset_token" TEXT,
    "password_reset_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nickname" VARCHAR(255) NOT NULL,
    "rank" INTEGER NOT NULL,
    "race" VARCHAR(255) NOT NULL,
    "league" VARCHAR(255) NOT NULL,
    "win_rate" INTEGER NOT NULL,
    "mmr" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "ties" INTEGER NOT NULL,
    "matches" INTEGER NOT NULL,
    "progress" "ProgressEnumType" DEFAULT 'equal',
    "user_id" UUID NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_verification_code_key" ON "user"("verification_code");

-- CreateIndex
CREATE INDEX "user_email_verification_code_password_reset_token_idx" ON "user"("email", "verification_code", "password_reset_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_verification_code_password_reset_token_key" ON "user"("email", "verification_code", "password_reset_token");

-- CreateIndex
CREATE UNIQUE INDEX "player_user_id_key" ON "player"("user_id");

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
