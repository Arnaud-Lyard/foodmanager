import { User } from "@/types/user";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import useSWR, { Fetcher } from "swr";
import { AxiosService } from "./axios.service";
export class AuthService extends AxiosService {
  login = (
    email: string,
    password: string
  ): Promise<AxiosResponse<{ status: string; access_token: string }>> => {
    return this.instance.post("/auth/login", {
      email,
      password,
    });
  };

  logout = (): Promise<AxiosResponse<{ status: string }>> => {
    return this.instance.get("/auth/logout");
  };

  user = () => {
    const fetcher: Fetcher<User> = (url: string) =>
      this.instance.get(url).then((res) => res.data);

    const { data, error, isLoading, mutate } = useSWR("/users", fetcher);
    return {
      user: data?.data.user,
      error,
      isLoading,
      mutate,
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
