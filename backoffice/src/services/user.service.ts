import axios, { AxiosInstance } from "axios";

export class UserService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      withCredentials: true,
    });
  }

  upload = async (formData: FormData) => {
    return this.instance
      .post("/users/upload", formData)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
}
