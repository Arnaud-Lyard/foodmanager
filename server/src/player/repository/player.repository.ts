import prisma from "../../../prisma/client";

export class PlayerRepository {
  static async getAllPlayers() {
    return await prisma.player.findMany();
  }
}
