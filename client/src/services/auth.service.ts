import { User } from "@/types/user";
import axios, { AxiosInstance } from "axios";
import useSWR, { Fetcher } from "swr";
export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      withCredentials: true,
    });
  }

  login = (email: string, password: string) => {
    return this.instance.post("/auth/login", {
      email,
      password,
    });
  };

  logout = () => {
    return this.instance.get("/auth/logout");
  };

  user = () => {
    const fetcher: Fetcher<User> = (url: string) =>
      this.instance.get(url).then((res) => res.data);

    const { data, error, isLoading } = useSWR("/users", fetcher);
    return {
      user: data?.data.user,
      error,
      isLoading,
    };
  };

  forgotPassword = (email: string) => {
    return this.instance.post("/auth/forgotpassword", {
      email,
    });
  };

  resetPassword = ({
    password,
    passwordConfirm,
    token,
  }: {
    password: string;
    passwordConfirm: string;
    token: string;
  }) => {
    return this.instance.patch(`/auth/resetpassword/${token}`, {
      password,
      passwordConfirm,
    });
  };
}
