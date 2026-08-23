import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { formularSkabelonFeltType, formularSkabelonType } from '@/types/formularSkabelonType'

export const useFormularStore = defineStore('formularStore', () => {
    const formularSkabeloner = ref([] as formularSkabelonType[]);
    const formularSkabelonFelter = ref([] as formularSkabelonFeltType[])

    function setFormularSkabeloner(formularSkabelonData: formularSkabelonType[]): void {
        formularSkabeloner.value = formularSkabelonData;
    }

    function setFormularSkabelonFelter(formularSkabelonFelterData: formularSkabelonFeltType[]) {
        formularSkabelonFelter.value = formularSkabelonFelterData;
    }

    function getFormularSkabelonForId(id: number): formularSkabelonType | undefined {
        return formularSkabeloner.value.some((item) => item.id == id) ?
            formularSkabeloner.value.find((item) => item.id == id) : undefined;
    }

    function getFormularSkabelonFelterForSkabelonId(id: number): formularSkabelonFeltType[] {
        return formularSkabelonFelter.value.filter((item) => item.formularSkabelonId == id && item.erMinimumsFelt);
    }

    function getFormularSkabelonFelterForSkabelonIdLicensHaver(id: number, licensHaverId: number): formularSkabelonFeltType[] {
        return formularSkabelonFelter.value.filter((item) => item.formularSkabelonId == id && item.licenshaverId == licensHaverId);
    }

    return {
        setFormularSkabeloner,
        setFormularSkabelonFelter,
        getFormularSkabelonForId,
        getFormularSkabelonFelterForSkabelonId,
        getFormularSkabelonFelterForSkabelonIdLicensHaver,
    }
})