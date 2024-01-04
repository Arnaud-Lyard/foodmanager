import { AuthService } from "@/services/auth.service";

export const useUpload = () => {
  const upload = async (formData: FormData) => {
    const authService = new AuthService(process.env.NEXT_PUBLIC_SERVER_URL!);

    await authService.upload(formData);
  };
  return { upload };
};
