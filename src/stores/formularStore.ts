import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { formularSkabelonType } from '@/types/formularSkabelonType'
import type { formularSkabelonNavnType } from '@/types/formularSkabelonNavnType';
import type { formularSkabelonFeltType } from '@/types/formularSkabelonFeltType';
import type { maerkningsScenarieType } from '@/types/maerkningsScenarieType';
import type { skabelonRedigerModel } from '@/models/skabelonRedigerModel';
import type { skabelonFormularFeltModelType } from '@/models/skabelonFormularFeltModel';
import type { MaerkningsFormularFeltType } from '@/types/MaerkningsFormularFelt';

export const useFormularStore = defineStore('formularStore', () => {
    const formularSkabelonListe = ref([] as formularSkabelonType[]);
    const formularSkabelonNavnListe = ref([] as formularSkabelonNavnType[]);
    const formularSkabelonFeltListe = ref([] as formularSkabelonFeltType[]);
    const maerkningsScenarieListe = ref([] as maerkningsScenarieType[]);
    const maerkningsFormularFeltListe = ref([] as MaerkningsFormularFeltType[]);
    const genopfriskIndex = ref(0 as number);

    function opdaterGenopfriskIndex() {
        genopfriskIndex.value ++;
    }

    function getSkabelonRedigerModelById(formularSkabelonId: number): skabelonRedigerModel | undefined {
        let skabelon = formularSkabelonListe.value.find((item) => item.id == formularSkabelonId);
        let skabelonNavn = formularSkabelonNavnListe.value.find((item) => item.formularSkabelonId == formularSkabelonId);
        if (skabelon && skabelonNavn) {
            return skabelonRedigerModelFactory(skabelon, skabelonNavn);
        }
        return undefined;
    }

    function getFormularNavnIdBySkabelonId(skabelonId: number): number | undefined {
        let formularSkabelonNavn = formularSkabelonNavnListe.value.find((item) => item.licenshaverId == undefined && item.formularSkabelonId == skabelonId);
        return formularSkabelonNavn ? formularSkabelonNavn.id : undefined;
    }

    function getFormularFelterBySkabelonNavnId(skabelonNavnId: number): skabelonFormularFeltModelType[] {
        let listOfModel = [] as skabelonFormularFeltModelType[];
        let formularSkabelonFeltList = formularSkabelonFeltListe.value.filter((item) => item.formularSkabelonNavnId == skabelonNavnId);
        formularSkabelonFeltList.forEach((formularSkabelonFelt) => {
            let maerkningsFelt = maerkningsFormularFeltListe.value.find((item) => item.id == formularSkabelonFelt.maerkningsFormularFeltId);
            if(maerkningsFelt) {
                listOfModel.push(skabelonFormularFeltModelFactory(formularSkabelonFelt, maerkningsFelt))
            }
        });
        return listOfModel;
    }

    function skabelonRedigerModelFactory(skabelon: formularSkabelonType, skabelonNavn: formularSkabelonNavnType): skabelonRedigerModel {
        return {
            formularSkabelon: skabelon,
            formularSkabelonNavn: skabelonNavn
        }
    }

    function skabelonFormularFeltModelFactory(
        formularSkabelonFelt: formularSkabelonFeltType,
        maerkningsFormularFelt: MaerkningsFormularFeltType): skabelonFormularFeltModelType {
        return { 
            formularSkabelonFelt: formularSkabelonFelt, 
            maerkningsFormularFelt: maerkningsFormularFelt 
        };
    }

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

    function setMaerkningsFormularFeltListe(liste: MaerkningsFormularFeltType[]): void {
        maerkningsFormularFeltListe.value = liste;
    }

    function opdaterSkabelon(skabelonRedigerModel: skabelonRedigerModel): void {
        if (skabelonRedigerModel.formularSkabelon.id > 0) {
            let skabelon = formularSkabelonListe.value.find((item => item.id == skabelonRedigerModel.formularSkabelon.id));
            if (skabelon) {
                skabelon.maerkningsScenarieId = skabelonRedigerModel.formularSkabelon.maerkningsScenarieId;
            }
            let skabelonNavnItem = formularSkabelonNavnListe.value.find((item) => item.id == skabelonRedigerModel.formularSkabelonNavn.id);
            if (skabelonNavnItem) {
                skabelonNavnItem.skabelonNavn = skabelonRedigerModel.formularSkabelonNavn.skabelonNavn;
            }
        }
    }

    return {
        formularSkabelonListe,
        formularSkabelonNavnListe,
        formularSkabelonFeltListe,
        maerkningsScenarieListe,
        maerkningsFormularFeltListe,

        getSkabelonRedigerModelById,
        getFormularNavnIdBySkabelonId,
        getFormularFelterBySkabelonNavnId,

        setformularSkabelonListe,
        setformularSkabelonNavnListe,
        setformularSkabelonFeltListe,
        setMaerkningsScenarieListe,
        setMaerkningsFormularFeltListe,
        
        opdaterSkabelon,
        genopfriskIndex
    }
})