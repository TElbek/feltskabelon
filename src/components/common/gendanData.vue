<template>
    <div class="text-2xl text-snhm mt-3">Ønsker Du at gendanne Data?</div>
    <div class="mt-3">
        <tw-flex>
            <tw-button :caption="'Ja'" @click="gendanData()"></tw-button>
            <tw-button :caption="'Nej'" @click="goBack()"></tw-button>
        </tw-flex>
    </div>
</template>

<script setup lang="ts">
import { useDataLoader } from '@/composables/data-loader.ts'
import { useRouter } from 'vue-router';
import { useFormularStore } from '@/stores/formularStore';

const dataLoader = useDataLoader();
const router = useRouter();
const { setLicenshaverId } = useFormularStore();

function gendanData(): void {
    dataLoader.loadJSONData();
    setLicenshaverId(1);
    goBack();
}

function goBack(): void {
    router.back();
}
</script>