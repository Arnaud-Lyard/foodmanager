import { AuthService } from "../../services/auth.service";

export const useResetPassword = () => {
  const resetPassword = async ({
    password,
    passwordConfirm,
    token,
  }: {
    password: string;
    passwordConfirm: string;
    token: string;
  }) => {
    const authService = new AuthService();

    await authService.resetPassword({ password, passwordConfirm, token });
  };
  return { resetPassword };
};
