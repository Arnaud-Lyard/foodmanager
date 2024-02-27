import { Player, ProgressEnumType } from '@prisma/client';
import prisma from '../../../prisma/client';
import { IPlayerUpdateDto } from '../dto/player.dto';

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

  static async findPlayerByNicknameAndRace(player: IPlayerUpdateDto) {
    return await prisma.player.findFirst({
      where: {
        nickname: player.nickname,
        race: player.race,
      },
    });
  }

  static async createNewPlayer({
    player,
    userId,
  }: {
    player: IPlayerUpdateDto;
    userId: string;
  }) {
    return await prisma.player.create({
      include: { user: true },
      data: {
        nickname: player.nickname,
        rank: player.rank,
        race: player.race,
        league: player.league,
        tier: player.tier,
        winrate: player.winrate,
        mmr: player.mmr,
        points: player.points,
        wins: player.wins,
        losses: player.losses,
        ties: player.ties,
        matches: player.matches,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  static async updatePlayer({
    player,
    playerData,
  }: {
    player: Player | null;
    playerData: IPlayerUpdateDto;
  }) {
    return await prisma.player.update({
      where: {
        id: player!.id,
      },
      data: {
        nickname: playerData.nickname,
        rank: playerData.rank,
        race: playerData.race,
        league: playerData.league,
        tier: playerData.tier,
        winrate: playerData.winrate,
        mmr: playerData.mmr,
        points: playerData.points,
        wins: playerData.wins,
        losses: playerData.losses,
        ties: playerData.ties,
        matches: playerData.matches,
      },
    });
  }

  static async updatePlayerProgression({
    player,
    progression,
  }: {
    player: Player | null;
    progression: ProgressEnumType;
  }) {
    return await prisma.player.update({
      where: {
        id: player!.id,
      },
      data: {
        progress: progression,
      },
    });
  }
}
