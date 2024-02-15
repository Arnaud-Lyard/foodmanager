import { PlayerResponse } from '../types/player';
import { HttpService } from './http.service';

const API_URL = import.meta.env.VITE_SERVER_API_URL;

export class PlayerService extends HttpService {
  constructor() {
    super(API_URL);
  }

  async getAllPlayers() {
    const {
      data: { players, status },
    } = await this.instance.get<PlayerResponse>(`/api/players`);
    return { players, status };
  }
}

export const playerService = new PlayerService();
