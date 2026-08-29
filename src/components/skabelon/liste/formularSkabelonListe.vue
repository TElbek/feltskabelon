<template>
    <div>
        <div class="grid grid-cols-[max-content_max-content_max-content_1fr] gap-x-3">
            <template v-for="(skabelon, index) in formularStore.getSkabelonListe()">
                <div class="border-b border-gray-300 col-span-4" v-if="index == 0"></div>

                <span class="font-semibold border-s border-e border-gray-300 ps-2 pe-2" v-if="index == 0">Id</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Scenarie</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Navn</span>
                <span class="font-semibold border-e pe-2 border-gray-300" v-if="index == 0">Felter</span>

                <div v-if="index == 0" class="border-b border-gray-300 col-span-4"></div>

                <div class="text-end pe-2 border-s border-e border-gray-300">{{ skabelon.formularSkabelonNavn.id }}</div>
                <div class="border-e border-gray-300">{{ getScenarieNavnById(skabelon.formularSkabelon.maerkningsScenarieId) }}</div>
                <div class="border-e border-gray-300 pe-2">
                    {{ skabelon.formularSkabelonNavn.skabelonNavn }}
                </div>
                <div class="border-e border-gray-300 pe-2">
                    <a class="cursor-pointer" v-on:click="navigateToRedigerFelter(skabelon.formularSkabelonNavn.id)">Felter</a>
                </div>
                <div class="border-b col-span-4 border-gray-300"></div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
import { useRouter } from 'vue-router';

const formularStore = useFormularStore();
const router = useRouter();

function getScenarieNavnById(id: number): string {
    return formularStore.maerkningsScenarieListe.find((item) => item.id == id)?.navn ?? 'ukendt';
}

function navigateToRedigerFelter(skabelonId: number): void {
    let skabelonNavnId = formularStore.getFormularNavnIdBySkabelonId(skabelonId);
    router.push({path: '/formularskabelonfelter/rediger/' + skabelonNavnId});
}
</script>