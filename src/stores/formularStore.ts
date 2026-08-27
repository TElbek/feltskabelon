import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { formularSkabelonType } from '@/types/formularSkabelonType'
import type { formularSkabelonNavnType } from '@/types/formularSkabelonNavnType';
import type { formularSkabelonFeltType } from '@/types/formularSkabelonFeltType';
import type { maerkningsScenarieType } from '@/types/maerkningsScenarieType';

export const useFormularStore = defineStore('formularStore', () => {
    const formularSkabelonListe = ref([] as formularSkabelonType[]);
    const formularSkabelonNavnListe = ref([] as formularSkabelonNavnType[]);
    const formularSkabelonFeltListe = ref([] as formularSkabelonFeltType[]);
    const maerkningsScenarieListe = ref([] as maerkningsScenarieType[]);

    const formularSkabelonListeByScenarie = computed(() => {
        return Map.groupBy(formularSkabelonListe.value.sort((a, b) => a.id - b.id), (one: formularSkabelonType) => one.maerkningsScenarieId)
    })
    
    function setformularSkabelonListe(liste: formularSkabelonType[]): void {
        formularSkabelonListe.value = liste;
    }

    function setformularSkabelonNavnListe(liste: formularSkabelonNavnType[]): void {
        formularSkabelonNavnListe.value = liste;
    }

    function setformularSkabelonFeltListe(liste: formularSkabelonFeltType[]): void {
        formularSkabelonFeltListe.value = liste;
    }

    function setMaerkningsScenarieListe(liste: maerkningsScenarieType[]): void {
        maerkningsScenarieListe.value = liste;
    }

    return {
        formularSkabelonListe,
        formularSkabelonNavnListe,
        formularSkabelonFeltListe,
        maerkningsScenarieListe,

        formularSkabelonListeByScenarie,

        setformularSkabelonListe,
        setformularSkabelonNavnListe,
        setformularSkabelonFeltListe,
        setMaerkningsScenarieListe
    }
})