import { AuthService } from "@/services/auth.service";

export const useUser = () => {
  const authService = new AuthService("http://localhost:4000");
  const user = authService.user();
  return user;
};
