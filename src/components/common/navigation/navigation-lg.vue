<template>
    <div class="max-lg:hidden text-snhm">
        <div class="flex flex-row justify-between">
            <ul class="flex gap-x-4 text-base cursor-pointer">
                <li>
                    <router-link v-if="homeRoute != undefined" :to="homeRoute.path">
                        <span class="text-2xl">{{ homeRoute?.meta?.title }}</span>
                    </router-link>
                </li>
                <li v-for="route in visibleRoutes" :key="route.path">
                    <router-link :to="route.path">
                        <span class="relative top-1.5">{{ route.meta?.title }}</span>
                    </router-link>
                </li>
            </ul>
            <ul class="flex gap-x-4 text-base" v-if="canSwitchLicensee">
                <li v-for="licensee in dataStore.licenseeList" :key="licensee.id">
                    <router-link :to="`/licensee/${licensee.id}`">
                        <span :class="[dataStore.LicenseeId == licensee.id ? 'font-bold' : '']"
                            class="relative top-1.5">{{ licensee.name }}</span>
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
const { visibleRoutes, homeRoute, canSwitchLicensee } = useRouteLogic();
</script>