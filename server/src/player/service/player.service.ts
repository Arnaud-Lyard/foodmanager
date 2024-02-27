import { Player, ProgressEnumType } from '@prisma/client';
import { StormgateWorldInput } from '../../api/stormgateworld.schema';
import { UserRepository } from '../../user/repository/user.repository';
import { IPlayerUpdateDto } from '../dto/player.dto';
import { PlayerRepository } from '../repository/player.repository';

export const getAllPlayers = async () => {
  return await PlayerRepository.getAllPlayers();
};

export const createNewPlayerOrUpdatePlayer = async (
  datas: (StormgateWorldInput | undefined)[]
) => {
  const playersData: IPlayerUpdateDto[] = await formatData(datas);

  for (const playerData of playersData) {
    const player = await PlayerRepository.findPlayerByNicknameAndRace(
      playerData
    );
    await createOrUpdatePlayer({ player, playerData });
    await calculateProgression({ player, playerData });
  }
};

async function formatData(
  datas: (StormgateWorldInput | undefined)[]
): Promise<IPlayerUpdateDto[]> {
  let players: IPlayerUpdateDto[] = [];
  for (const data of datas) {
    if (data?.leaderboard_entries) {
      for (const leaderboardEntry of data.leaderboard_entries) {
        players.push({
          stormgateWorldId: data.id,
          nickname: data.nickname,
          rank: leaderboardEntry.rank,
          race: leaderboardEntry.race,
          league: leaderboardEntry.league,
          tier: leaderboardEntry.tier,
          mmr: leaderboardEntry.mmr,
          points: leaderboardEntry.points,
          wins: leaderboardEntry.wins,
          losses: leaderboardEntry.losses,
          ties: leaderboardEntry.ties,
          matches: leaderboardEntry.matches,
          winrate: leaderboardEntry.win_rate,
        });
      }
    }
  }
  return players;
}

async function createOrUpdatePlayer({
  player,
  playerData,
}: {
  player: Player | null;
  playerData: IPlayerUpdateDto;
}) {
  const user = await UserRepository.findUserByStormgateId(
    playerData.stormgateWorldId
  );

  if (!player) {
    await PlayerRepository.createNewPlayer({
      player: playerData,
      userId: user!.id,
    });
  }

  await PlayerRepository.updatePlayer({
    player,
    playerData,
  });
}

async function calculateProgression({
  player,
  playerData,
}: {
  player: Player | null;
  playerData: IPlayerUpdateDto;
}) {
  console.log('player', player);
  console.log('playerData', playerData);
  if (!player) return;
  let progression: ProgressEnumType;
  if (player.mmr === playerData.mmr) {
    progression = 'equal';
  } else if (player.mmr! < playerData.mmr) {
    progression = 'up';
  } else {
    progression = 'down';
  }

  console.log('progression', progression);

  await PlayerRepository.updatePlayerProgression({
    player,
    progression,
  });
}
