import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { formularSkabelonFeltType, formularSkabelonType } from '@/types/formularSkabelonType'
import type { FeltType } from '@/types/feltType';

export const useFormularStore = defineStore('formularStore', () => {
    const formularSkabeloner = ref([] as formularSkabelonType[]);
    const formularSkabelonFelter = ref([] as formularSkabelonFeltType[])
    const feltNavne = ref([] as FeltType[]);

    const formularSkabelonId = ref(1 as number);
    const licensHaverId = ref(5000 as number);

    const formularSkabelon = computed(() => {
        return formularSkabeloner.value.some((item) => item.id == formularSkabelonId.value) ?
            formularSkabeloner.value.find((item) => item.id == formularSkabelonId.value) : undefined;
    });

    const formularSkabelonFelterForAdministrator = computed(() => {
        return formularSkabelonFelter.value
            .filter((item) => item.formularSkabelonId == formularSkabelonId.value && item.erMinimumsFelt)
            .sort((a,b) => a.feltNavn.localeCompare(b.feltNavn))
    })

    const formularSkabelonFelterForLicenshaver = computed(() => {
        return formularSkabelonFelter.value.filter((item) => item.formularSkabelonId == formularSkabelonId.value && item.licenshaverId == licensHaverId.value);
    })

    const felterIkkeISkabelon = computed(() => {
        let feltNavneISkabelon = [...new Set(formularSkabelonFelterForAdministrator.value.map(item => item.feltNavn))];
        let filtered = feltNavne.value.filter(i => !feltNavneISkabelon.includes(i.feltNavn))
        return filtered.sort((a,b) => a.feltNavn.localeCompare(b.feltNavn));
    });

    function setFeltnavne(felter: FeltType[]): void {
        feltNavne.value = felter;
    }

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
        feltNavne,
        felterIkkeISkabelon,
        formularSkabeloner,
        formularSkabelonFelter,
        setFeltnavne,
        setFormularSkabeloner,
        setFormularSkabelonFelter,
        setFormularSkabelonId,
        formularSkabelonId,
        formularSkabelon,
        formularSkabelonFelterForAdministrator,
        formularSkabelonFelterForLicenshaver,
    }
})