import { AuthService } from "../../services/auth.service";

export const useForgotPassword = () => {
  const forgotPassword = async (email: string) => {
    const authService = new AuthService(process.env.NEXT_PUBLIC_SERVER_URL!);

    await authService.forgotPassword(email);
  };
  return { forgotPassword };
};
