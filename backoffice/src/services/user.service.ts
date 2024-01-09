import { AxiosResponse } from "axios";
import { AxiosService } from "./axios.service";

export class UserService extends AxiosService {
  upload = async (
    formData: FormData
  ): Promise<AxiosResponse<{ status: string }>> => {
    return await this.instance.post("/users/upload", formData);
  };
}
