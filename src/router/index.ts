import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/administrator',
      name: 'Administrator',
      component: () => import('@/views/AdministratorView.vue'),
    },
    {
      path: '/licenshaver',
      name: 'Licenshaver',
      component: () => import('@/views/LicensHaverView.vue'),
    },
  ],
})

export default router
