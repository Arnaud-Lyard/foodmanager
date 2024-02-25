import { defineStore } from 'pinia';
import { Role } from '../types/user';
interface State {
  auth: boolean;
  role: Role | null;
  pseudo: string;
  avatar: string;
}
export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    auth: false,
    role: null,
    pseudo: '',
    avatar: '',
  }),
  actions: {
    login(data: {
      isConnect: boolean;
      informations: { role: Role; pseudo: string; avatar: string };
    }) {
      this.auth = data.isConnect;
      this.role = data.informations.role;
      this.pseudo = data.informations.pseudo;
      this.avatar = data.informations.avatar;
    },
    logout() {
      this.auth = false;
      this.role = null;
      this.pseudo = '';
      this.avatar = '';
    },
  },
  getters: {
    isLoggedIn: (state) => state.auth,
    isAdmin: (state) => state.role === 'admin',
    getUserInformations: (state) => ({
      pseudo: state.pseudo,
      avatar: state.avatar,
    }),
  },
});
