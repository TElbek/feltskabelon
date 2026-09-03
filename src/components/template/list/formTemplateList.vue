<template>
    <div>
        <div class="text-xl text-snhm mb-2">
            <span>Template Overview: {{ dataStore.licenseeName }}</span>
        </div>
        <div class="grid grid-cols-[max-content_max-content_max-content_max-content_max-content_1fr] gap-x-3">
            <template v-for="(template, index) in state.formTemplateModelList " :key="template.formTemplateName.id">
                <div class="border-b border-gray-300 col-span-6" v-if="index == 0"></div>

                <span class="font-semibold border-s border-e border-gray-300 ps-2 pe-2" v-if="index == 0">Id</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Active</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Name</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Scenario</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Template Fields</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Actions</span>

                <div v-if="index == 0" class="border-b border-gray-300 col-span-6"></div>

                <div class="border-s border-e border-gray-300">
                    <div class="text-end pe-2">{{ template.formTemplateName.id }}</div>
                </div>
                <div class="border-e border-gray-300">
                    <div class="text-center pe-2">{{ template.formTemplateName.isActive ? 'Yes' : 'No' }}</div>
                </div>              
                <div class="border-e border-gray-300 pe-2">
                    <router-link v-if="canEdit(template.formTemplateName.licenseeId)"
                        :to="`/template/name/edit/${template.formTemplateName.id}`">
                        <span>{{ template.formTemplateName.templateName }}</span>
                    </router-link>
                    <div v-else class="text-gray-500">
                        <span>{{ template.formTemplateName.templateName }}</span>
                    </div>
                </div>
                  <div class="border-e border-gray-300">
                    <div class="text-start pe-2">{{ getScenarioNameById(template.formTemplate.bandingScenarioId) }}</div>
                </div>
                <div class="border-e border-gray-300 pe-2">
                    <router-link v-if="canEdit(template.formTemplateName.licenseeId)"
                        :to="`/template/fields/edit/${template.formTemplateName.id}`">
                        <span>Edit</span>
                    </router-link>
                    <div v-else>
                        <router-link :to="`/template/fields/view/${template.formTemplateName.id}`">
                            <span>Show</span>
                        </router-link>
                    </div>
                </div>
                <div class="border-e border-gray-300 pe-2">
                    <router-link :to="`/template/name/copy/${template.formTemplateName.id}`"
                        v-if="!dataStore.isAdministrator && template.formTemplateName.licenseeId == undefined">
                        Copy
                    </router-link>
                </div>
                <div class="border-b col-span-6 border-gray-300"></div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { templateModelType } from '@/models/templateModelType';
import { useDataStore } from '@/stores/dataStore';
import { computed, onMounted, reactive } from 'vue';
const dataStore = useDataStore();

const state = reactive({
    hasData: false as boolean,
    formTemplateModelList: [] as templateModelType[]
});

onMounted(() => {
    state.formTemplateModelList = dataStore.getTemplateModelList();
});

function getScenarioNameById(id: number): string {
    return dataStore.bandingScenarioList.find((item) => item.id == id)?.name ?? 'ukendt';
}

function canEdit(licenseeId: number): boolean {
    return dataStore.isAdministrator || licenseeId == dataStore.LicenseeId;
}
</script>