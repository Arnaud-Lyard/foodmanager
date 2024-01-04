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

  upload = async (formData: FormData) => {
    return this.instance
      .post("/users/upload", formData)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
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
