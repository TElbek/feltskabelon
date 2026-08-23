<template>
  <div class="grid grid-rows-2 gap-4">
    <div class="grid lg:grid-cols-2 gap-4">
      <div>
        <div>
          <div class="font-semibold text-lg  border-b border-gray-300">Statens Naturhistoriske Museum</div>
          <div>
            {{ formularStore.getFormularSkabelonForId(2) }}
          </div>
        </div>
      </div>
      <div>
        <div class="font-semibold text-lg  border-b border-gray-300">Licenshaver</div>
      </div>
    </div>
    <div>
      <div class="font-semibold text-lg  border-b border-gray-300">Formular</div>
    </div>
  </div>
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
});
</script>