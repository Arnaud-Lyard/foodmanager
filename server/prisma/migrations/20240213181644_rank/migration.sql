/*
  Warnings:

  - You are about to drop the column `faction` on the `player` table. All the data in the column will be lost.
  - Added the required column `race` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "player" DROP COLUMN "faction",
ADD COLUMN     "race" VARCHAR(255) NOT NULL,
ADD COLUMN     "rank" INTEGER NOT NULL;
