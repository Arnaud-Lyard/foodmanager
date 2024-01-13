import axios, { AxiosInstance } from "axios";

export class AxiosService {
  protected readonly instance: AxiosInstance;
  public constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      withCredentials: true,
    });
  }
}
