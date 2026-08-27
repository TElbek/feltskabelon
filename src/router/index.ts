import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        showInNavBar: false,
        title: 'SNM'
      },
    },
    {
      path: '/formularskabelonliste',
      name: 'formularskabelonliste',
      component: () => import('@/views/formularSkabelonListeView.vue'),
      meta: {
        showInNavBar: true,
        title: 'Skabeloner'
      },
    }
  ],
})

export default router
