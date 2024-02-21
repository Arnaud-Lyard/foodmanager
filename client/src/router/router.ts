import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../layouts/Auth.vue';
import User from '../layouts/User.vue';
import Visitor from '../layouts/Visitor.vue';
import { userService } from '../services/user.service';
import { useAuthStore } from '../store/auth';
import Dashboard from '../views/Dashboard.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Post from '../views/Post.vue';
import Register from '../views/Register.vue';
import ResetPassword from '../views/ResetPassword.vue';
import Team from '../views/Team.vue';
import VerifyEmail from '../views/VerifyEmail.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { layout: Visitor },
    component: Home,
  },
  {
    path: '/equipe',
    name: 'team',
    meta: { layout: Visitor },
    component: Team,
  },
  {
    path: '/article/:id',
    name: 'blog',
    meta: { layout: Visitor },
    component: Post,
  },
  {
    path: '/connexion',
    name: 'login',
    meta: { layout: Auth },
    component: Login,
  },
  {
    path: '/inscription',
    name: 'register',
    meta: { layout: Auth },
    component: Register,
  },
  {
    path: '/verification-email/:verifycode',
    name: 'verifyemail',
    meta: { layout: Auth },
    component: VerifyEmail,
  },
  {
    path: '/mot-de-passe-oublie',
    name: 'forgotpassword',
    meta: { layout: Auth },
    component: ForgotPassword,
  },
  {
    path: '/reinitialiser-mot-de-passe/:resettoken',
    name: 'resetpassword',
    meta: { layout: Auth },
    component: ResetPassword,
  },
  {
    path: '/tableau-de-bord',
    name: 'dashboard',
    meta: { layout: User },
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async () => {
  const authStore = useAuthStore();
  const { data } = await userService.getMe();
  if (!data.isConnect) {
    authStore.logout();
    return;
  }
  authStore.login();
});

export default router;
