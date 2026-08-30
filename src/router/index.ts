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
      path: '/skabelon/liste',
      name: 'skabelonliste',
      component: () => import('@/views/formularSkabelonListeView.vue'),
      meta: {
        showInNavBar: true,
        title: 'Skabeloner'
      },
    },
    {
      path: '/skabelonnavn/rediger/:skabelonNavnId',
      name: 'skabelonNavnRediger',
      component: () => import('@/views/formularSkabelonNavnRedigerView.vue'),
      meta: {
        showInNavBar: false,
        title: 'Rediger Skabelon'
      },
    },
    {
      path: '/skabelonnavn/kopier/:skabelonNavnId',
      name: 'skabelonNavnKopier',
      component: () => import('@/views/formularSkabelonNavnRedigerView.vue'),
      meta: {
        showInNavBar: false,
        title: 'Kopier Skabelon'
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
      path: '/formularskabelonfelter/vis/:skabelonNavnId',
      name: 'formularskabelonFelterVis',
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