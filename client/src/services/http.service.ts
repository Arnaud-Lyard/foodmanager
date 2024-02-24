import axios, { AxiosInstance } from 'axios';
import { globalRouter } from '../router/globalRouter';
import { useAuthStore } from '../store/auth';

export class HttpService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            globalRouter.router?.push({ name: 'home' });
            const authStore = useAuthStore();
            authStore.logout();
          }
        }
        return Promise.reject(error);
      }
    );
  }
}
