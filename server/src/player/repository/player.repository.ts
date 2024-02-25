import prisma from '../../../prisma/client';

export class PlayerRepository {
  static async getAllPlayers() {
    return await prisma.player.findMany();
  }

  static async findByUserId(userId: string) {
    return await prisma.player.findUnique({
      include: { user: true },
      where: {
        id: userId,
      },
    });
  }

  static async createNewPlayer({
    userId,
    stormgateWorldId,
  }: {
    userId: string;
    stormgateWorldId: string;
  }) {
    return await prisma.player.create({
      data: {
        userId,
        stormgateWorldId,
      },
    });
  }

  static async updatePlayerById({
    playerId,
    stormgateWorldId,
  }: {
    playerId: string;
    stormgateWorldId: string;
  }) {
    return await prisma.player.update({
      where: { id: playerId },
      data: {
        stormgateWorldId,
      },
    });
  }

  static async getPlayerByUserId(userId: string) {
    return await prisma.player.findUnique({
      select: {
        stormgateWorldId: true,
      },
      where: {
        userId,
      },
    });
  }
}
