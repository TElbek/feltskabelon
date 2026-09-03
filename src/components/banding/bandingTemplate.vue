<template>
    <form>
        <tw-input-select v-model="state.selectedFormTemplateNameId" :name="'formTemplateNameSelection'">
            <option v-for="template in state.templateModelList" :key="template.formTemplateName.id"
                :value="template.formTemplateName.id">
                {{ template.formTemplateName.templateName }}
            </option>
        </tw-input-select>
    </form>
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
});

watch(() => state.selectedFormTemplateNameId, (newValue: number | undefined) => {
    if (newValue !== undefined) {
        emits('formTemplateNameId', newValue);
    }
});
</script>