import { computed } from 'vue';
import { useRouter, useRoute, type RouteRecordRaw } from 'vue-router';

export function useRouteLogic() {
    const router = useRouter();
    const route = useRoute();

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
        return router.options.routes.filter((route) => route.meta?.showInNavBar == true)
    });

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