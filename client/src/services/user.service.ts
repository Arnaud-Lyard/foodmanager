import {
  ILoggedUserResponse,
  ITeamUserResponse,
  IUpdateUserResponse,
  IUserResponse,
} from '../types/user';
import { HttpService } from './http.service';

const API_URL = import.meta.env.VITE_SERVER_API_URL;

export class UserService extends HttpService {
  constructor() {
    super(API_URL);
  }

  async getTeamUser() {
    const {
      data: { teamUsers, status },
    } = await this.instance.get<ITeamUserResponse>(`/api/users/team`);
    return { teamUsers, status };
  }

  async getMe() {
    const { data } = await this.instance.get<ILoggedUserResponse>(
      `/api/users/me`
    );
    return data;
  }

  async getUser() {
    const { data } = await this.instance.get<IUserResponse>(`/api/users/`);
    return data;
  }

  async updateUser(formData: FormData) {
    const { data } = await this.instance.post<IUpdateUserResponse>(
      `/api/users/update`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  }
}

export const userService = new UserService();
