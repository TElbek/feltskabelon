import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { formularSkabelonFeltType, formularSkabelonType } from '@/types/formularSkabelonType'

export const useFormularStore = defineStore('formularStore', () => {
    const formularSkabelon = ref({} as formularSkabelonType);
    const formularSkabelonFelter = ref([] as formularSkabelonFeltType[])

    function setFormularSkabelon(formularSkabelonData: formularSkabelonType): void {
        formularSkabelon.value = formularSkabelonData;
    }

    function setFormularSkabelonFelter(formularSkabelonFelterData: formularSkabelonFeltType[]) {
        formularSkabelonFelter.value = formularSkabelonFelterData;
    }

    function getFormularSkabelonFelterForSkabelonId(id: number): formularSkabelonFeltType[] {
        return formularSkabelonFelter.value.filter((item) => item.formularSkabelonId == id && item.erMinimumsFelt);
    }

    function getFormularSkabelonFelterForSkabelonIdLicensHaver(id: number, licensHaverId: number): formularSkabelonFeltType[] {
        return formularSkabelonFelter.value.filter((item) => item.formularSkabelonId == id && item.licenshaverId == licensHaverId);
    }

    return { formularSkabelon, getFormularSkabelonFelterForSkabelonId, getFormularSkabelonFelterForSkabelonIdLicensHaver, setFormularSkabelon, setFormularSkabelonFelter }
})

