import { PlayerRepository } from "../repository/player.repository";

export const getAllPlayers = async () => {
  return await PlayerRepository.getAllPlayers();
};
