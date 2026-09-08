<template>
    <div class="flex flex-col gap-y-3">
        <template v-for="item in state.itemList">
            <div class="grid grid-cols-[1fr_max-content] gap-x-3">
                <bandingForm :form-template-name-id="$props.formTemplateNameId" :index="item"></bandingForm>
                <div class="mt-0.5">
                    <banding-buttons @add-new-blank="addNewBlank"></banding-buttons>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import bandingForm from '@/components/banding/bandingForm.vue';
import bandingButtons from '@/components/banding/bandingButtons.vue';

interface bandingRowProps {
    formTemplateNameId: number,
}

const props = defineProps<bandingRowProps>();

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