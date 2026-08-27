import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { formularSkabelonType } from '@/types/formularSkabelonType'
import type { formularSkabelonNavnType } from '@/types/formularSkabelonNavnType';
import type { formularSkabelonFeltType } from '@/types/formularSkabelonFeltType';

export const useFormularStore = defineStore('formularStore', () => {
    const formularSkabelonListe = ref([] as formularSkabelonType[]);
    const formularSkabelonNavnListe = ref([] as formularSkabelonNavnType[])
    const formularSkabelonFeltListe = ref([] as formularSkabelonFeltType[])

    function setformularSkabelonListe(liste: formularSkabelonType[]): void {
        formularSkabelonListe.value = liste;
    }

    function setformularSkabelonNavnListe(liste: formularSkabelonNavnType[]): void {
        formularSkabelonNavnListe.value = liste;
    }

    function setformularSkabelonFeltListe(liste: formularSkabelonFeltType[]): void {
        formularSkabelonFeltListe.value = liste;
    }

    return {
        formularSkabelonListe,
        formularSkabelonNavnListe,
        formularSkabelonFeltListe,
        setformularSkabelonListe,
        setformularSkabelonNavnListe,
        setformularSkabelonFeltListe
    }
})