<template>
    <div>
        <template v-for="[key, value] in formularStore.formularSkabelonListeByScenarie">
            <span class="text-lg text-snhm">{{ getScenarieNavnById(key) }}</span>
            <div class="border-b border-snhm"></div>
            <template v-for="skabelon in value">
                <span>{{ skabelon.id }}</span>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
import type { formularSkabelonType } from '@/types/formularSkabelonType';
import { computed } from 'vue';
const formularStore = useFormularStore();

function getScenarieNavnById(id: number): string {
    return formularStore.maerkningsScenarieListe.find((item) => item.id == id)?.navn ?? 'ukendt';
}
</script>