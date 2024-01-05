import { UserService } from "../../services/user.service";

export const useUpload = () => {
  const upload = async (formData: FormData) => {
    const userService = new UserService(process.env.NEXT_PUBLIC_SERVER_URL!);

    await userService.upload(formData);
  };
  return { upload };
};
