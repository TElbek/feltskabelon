<template>
  <div class="grid grid-rows-2 gap-4">
    <div class="grid lg:grid-cols-2 gap-4">
      <div>
        <div>
          <div class="font-semibold text-lg border-b border-gray-300">Statens Naturhistoriske Museum</div>
          <div class="mt-2">
            <formular-skabelon-liste></formular-skabelon-liste>
            <div class="mt-4 font-semibold text-2xl">Administrator</div>
            <div class="mt-2">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4">
                <div>
                  <div class="text-gray-700">Minimumsfelter</div>
                  <div class="border-b border-gray-300"></div>
                  <formular-skabelon-administrator></formular-skabelon-administrator>
                </div>
                <div>
                  <div  class="text-gray-700">Alle felter</div>
                  <div class="border-b border-gray-300"></div>
                </div>
              </div>
            </div>
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