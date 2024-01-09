import { User } from "@/types/user";
import { AxiosResponse } from "axios";
import useSWR, { Fetcher } from "swr";
import { AxiosService } from "./axios.service";
export class AuthService extends AxiosService {
  login = async (
    email: string,
    password: string
  ): Promise<AxiosResponse<{ status: string; access_token: string }>> => {
    return await this.instance.post("/auth/adminlogin", {
      email,
      password,
    });
  };

  logout = async (): Promise<AxiosResponse<{ status: string }>> => {
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

  uploadAvatar = (userId: string, newAvatar: File) => {
    const formData = new FormData();
    formData.append("file", newAvatar);
    return this.instance
      .post(`/users/${userId}/upload`, formData)
      .then((res) => {
        return {
          newAvatar: res.data.data.url,
        };
      });
  };
}
