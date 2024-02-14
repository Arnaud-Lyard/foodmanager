import { defineStore } from "pinia";
interface State {
  auth: boolean;
}
export const useAuthStore = defineStore("auth", {
  state: (): State => ({
    auth: false,
  }),
  actions: {
    login() {
      this.auth = true;
    },
    logout() {
      this.auth = false;
    },
  },
  getters: {
    isLoggedIn: (state) => state.auth,
  },
});
