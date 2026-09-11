import { computed, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDataStore } from '@/stores/dataStore';

export function useRouteLogic() {
    const router = useRouter();
    const route = useRoute();

    const dataStore = useDataStore();

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

    const isAtRingingRoute = computed(() => {
        return route.name === 'ringing';
    });

    const canSwitchLicensee = computed(() => {
        return isAtTemplateListRoute.value || isAtRingingRoute.value
    });

    const visibleRoutes = computed(() => {
        return router.options.routes.filter((route) => route.meta?.showInNavBar == true &&
            (dataStore.isAdministrator == route.meta.requireAdmin || !route.meta.requireAdmin))
    });

    return {
        homeRoute,
        isAtHomeRoute,
        isAtTemplateListRoute,
        isAtTemplateAddRoute,
        isAtTemplateNameCopyRoute,
        isAtTemplateFieldsEditRoute,
        canSwitchLicensee,
        visibleRoutes
    };
}