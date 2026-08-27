<template>
    <div class="max-lg:hidden text-snhm">
        <ul class="flex gap-x-8 text-base cursor-pointer">
            <li>
                <router-link v-if="homeRoute != undefined" :to="homeRoute.path">
                    <span>{{ homeRoute?.meta?.title }}</span>
                </router-link>
            </li>
            <li v-for="route in visibleRoutes" :key="route.path">
                <router-link :to="route.path">
                    <span>{{ route.meta?.title }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

import { useRouteLogic } from '@/composables/route-logic.ts'

const { visibleRoutes, homeRoute } = useRouteLogic();
</script>