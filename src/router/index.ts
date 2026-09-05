import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/homeView.vue'
import { useDataStore } from '@/stores/dataStore.ts';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        showInNavBar: false,
        requireAdmin: false,
        title: 'SNM'
      },
    },
    {
      path: '/restore-data',
      name: 'restoreData',
      component: () => import('@/components/common/restoreData.vue'),
      meta: {
        showInNavBar: true,
        requireAdmin: true,
        title: 'Restore Data'
      },
    },
    {
      path: '/dump/',
      name: 'dump',
      component: () => import('@/views/dataDumpView.vue'),
      meta: {
        showInNavBar: true,
        requireAdmin: true,
        title: 'View Data'
      }
    },
    {
      path: '/scenario/list',
      name: 'scenarioList',
      component: () => import('@/views/scenarioListView.vue'),
      meta: {
        showInNavBar: true,
        requireAdmin: true,
        title: 'Scenarios'
      },
    },
    {
      path: '/template/list',
      name: 'templateList',
      component: () => import('@/views/formTemplateListView.vue'),
      meta: {
        showInNavBar: true,
        requireAdmin: false,
        title: 'Templates'
      },
    },
    {
      path: '/template/add',
      name: 'templateAdd',
      component: () => import('@/views/formTemplateNameEditView.vue'),
      meta: {
        showInNavBar: false,
        requireAdmin: false,
        title: 'Add Template'
      },
    },
    {
      path: '/template/name/edit/:templateNameId',
      name: 'templatenameEdit',
      component: () => import('@/views/formTemplateNameEditView.vue'),
      meta: {
        showInNavBar: false,
        requireAdmin: false,
        title: 'Edit Template'
      },
    },
    {
      path: '/template/name/copy/:templateNameId',
      name: 'templateNameCopy',
      component: () => import('@/views/formTemplateNameEditView.vue'),
      meta: {
        showInNavBar: false,
        requireAdmin: false,
        title: 'Copy Template'
      },
    },
    {
      path: '/template/fields/edit/:templateNameId',
      name: 'templateFieldsEdit',
      component: () => import('@/views/formTemplateFieldsView.vue'),
      meta: {
        showInNavBar: false,
        requireAdmin: false,
        title: 'Edit Template Fields'
      },
    },
    {
      path: '/template/fields/view/:templateNameId',
      name: 'templateFieldsView',
      component: () => import('@/views/formTemplateFieldsView.vue'),
      meta: {
        showInNavBar: false,
        requireAdmin: false,
        title: 'View Template Fields'
      },
    },
    {
      path: '/licensee/:licenseeId',
      name: 'licensee',
      component: () => import('@/components/common/licensee/licensee.vue'),
      meta: {
        showInNavBar: false,
        requireAdmin: false,
        title: 'Licensee'
      }
    },
    {
      path: '/banding/',
      name: 'banding',
      component: () => import('@/views/bandingView.vue'),
      meta: {
        showInNavBar: true,
        requireAdmin: false,
        title: 'Banding'
      }
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const dataStore = useDataStore();
  if (to.name == 'templateFieldsEdit') {
    if (dataStore.formTemplateNameList.some((item) => item.id == Number(to.params.templateNameId) &&
      item.licenseeId == dataStore.LicenseeId)) {
      next();
    }
    else if (dataStore.isAdministrator &&
      dataStore.formTemplateNameList.some((item) => item.id == Number(to.params.templateNameId) &&
        item.licenseeId == undefined)) {
      next();
    }
    else {
      next({ path: '/' });
    }
  }
  else {
    next();
  }
});

export default router