<template>
    <div class="text-xl text-snhm mb-2">{{ route.meta.title }}</div>
    <div class="grid grid-cols-5">
        <div v-for="property in properties">
            <div class="font-semibold border-gray-300 text-snhm border-b border px-2 capitalize">{{ property }}</div>
        </div>
        <template v-for="item in dataStore.formTemplateNameList">
            <div v-for="property in properties">
                <div class=" border-gray-300 text-snhm border-b border-l px-2">
                    <span :class="[item[property] == undefined ? 'text-gray-400' : '']">{{ item[property] != undefined
                        ? item[property] : 'null' }}</span>
                </div>
            </div>
        </template>
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