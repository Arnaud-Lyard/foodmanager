import { AuthService } from "@/services/auth.service";

export const useLogout = () => {
  const logout = async () => {
    const authService = new AuthService(process.env.NEXT_PUBLIC_SERVER_URL!);

    const user = await authService.logout();

    return user;
  };
  return { logout };
};
