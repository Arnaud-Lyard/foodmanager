import { RegisterResponse, VerifyEmailResponse } from '../types/auth';
import { HttpService } from './http.service';

const API_URL = import.meta.env.VITE_SERVER_API_URL;

export class AuthService extends HttpService {
  constructor() {
    super(API_URL);
  }

  async register({
    email,
    pseudo,
    password,
    passwordConfirm,
  }: {
    email: string;
    password: string;
    pseudo: string;
    passwordConfirm: string;
  }) {
    const { data } = await this.instance.post<RegisterResponse>(
      `api/auth/register`,
      {
        email,
        password,
        pseudo,
        passwordConfirm,
      }
    );
    return data;
  }

  async verifyEmail(verifyCode: string) {
    const { data } = await this.instance.get<VerifyEmailResponse>(
      `/api/auth/verifyemail/${verifyCode}`
    );
    return data;
  }
}

export const authService = new AuthService();
