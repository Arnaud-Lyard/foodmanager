import { TeamUserResponse } from '../types/user';
import { HttpService } from './http.service';

const API_URL = import.meta.env.VITE_SERVER_API_URL;

export class UserService extends HttpService {
  constructor() {
    super(API_URL);
  }

  async getTeamUser() {
    const {
      data: { teamUsers, status },
    } = await this.instance.get<TeamUserResponse>(`/api/users/team`);
    return { teamUsers, status };
  }
}

export const userService = new UserService();
