import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { formularSkabelonFeltType, formularSkabelonType } from '@/types/formularSkabelonType'

export const useFormularStore = defineStore('formularStore', () => {
    const formularSkabeloner = ref([] as formularSkabelonType[]);
    const formularSkabelonFelter = ref([] as formularSkabelonFeltType[])

    const formularSkabelonId = ref(0 as number);
    const licensHaverId = ref(5000 as number);

    const formularSkabelon = computed(() => {
        return formularSkabeloner.value.some((item) => item.id == formularSkabelonId.value) ?
            formularSkabeloner.value.find((item) => item.id == formularSkabelonId.value) : undefined;
    });

    const formularSkabelonFelterForAdministrator = computed(() => {
        return formularSkabelonFelter.value.filter((item) => item.formularSkabelonId == formularSkabelonId.value && item.erMinimumsFelt);
    })

    const formularSkabelonFelterForLicenshaver = computed(() => {
        return formularSkabelonFelter.value.filter((item) => item.formularSkabelonId == formularSkabelonId.value && item.licenshaverId == licensHaverId.value);
    })

    function setFormularSkabeloner(formularSkabelonData: formularSkabelonType[]): void {
        formularSkabeloner.value = formularSkabelonData;
    }

    function setFormularSkabelonFelter(formularSkabelonFelterData: formularSkabelonFeltType[]) {
        formularSkabelonFelter.value = formularSkabelonFelterData;
    }

    function setFormularSkabelonId(id: number) : void {
        formularSkabelonId.value = id;
    }

    return {
        formularSkabeloner,
        formularSkabelonFelter,
        setFormularSkabeloner,
        setFormularSkabelonFelter,
        setFormularSkabelonId,
        formularSkabelonId,
        formularSkabelon,
        formularSkabelonFelterForAdministrator,
        formularSkabelonFelterForLicenshaver,
    }
})