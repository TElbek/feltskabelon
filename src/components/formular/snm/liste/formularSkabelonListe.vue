<template>
    <div>
        <div class="grid grid-cols-[max-content_max-content_1fr] gap-x-3">
            <template v-for="(skabelon, index) in formularStore.formularSkabelonListe">
                <div v-if="index == 0" class="border-b border-gray-300 col-span-3"></div>
                <span class="font-semibold border-s border-e border-gray-300 ps-2 pe-2" v-if="index == 0">Id</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Scenarie</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Navn</span>
                <div v-if="index == 0" class="border-b border-gray-300 col-span-3"></div>

                <div class="text-end pe-2 border-s border-e border-gray-300">{{ skabelon.id }}</div>
                <div class="border-e border-gray-300">{{ getScenarieNavnById(skabelon.maerkningsScenarieId) }}</div>

                <div class="border-e border-gray-300">
                    <formularSkabelonListeNavn :formularSkabelonId="skabelon.id"></formularSkabelonListeNavn>
                </div>
                <div class="border-b col-span-3 border-gray-300"></div>
            </template>
        </div>
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