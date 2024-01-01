import { AuthService } from "@/services/auth.service";

export const useLogin = () => {
  const login = async (email: string, password: string) => {
    const authService = new AuthService("http://localhost:4000");

    await authService.login(email, password);
  };
  return { login };
};
