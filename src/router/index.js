import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Me from '../views/Me.vue';

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    }
  ]
})

export default router;
