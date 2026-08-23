<template>
  <div>
    <formular-skabelon-liste></formular-skabelon-liste>
  </div>

  <div class="grid grid-rows-2 gap-4">
    <div class="grid lg:grid-cols-2 gap-4 mt-3">
      <div>
        <div class="rounded border border-gray-300 px-2 pb-2">
          <div class="font-semibold text-2xl text-snhm">Administrator</div>
          <div class="mt-2">
            <formular-skabelon-administrator></formular-skabelon-administrator>
          </div>
        </div>
      </div>
      <div class="rounded border border-gray-300 px-2 pb-2">
        <div class="font-semibold text-2xl text-snhm">Licenshaver</div>
      </div>
    </div>
    <div class="rounded border border-gray-300 px-2 pb-2">
      <div class="font-semibold text-2xl text-snhm">Formular</div>
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