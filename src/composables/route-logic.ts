import { computed } from 'vue';
import { useRouter, useRoute, type RouteRecordRaw } from 'vue-router';

export function useRouteLogic() {
    const router = useRouter();
    const route = useRoute();

    const homeRoute = router.options.routes.find(route => route.path === '/');

    const visibleRoutes = computed(() => {
        return router.options.routes.filter((route) => route.meta?.showInNavBar == true)
    });

    return {
        homeRoute,
        visibleRoutes
    };
}