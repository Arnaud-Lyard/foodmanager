import {
  ILoginResponse,
  IRegisterResponse,
  IVerifyEmailResponse,
} from '../types/auth';
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
    const { data } = await this.instance.post<IRegisterResponse>(
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

  async login({ email, password }: { email: string; password: string }) {
    const { data } = await this.instance.post<ILoginResponse>(
      `api/auth/login`,
      {
        email,
        password,
      }
    );
    return data;
  }

  async verifyEmail(verifyCode: string) {
    const { data } = await this.instance.get<IVerifyEmailResponse>(
      `/api/auth/verifyemail/${verifyCode}`
    );
    return data;
  }
}

export const authService = new AuthService();
