import { AuthService } from "@/services/auth.service";

export const useUser = () => {
  const authService = new AuthService();
  const { user, isLoading, error, mutate } = authService.user();
  return {
    user,
    isLoading,
    error,
    mutate,
  };
};
