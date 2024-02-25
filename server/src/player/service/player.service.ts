import { PlayerRepository } from '../repository/player.repository';

export const getAllPlayers = async () => {
  return await PlayerRepository.getAllPlayers();
};

export const getPlayerByUserId = async (userId: string) => {
  return await PlayerRepository.getPlayerByUserId(userId);
};
