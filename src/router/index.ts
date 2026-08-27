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
      path: '/formularskabelon/snm/liste',
      name: 'formularskabelonliste',
      component: () => import('@/views/formularSkabelonListeView.vue'),
      meta: {
        showInNavBar: true,
        title: 'Skabeloner'
      },
    },
    {
      path: '/formularskabelon/snm/rediger/:skabelonId',
      name: 'formularskabelonRediger',
      component: () => import('@/views/formularSkabelonRedigerView.vue'),
      meta: {
        showInNavBar: false,
        title: 'Skabelon SNM Rediger'
      },
    }
  ],
})

export default router
