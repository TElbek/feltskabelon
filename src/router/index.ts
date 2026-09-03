import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
        title: 'SNM'
      },
    },
    {
      path: '/restore-data',
      name: 'restoreData',
      component: () => import('@/components/common/restoreData.vue'),
      meta: {
        showInNavBar: true,
        title: 'Restore Data'
      },
    },
    {
      path: '/template/list',
      name: 'templateList',
      component: () => import('@/views/formTemplateListView.vue'),
      meta: {
        showInNavBar: true,
        title: 'Template List'
      },
    },
    {
      path: '/template/name/rediger/:templateNameId',
      name: 'templatenameEdit',
      component: () => import('@/views/formTemplateNameEditView.vue'),
      meta: {
        showInNavBar: false,
        title: 'Edit Template'
      },
    },
    {
      path: '/template/name/copy/:templateNameId',
      name: 'templateNameCopy',
      component: () => import('@/views/formTemplateNameEditView.vue'),
      meta: {
        showInNavBar: false,
        title: 'Copy Template'
      },
    },
    {
      path: '/template/felter/rediger/:templateNameId',
      name: 'templateFieldsEdit',
      component: () => import('@/views/formTemplateFieldsView.vue'),
      meta: {
        showInNavBar: false,
        title: 'Edit Template Fields'
      },
    },
      {
      path: '/template/felter/vis/:templateNameId',
      name: 'templateFieldsView',
      component: () => import('@/views/formTemplateFieldsView.vue'),
      meta: {
        showInNavBar: false,
        title: 'View Template Fields'
      },
    },
    {
      path: '/licensee/:licenseeId',
      name: 'licensee',
      component: () => import('@/components/common/licensee/licensee.vue'),
      meta: {
        showInNavBar: false,
        title: 'Licensee'
      }
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const formularStore = useDataStore();
  if(to.name == 'templateFieldsEdit') {
    if(formularStore.formTemplateNameList.some((item) => item.id == Number(to.params.templateNameId) && 
                                                              item.licenseeId == formularStore.LicenseeId)) {
      next();
    }
    else if(formularStore.isAdministrator &&
            formularStore.formTemplateNameList.some((item) => item.id == Number(to.params.templateNameId) && 
                                                                   item.licenseeId == undefined)) {
      next();
    }
    else {
      next({path: '/'});
    }
  }
  next();
});

export default router