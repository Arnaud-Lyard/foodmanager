import { AuthService } from "@/services/auth.service";

export const useUser = () => {
  const authService = new AuthService(process.env.NEXT_PUBLIC_SERVER_URL!);
  const user = authService.user();
  return user;
};
