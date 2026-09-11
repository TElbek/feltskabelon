<template>
    <div class="flex flex-col gap-y-1">
        <template v-for="item in state.itemList" :key="item">
            <div class="grid grid-cols-[1fr_max-content] gap-x-3">
                <ringingForm :form-template-name-id="$props.formTemplateNameId" :index="item"></ringingForm>
                <div class="mt-0.5">
                    <ringingButtons @add-new-blank="addNewBlank"></ringingButtons>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import ringingForm from '@/components/ringing/ringingForm.vue';
import ringingButtons from '@/components/ringing/ringingButtons.vue';

interface ringingRowProps {
    formTemplateNameId: number,
}

const props = defineProps<ringingRowProps>();

const state = reactive({
    index: 0 as number,
    itemList: [] as number[]
});

onMounted(() => {
    addRow();
});

function addNewBlank() {
    addRow();
}

function addRow() {
    state.index++;
    state.itemList.push(state.index);
}

watch(() => props.formTemplateNameId, () => {
    state.index = 0;
    state.itemList = [];
    addRow();
})
</script>