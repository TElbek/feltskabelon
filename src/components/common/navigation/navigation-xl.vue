<template>
    <div class="text-snhm">
        <div class="flex flex-row justify-between">
            <div>
                <ul class="flex gap-x-3 lg:gap-x-6 text-base cursor-pointer">
                    <li>
                        <router-link v-if="homeRoute != undefined" :to="homeRoute.path">
                            <span class="text-xl">{{ homeRoute?.meta?.title }}</span>
                        </router-link>
                    </li>
                    <li v-for="route in visibleRoutes" :key="route.path" class="relative top-1">
                        <router-link :to="route.path">
                            <span>{{ route.meta?.title }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <ul class="flex gap-x-3 lg:gap-x-6 text-base cursor-pointer">
                <li v-for="licensee in dataStore.licenseeList" :key="licensee.id" class="relative top-1">
                    <router-link :to="`/licensee/${licensee.id}`">
                        <span :class="[dataStore.LicenseeId == licensee.id ? 'router-link-exact-active' : '']">{{ licensee.name }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useRouteLogic } from '@/composables/route-logic.ts'
import { useDataStore } from '@/stores/dataStore';

const dataStore = useDataStore();
const { visibleRoutes, homeRoute } = useRouteLogic();
</script>