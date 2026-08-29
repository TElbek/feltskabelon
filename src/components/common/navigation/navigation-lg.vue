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
            <ul class="flex gap-x-4 text-base cursor-pointer">
                <template v-if="isAtSkabelonListeRoute">
                    <li v-for="licenshaver in formularStore.licenshaverListe">
                        <router-link :to="`/licenshaver/${licenshaver.id}`">
                            <span :class="[formularStore.licenshaverId == licenshaver.id ? 'font-bold' : '']"
                                class="relative top-1.5">{{ licenshaver.navn }}</span>
                        </router-link>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useRouteLogic } from '@/composables/route-logic.ts'
import { useFormularStore } from '@/stores/formularStore';
import { computed } from 'vue';

const formularStore = useFormularStore();
const { visibleRoutes, homeRoute, isAtSkabelonListeRoute } = useRouteLogic();
</script>