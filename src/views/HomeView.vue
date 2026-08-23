<template>
  <div class="font-semibold text-lg border-b border-gray-300">Statens Naturhistoriske Museum</div>
  <formular-skabelon-liste></formular-skabelon-liste>

  <div class="grid grid-rows-2 gap-4">
    <div class="grid lg:grid-cols-2 gap-4 mt-3">
      <div>
        <div>
          <div class="font-semibold text-2xl">Administrator</div>
          <div class="mt-2">
            <formular-skabelon-administrator></formular-skabelon-administrator>
          </div>
        </div>
      </div>
      <div>
        <div class="font-semibold text-2xl">Licenshaver</div>
      </div>
    </div>
    <div>
      <div class="font-semibold text-2xl">Formular</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/apijson/';
import { onMounted } from 'vue';
import { useFormularStore } from '@/stores/formularStore';

import formularSkabelonListe from '@/components/common/formularSkabelonListe.vue'
import formularSkabelonAdministrator from '@/components/administrator/formularSkabelonEditor.vue';

const formularStore = useFormularStore();

onMounted(() => {
  api.get('formularSkabelon.json').then(res => {
    formularStore.setFormularSkabeloner(res.data);
  })

  api.get('formularSkabelonFelt.json').then(res => {
    formularStore.setFormularSkabelonFelter(res.data);
  })
});
</script>