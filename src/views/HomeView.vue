<template>
</template>

<script setup lang="ts">
import api from '@/apijson/';
import { onMounted } from 'vue';
import { useFormularStore } from '@/stores/formularStore';

const formularStore = useFormularStore();

onMounted(() => {
  api.get('formularSkabelon.json').then(res => {
    formularStore.setFormularSkabeloner(res.data);
  })

  api.get('formularSkabelonFelt.json').then(res => {
    formularStore.setFormularSkabelonFelter(res.data);
  })

  api.get('feltNavne.json').then(res => {
    formularStore.setFeltnavne(res.data);
  })
});
</script>