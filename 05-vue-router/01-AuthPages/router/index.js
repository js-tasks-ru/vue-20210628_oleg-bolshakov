import { createRouter, createWebHistory } from 'vue-router';

import IndexPage from '../views/PageIndex';
import LoginPage from '../views/PageLogin';
import RegisterPage from '../views/PageRegister';

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
];

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes,
});
