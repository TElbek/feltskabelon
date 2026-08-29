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
      path: '/gendan-data',
      name: 'gendan-data',
      component: () => import('@/components/common/gendanData.vue'),
      meta: {
        showInNavBar: true,
        title: 'Gendan Data'
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
      path: '/formularskabelonnavn/rediger/:skabelonNavnId',
      name: 'formularskabelonNavnRediger',
      component: () => import('@/views/formularSkabelonNavnRedigerView.vue'),
      meta: {
        showInNavBar: false,
        title: 'Rediger Skabelon'
      },
    },
    {
      path: '/formularskabelonfelter/rediger/:skabelonNavnId',
      name: 'formularskabelonFelterRediger',
      component: () => import('@/views/formularSkabelonFelterRedigerView.vue'),
      meta: {
        showInNavBar: false,
        title: 'Rediger Skabelon'
      },
    },
    {
      path: '/licenshaver/:licenshaverId',
      name: 'licenshaver',
      component: () => import('@/components/common/licenshaver/licenshaver.vue'),
      meta: {
        showInNavBar: false,
        title: 'licenshaver'
      }
    }
  ],
})

export default router