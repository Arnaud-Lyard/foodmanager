import { AuthService } from "@/services/auth.service";

export const useUser = () => {
  const authService = new AuthService(process.env.NEXT_PUBLIC_SERVER_URL!);
  const { user, isLoading, error, mutate } = authService.user();
  return {
    user,
    isLoading,
    error,
    mutate,
  };
};
