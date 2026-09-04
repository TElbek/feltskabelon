<template>
    <div class="flex justify-between">
        <div>
            <router-link v-if="canEdit(template.formTemplateName.licenseeId)"
                :to="`/template/name/edit/${template.formTemplateName.id}`">
                <span class="text-snhm font-semibold text-lg">{{ template.formTemplateName.templateName
                }}</span>
            </router-link>
            <div v-else class="text-gray-500">
                <span class="text-snhm font-semibold text-lg">{{ template.formTemplateName.templateName
                }}</span>
            </div>
        </div>
        <tw-flex>
            <div class="text-snhm">
                <router-link v-if="canEdit(template.formTemplateName.licenseeId)"
                    :to="`/template/fields/edit/${template.formTemplateName.id}`">
                    <span>Fields</span>
                </router-link>
                <div v-else>
                    <router-link :to="`/template/fields/view/${template.formTemplateName.id}`">
                        <span>Fields</span>
                    </router-link>
                </div>
            </div>
            <router-link :to="`/template/name/copy/${template.formTemplateName.id}`"
                v-if="!dataStore.isAdministrator && template.formTemplateName.licenseeId == undefined">
                <span class="text-snhm">Copy</span>
            </router-link>
        </tw-flex>
    </div>
    <div class="border-b border-snhm"></div>
    <div class="grid grid-cols-[max-content_1fr] gap-x-5">
        <span class="font-semibold">Active</span>
        <div class="pe-2">{{ template.formTemplateName.isActive ? 'Yes' : 'No' }}</div>
        <span class="font-semibold">Scenario</span>
        <span>{{ getScenarioNameById(template.formTemplate.bandingScenarioId) }}</span>
    </div>
</template>

<script setup lang="ts">
import type { templateModelType } from '@/models/templateModelType';
import { useDataStore } from '@/stores/dataStore';

interface formTemplateCardProps {
    template: templateModelType
}

const props = defineProps<formTemplateCardProps>();

const dataStore = useDataStore();

function getScenarioNameById(id: number): string {
    return dataStore.bandingScenarioList.find((item) => item.id == id)?.name ?? 'ukendt';
}

function canEdit(licenseeId: number | undefined): boolean {
    return dataStore.isAdministrator || licenseeId == dataStore.LicenseeId;
}
</script>