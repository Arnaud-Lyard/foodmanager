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
    "stormgate_world_id" VARCHAR(255),
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
    "nickname" VARCHAR(255),
    "rank" INTEGER,
    "race" VARCHAR(255),
    "league" VARCHAR(255),
    "tier" INTEGER,
    "win_rate" DOUBLE PRECISION,
    "mmr" DOUBLE PRECISION,
    "points" INTEGER,
    "wins" INTEGER,
    "losses" INTEGER,
    "ties" INTEGER,
    "matches" INTEGER,
    "progress" "ProgressEnumType" DEFAULT 'equal',
    "user_id" UUID NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_stormgate_world_id_key" ON "user"("stormgate_world_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_verification_code_key" ON "user"("verification_code");

-- CreateIndex
CREATE INDEX "user_email_verification_code_password_reset_token_idx" ON "user"("email", "verification_code", "password_reset_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_verification_code_password_reset_token_key" ON "user"("email", "verification_code", "password_reset_token");

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
