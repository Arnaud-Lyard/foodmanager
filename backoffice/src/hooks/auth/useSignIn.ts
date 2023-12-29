import { authService } from "../../services";
import Cookies from "js-cookie";
import { User } from "../../types/user";

export const useSignIn = () => {
  const signIn = async (email: string, password: string) => {
    const user = await authService.signIn(email, password);
    if (user) {
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user as User;
  };

  return { signIn };
};
