<template>
    <div>
        <div class="text-xl text-snhm mb-2">
            <span>Skabelonoversigt: {{ formularStore.licenshaverNavn }}</span>
        </div>
        <div class="grid grid-cols-[max-content_max-content_max-content_max-content_1fr] gap-x-3">
            <template v-for="(skabelon, index) in formularStore.getSkabelonListe()">
                <div class="border-b border-gray-300 col-span-5" v-if="index == 0"></div>

                <span class="font-semibold border-s border-e border-gray-300 ps-2 pe-2" v-if="index == 0">Id</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Scenarie</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Navn</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Skabelonfelter</span>
                <div v-if="index == 0" class="font-semibold border-e pe-2 border-gray-300">
                    <span v-if="!formularStore.erAdministrator">Handlinger</span>
                </div>

                <div v-if="index == 0" class="border-b border-gray-300 col-span-5"></div>

                <div class="text-end pe-2 border-s border-e border-gray-300">{{ skabelon.formTemplateNameType.id }}
                </div>
                <div class="border-e border-gray-300">{{
                    getScenarieNavnById(skabelon.formTemplateType.bandingScenarioId) }}</div>
                <div class="border-e border-gray-300 pe-2">
                    <router-link v-if="canEdit(skabelon.formTemplateNameType.licenseeId)"
                        :to="`/skabelonnavn/rediger/${skabelon.formTemplateNameType.id}`">
                        <span>{{ skabelon.formTemplateNameType.templateName }}</span>
                    </router-link>
                    <div v-else class="text-gray-500">
                        {{ skabelon.formTemplateNameType.templateName }}
                    </div>
                </div>
                <div class="border-e border-gray-300 pe-2">
                    <router-link v-if="canEdit(skabelon.formTemplateNameType.licenseeId)"
                        :to="`/formularskabelonfelter/rediger/${skabelon.formTemplateNameType.id}`">
                        <span>Rediger</span>
                    </router-link>
                    <div v-else>
                        <router-link :to="`/formularskabelonfelter/vis/${skabelon.formTemplateNameType.id}`">
                            <span>Vis</span>
                        </router-link>
                    </div>
                </div>
                <div class="border-e border-gray-300 pe-2">
                    <router-link :to="`/skabelonnavn/kopier/${skabelon.formTemplateNameType.id}`"
                        v-if="!formularStore.erAdministrator && skabelon.formTemplateNameType.licenseeId == undefined">
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
const formularStore = useDataStore();

function getScenarieNavnById(id: number): string {
    return formularStore.maerkningsScenarieListe.find((item) => item.id == id)?.name ?? 'ukendt';
}

function canEdit(licenshaverId: number): boolean {
    return formularStore.erAdministrator || licenshaverId == formularStore.licenshaverId;
}
</script>