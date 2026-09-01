<template>
    <div>
        <div class="flex flex-col gap-y-2">
            <formular-skabelon-header
                :formularSkabelonNavnId="Number(route.params.skabelonNavnId)"></formular-skabelon-header>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div class="border border-gray-400 rounded p-3">
                    <div class="text-xl text-snhm mb-2">Valgte felter</div>
                    <formular-skabelon-felter-valgt></formular-skabelon-felter-valgt>
                </div>
                <div class="border border-gray-400 rounded p-3">
                    <formular-skabelon-felter-vaelg></formular-skabelon-felter-vaelg>
                </div>
                <div class="border border-gray-400 rounded p-3 lg:col-span-2">
                    <div class="text-xl text-snhm mb-2">Mærkningsformular</div>
                    <maerknings-formular></maerknings-formular>
                </div>
            </div>
        </div>
        <tw-button :caption="'OK'" @click="goBack()" class="mt-2 w-20"></tw-button>
    </div>
</template>

<script setup lang="ts">
import maerkningsFormular from '@/components/maerkning/maerkningsFormular.vue';
import formularSkabelonHeader from '@/components/skabelon/formularSkabelonHeader.vue';
import formularSkabelonFelterValgt from '@/components/skabelonfelter/formularSkabelonFelterValgt.vue'
import formularSkabelonFelterVaelg from '@/components/skabelonfelter/formularSkabelonFelterVaelg.vue'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

function goBack(): void {
    router.back();
}
</script>