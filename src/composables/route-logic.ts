import { computed, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDataStore } from '@/stores/dataStore';
import { storeToRefs } from 'pinia';

export function useRouteLogic() {
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
        isAdministrator: false as boolean
    });

    const dataStore = useDataStore();
    const { isAdministrator } = storeToRefs(dataStore)

    const homeRoute = router.options.routes.find(route => route.path === '/');

    const isAtHomeRoute = computed(() => {
        return route.name === 'home';
    });

    const isAtTemplateListRoute = computed(() => {
        return route.name === 'templateList';
    });

    const isAtTemplateAddRoute = computed(() => {
        return route.name === 'templateAdd';
    });

    const isAtTemplateNameCopyRoute = computed(() => {
        return route.name === 'templateNameCopy';
    });

    const isAtTemplateFieldsEditRoute = computed(() => {
        return route.name === 'templateFieldsEdit';
    });

    const visibleRoutes = computed(() => {
        return router.options.routes.filter((route) => route.meta?.showInNavBar == true &&
            (state.isAdministrator == route.meta.requireAdmin || !route.meta.requireAdmin))
    });

    watch(isAdministrator, () => {
        state.isAdministrator = dataStore.isAdministrator
    })

    return {
        homeRoute,
        isAtHomeRoute,
        isAtTemplateListRoute,
        isAtTemplateAddRoute,
        isAtTemplateNameCopyRoute,
        isAtTemplateFieldsEditRoute,
        visibleRoutes
    };
}