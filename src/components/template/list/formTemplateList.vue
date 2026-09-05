<template>
    <div>
        <div class="flex flex-row justify-between mb-2">
            <span class="text-xl text-snhm">{{ dataStore.licenseeName }} Templates</span>
            <tw-button v-if="dataStore.isAdministrator" @click="addTemplate" :caption="'Add Template'">
            </tw-button>
        </div>
        <tw-grid-cols-generic :itemsPerRow="4" :count="state.formTemplateModelList.length">
            <div v-for="template in state.formTemplateModelList"
                class="bg-white rounded border border-snhm px-2 py-0.5">
                <form-template-card :template="template"></form-template-card>
            </div>
        </tw-grid-cols-generic>
    </div>
</template>

<script setup lang="ts">
import type { templateModelType } from '@/models/templateModelType';
import formTemplateCard from './formTemplateCard.vue';
import { useDataStore } from '@/stores/dataStore';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const dataStore = useDataStore();
const router = useRouter();

const state = reactive({
    hasData: false as boolean,
    formTemplateModelList: [] as templateModelType[]
});

onMounted(() => {
    state.formTemplateModelList = dataStore.getTemplateModelList();
});

function addTemplate(): void {
    router.push('/template/add');
}
</script>