<template>
    <div class="text-xl text-snhm mb-2">{{ route.meta.title }}</div>
    <div class="grid grid-cols-5">
        <div v-for="property in properties">
            <div class="font-semibold border-b border-gray-300 text-snhm border-t border-r px-2">{{ property }}</div>
        </div>
        <div v-for="property in properties">
            <div class="font-semibold border-b border-gray-300 text-snhm border-t border-r px-2">
                <span :class="[state.object[property] ==  undefined ? 'text-gray-400' : '']">{{ state.object[property] !=  undefined ? state.object[property] : 'null' }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { useRoute } from 'vue-router';
import { type formTemplateNameType } from '@/types/formTemplateNameType';
import { computed, onMounted, reactive } from 'vue';

const dataStore = useDataStore();
const route = useRoute();

const state = reactive({
    object: {} as formTemplateNameType
});

const properties = computed(() => Object.keys(state.object) as (keyof formTemplateNameType)[]);

onMounted(() => {
    state.object = dataStore.formTemplateNameList[0];
});
</script>