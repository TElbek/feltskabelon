<template>
    <div>
        <div class="text-xl text-snhm mb-2">
            <span>Template Overview: {{ dataStore.licenseeName }}</span>
        </div>
        <div class="grid grid-cols-[max-content_max-content_max-content_max-content_1fr] gap-x-3">
            <template v-for="(template, index) in dataStore.getTemplateModelList()">
                <div class="border-b border-gray-300 col-span-5" v-if="index == 0"></div>

                <span class="font-semibold border-s border-e border-gray-300 ps-2 pe-2" v-if="index == 0">Id</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Scenario</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Name</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Template Fields</span>
                <div v-if="index == 0" class="font-semibold border-e pe-2 border-gray-300">
                    <span v-if="!dataStore.isAdministrator">Actions</span>
                </div>

                <div v-if="index == 0" class="border-b border-gray-300 col-span-5"></div>

                <div class="border-s border-e border-gray-300">
                    <div class="text-end pe-2">{{ template.formTemplateNameType.id }}</div>
                </div>
                <div class="border-e border-gray-300">
                    <div class="text-start pe-2">{{ getScenarioNameById(template.formTemplateType.bandingScenarioId) }}</div>
                </div>
                <div class="border-e border-gray-300 pe-2">
                    <router-link v-if="canEdit(template.formTemplateNameType.licenseeId)"
                        :to="`/template/name/edit/${template.formTemplateNameType.id}`">
                        <span>{{ template.formTemplateNameType.templateName }}</span>
                    </router-link>
                    <div v-else class="text-gray-500">
                        <span>{{ template.formTemplateNameType.templateName }}</span>
                    </div>
                </div>
                <div class="border-e border-gray-300 pe-2">
                    <router-link v-if="canEdit(template.formTemplateNameType.licenseeId)"
                        :to="`/template/fields/edit/${template.formTemplateNameType.id}`">
                        <span>Edit</span>
                    </router-link>
                    <div v-else>
                        <router-link :to="`/template/fields/view/${template.formTemplateNameType.id}`">
                            <span>Show</span>
                        </router-link>
                    </div>
                </div>
                <div class="border-e border-gray-300 pe-2">
                    <router-link :to="`/template/name/copy/${template.formTemplateNameType.id}`"
                        v-if="!dataStore.isAdministrator && template.formTemplateNameType.licenseeId == undefined">
                        Copy
                    </router-link>
                </div>
                <div class="border-b col-span-5 border-gray-300"></div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();

function getScenarioNameById(id: number): string {
    return dataStore.bandingScenarioList.find((item) => item.id == id)?.name ?? 'ukendt';
}

function canEdit(licenseeId: number): boolean {
    return dataStore.isAdministrator || licenseeId == dataStore.LicenseeId;
}
</script>