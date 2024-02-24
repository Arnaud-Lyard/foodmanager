import { defineStore } from 'pinia';
import { Role } from '../types/user';
interface State {
  auth: boolean;
  role: Role | null;
}
export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    auth: false,
    role: null,
  }),
  actions: {
    login(data: { isConnect: boolean; role: Role }) {
      this.auth = data.isConnect;
      this.role = data.role;
    },
    logout() {
      this.auth = false;
      this.role = null;
    },
  },
  getters: {
    isLoggedIn: (state) => state.auth,
    isAdmin: (state) => state.role === 'admin',
  },
});
