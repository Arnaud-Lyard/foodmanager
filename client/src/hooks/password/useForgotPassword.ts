import { AuthService } from "../../services/auth.service";

export const useForgotPassword = () => {
  const forgotPassword = async (email: string) => {
    const authService = new AuthService();

    await authService.forgotPassword(email);
  };
  return { forgotPassword };
};
