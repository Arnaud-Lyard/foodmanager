import { AuthService } from "@/services/auth.service";

export const useLogout = () => {
  const logout = async () => {
    const authService = new AuthService("http://localhost:4000");

    const user = await authService.logout();

    return user;
  };
  return { logout };
};
