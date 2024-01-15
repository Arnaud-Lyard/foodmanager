import { UserService } from "../../services/user.service";

export const useUpload = () => {
  const upload = async (formData: FormData) => {
    const userService = new UserService();
    await userService.upload(formData);
  };
  return { upload };
};
