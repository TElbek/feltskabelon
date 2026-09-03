<template>
    <div class="text-2xl text-snhm mt-3">Restore Data?</div>
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
import { useDataStore } from '@/stores/dataStore';

const dataLoader = useDataLoader();
const router = useRouter();
const { setLicenseeId } = useDataStore();

function restoreData(): void {
    dataLoader.loadJSONData();
    setLicenseeId(1);
    goBack();
}

function goBack(): void {
    router.back();
}
</script>