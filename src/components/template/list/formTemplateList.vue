<template>
    <div>
        <div class="text-xl text-snhm mb-2">
            <span>Skabelonoversigt: {{ dataStore.licenseeName }}</span>
        </div>
        <div class="grid grid-cols-[max-content_max-content_max-content_max-content_1fr] gap-x-3">
            <template v-for="(template, index) in dataStore.getTemplateModelList()">
                <div class="border-b border-gray-300 col-span-5" v-if="index == 0"></div>

                <span class="font-semibold border-s border-e border-gray-300 ps-2 pe-2" v-if="index == 0">Id</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Scenarie</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Navn</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Skabelonfelter</span>
                <div v-if="index == 0" class="font-semibold border-e pe-2 border-gray-300">
                    <span v-if="!dataStore.isAdministrator">Handlinger</span>
                </div>

                <div v-if="index == 0" class="border-b border-gray-300 col-span-5"></div>

                <div class="text-end pe-2 border-s border-e border-gray-300">{{ template.formTemplateNameType.id }}
                </div>
                <div class="border-e border-gray-300">{{
                    getScenarioNameById(template.formTemplateType.bandingScenarioId) }}</div>
                <div class="border-e border-gray-300 pe-2">
                    <router-link v-if="canEdit(template.formTemplateNameType.licenseeId)"
                        :to="`/skabelonnavn/rediger/${template.formTemplateNameType.id}`">
                        <span>{{ template.formTemplateNameType.templateName }}</span>
                    </router-link>
                    <div v-else class="text-gray-500">
                        {{ template.formTemplateNameType.templateName }}
                    </div>
                </div>
                <div class="border-e border-gray-300 pe-2">
                    <router-link v-if="canEdit(template.formTemplateNameType.licenseeId)"
                        :to="`/formularskabelonfelter/rediger/${template.formTemplateNameType.id}`">
                        <span>Rediger</span>
                    </router-link>
                    <div v-else>
                        <router-link :to="`/formularskabelonfelter/vis/${template.formTemplateNameType.id}`">
                            <span>Vis</span>
                        </router-link>
                    </div>
                </div>
                <div class="border-e border-gray-300 pe-2">
                    <router-link :to="`/skabelonnavn/kopier/${template.formTemplateNameType.id}`"
                        v-if="!dataStore.isAdministrator && template.formTemplateNameType.licenseeId == undefined">
                        Kopier
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