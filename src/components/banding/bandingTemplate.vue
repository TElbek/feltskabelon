<template>
    <tw-show-lg>
        <tw-flex>
            <a v-for="template in state.templateModelList" :key="template.formTemplateName.id" class=" rounded text-sm"
                :class="{
                    'bg-snhm text-white': state.selectedFormTemplateNameId === template.formTemplateName.id,
                    'bg-white text-snhm border border-snhm': state.selectedFormTemplateNameId !== template.formTemplateName.id
                }" @click="state.selectedFormTemplateNameId = template.formTemplateName.id">
                <div class="px-2 cursor-pointer">
                    {{ template.formTemplateName.templateName }}
                </div>
            </a>
        </tw-flex>
    </tw-show-lg>
    <tw-show-md>
        <div class="text-sm text-snhm w-50">
            <tw-input-select v-model="state.selectedFormTemplateNameId" :name="'formTemplateNameSelection'">
            <option v-for="template in state.templateModelList" :key="template.formTemplateName.id"
                :value="template.formTemplateName.id">
                <div>{{ template.formTemplateName.templateName }}</div>
            </option>
        </tw-input-select>
        </div>
    </tw-show-md>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { onMounted, reactive, watch } from 'vue';
import type { templateModelType } from '@/models/templateModelType';

const dataStore = useDataStore();
const emits = defineEmits<{
    (e: 'formTemplateNameId', formTemplateNameId: number): void;
}>();

const state = reactive({
    templateModelList: [] as templateModelType[],
    selectedFormTemplateNameId: undefined as number | undefined
});

onMounted(() => {
    state.templateModelList = dataStore.getTemplateModelListForBanding();
    if (state.templateModelList.length > 0) {
        state.selectedFormTemplateNameId = state.templateModelList[0].formTemplateName.id;
    }
});

watch(() => state.selectedFormTemplateNameId, (newValue: number | undefined) => {
    if (newValue !== undefined) {
        emits('formTemplateNameId', newValue);
    }
});
</script>