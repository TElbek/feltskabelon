<template>
    <div>
        <tw-grid-cols-generic :itemsPerRow="5" :count="formularStore.formularSkabelonListeByScenarie.size">
            <template v-for="[key, value] in formularStore.formularSkabelonListeByScenarie">
                <tw-card>
                    <tw-card-header :caption="'Scenarie: ' + getScenarieNavnById(key)" :showCount="false"></tw-card-header>
                    <template v-for="skabelon in value">
                        <formularSkabelonListeNavn :formularSkabelonId="skabelon.id"></formularSkabelonListeNavn>
                    </template>
                </tw-card>
            </template>
        </tw-grid-cols-generic>
    </div>
</template>

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
const formularStore = useFormularStore();
import formularSkabelonListeNavn from './formularSkabelonListeNavn.vue';

function getScenarieNavnById(id: number): string {
    return formularStore.maerkningsScenarieListe.find((item) => item.id == id)?.navn ?? 'ukendt';
}
</script>