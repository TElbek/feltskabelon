import { computed } from 'vue';
import { useRouter, useRoute, type RouteRecordRaw } from 'vue-router';

export function useRouteLogic() {
    const router = useRouter();
    const route = useRoute();

    const homeRoute = router.options.routes.find(route => route.path === '/');

    const isAtHomeRoute = computed(() => {
        return route.name === 'home';
    });

    const isAtSkabelonListeRoute = computed(() => {
        return route.name === 'skabelonliste';
    });

    const visibleRoutes = computed(() => {
        return router.options.routes.filter((route) => route.meta?.showInNavBar == true)
    });

    return {
        homeRoute,
        isAtHomeRoute,
        isAtSkabelonListeRoute,
        visibleRoutes
    };
}