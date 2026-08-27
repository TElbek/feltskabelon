<template>
    <div v-for="navn in formularSkabelonNavne">
        <a class="cursor-pointer" @click="navigateSkabelonRediger(navn.formularSkabelonId)">{{ navn.skabelonNavn }}</a>
    </div>
</template>

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

interface propsInterface {
    formularSkabelonId: number
}

const router = useRouter();
const formularStore = useFormularStore();
const props = defineProps<propsInterface>();

const formularSkabelonNavne = computed(() => 
            formularStore.formularSkabelonNavnListe
            .filter((item) => item.formularSkabelonId == props.formularSkabelonId && item.licenshaverId == undefined));

function navigateSkabelonRediger(skabelonId: number) {
    router.push({path: '/formularskabelon/snm/rediger/' + skabelonId})
}
</script>