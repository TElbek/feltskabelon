<template>
    <div>
        <route-title>
            <template v-slot:title>
                <span class="text-xl text-snhm">{{ dataStore.licenseeName }}</span>
            </template>
            <template v-slot:atright>
                <tw-button v-if="dataStore.isAdministrator" @click="addTemplate" :caption="'Add Template'">
                </tw-button>
            </template>
        </route-title>

        <tw-grid-cols-generic :itemsPerRow="4" :count="state.formTemplateModelList.length" v-if="hasAnyTemplates">
            <div v-for="template in state.formTemplateModelList" :key="template.formTemplate.id"
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
import { computed, onMounted, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const dataStore = useDataStore();
const { LicenseeId } = storeToRefs(dataStore);
const router = useRouter();

const state = reactive({
    formTemplateModelList: [] as templateModelType[]
});

const hasAnyTemplates = computed(() => dataStore.formTemplateList.length > 0)

onMounted(() => {
    getTemplateModelList();
});

function getTemplateModelList() {
    state.formTemplateModelList = dataStore.getTemplateModelList();
}

function addTemplate(): void {
    router.push('/template/add');
}

watch(() => LicenseeId.value, () => {
    getTemplateModelList();
})
</script>