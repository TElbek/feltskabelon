<template>
    <route-title></route-title>
    <div class="mt-3">
        <tw-flex>
            <tw-button :caption="'Yes'" @click="restoreData()"></tw-button>
            <tw-button :caption="'No'" @click="goBack()"></tw-button>
        </tw-flex>
    </div>
</template>

<script setup lang="ts">
import { useDataLoader } from '@/composables/data-loader.ts'
import { useRouter } from 'vue-router';

const dataLoader = useDataLoader();
const router = useRouter();

function restoreData(): void {
    dataLoader.loadJSONData();
    goBack();
}

function goBack(): void {
    router.back();
}
</script>