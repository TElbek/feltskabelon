import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { formularSkabelonType } from '@/types/formularSkabelonType'
import type { formularSkabelonNavnType } from '@/types/formularSkabelonNavnType';
import type { formularSkabelonFeltType } from '@/types/formularSkabelonFeltType';
import type { maerkningsScenarieType } from '@/types/maerkningsScenarieType';
import type { skabelonModelType } from '@/models/skabelonModelType';
import type { skabelonFeltModelType } from '@/models/skabelonFeltModelType';
import type { MaerkningsFormularFeltType } from '@/types/MaerkningsFormularFelt';
import type { licensHaverType } from '@/types/licensHaverType';

export const useFormularStore = defineStore('formularStore', () => {
    const formularSkabelonListe = ref([] as formularSkabelonType[]);
    const formularSkabelonNavnListe = ref([] as formularSkabelonNavnType[]);
    const formularSkabelonFeltListe = ref([] as formularSkabelonFeltType[]);
    const maerkningsScenarieListe = ref([] as maerkningsScenarieType[]);
    const maerkningsFormularFeltListe = ref([] as MaerkningsFormularFeltType[]);
    const licenshaverListe = ref([] as licensHaverType[])
    const licenshaverId = ref(1 as number);
    const genopfriskIndex = ref(0 as number);

    const erAdministrator = computed(() => {
        return licenshaverListe.value.some((item) => item.id == licenshaverId.value && item.erAdmin);
    });

    function opdaterGenopfriskIndex() {
        genopfriskIndex.value ++;
    }

    function getSkabelonListe() : skabelonModelType[] {
        let listOfModel = [] as skabelonModelType[];

        formularSkabelonNavnListe.value.filter((item) => item.licenshaverId == licenshaverId.value).forEach((skabelonNavn) => {
            let skabelon = formularSkabelonListe.value.find((item) => item.id == skabelonNavn.formularSkabelonId);
            if(skabelon) {
                listOfModel.push(skabelonModelFactory(skabelon, skabelonNavn));
            }
        });

        formularSkabelonNavnListe.value.filter((item) => item.licenshaverId == undefined).forEach((skabelonNavn) => {
            let skabelon = formularSkabelonListe.value.find((item) => item.id == skabelonNavn.formularSkabelonId);
            if(skabelon && !listOfModel.some((listOfModelItem) => listOfModelItem.formularSkabelon.id == skabelon.id)) {
                listOfModel.push(skabelonModelFactory(skabelon, skabelonNavn));
            }
        });

        return listOfModel;
    }

    function getNewIdForFormularSkabelonFelt() {
        return formularSkabelonFeltListe.value.length > 0 ?
            Math.max(...formularSkabelonFeltListe.value.map(o => o.id)) + 1 : 1;
    }

    function getSkabelonNavnRedigerModelById(formularSkabelonNavnId: number): skabelonModelType | undefined {
        let skabelonNavn = formularSkabelonNavnListe.value.find((item) => item.id == formularSkabelonNavnId);
        if(skabelonNavn) {
            let skabelon = formularSkabelonListe.value.find((item) => item.id == skabelonNavn.formularSkabelonId);
            if (skabelon) {
                return skabelonModelFactory(skabelon, skabelonNavn);
            }
        }
        return undefined;
    }

    function getFormularNavnIdBySkabelonId(skabelonId: number): number | undefined {
        let formularSkabelonNavn = formularSkabelonNavnListe.value.find((item) => item.licenshaverId == undefined && item.formularSkabelonId == skabelonId);
        return formularSkabelonNavn ? formularSkabelonNavn.id : undefined;
    }

    function getFormularFelterBySkabelonNavnId(skabelonNavnId: number): skabelonFeltModelType[] {
        let listOfModel = [] as skabelonFeltModelType[];
        let formularSkabelonFeltList = formularSkabelonFeltListe.value.filter((item) => item.formularSkabelonNavnId == skabelonNavnId);
        formularSkabelonFeltList.forEach((formularSkabelonFelt) => {
            let maerkningsFelt = maerkningsFormularFeltListe.value.find((item) => item.id == formularSkabelonFelt.maerkningsFormularFeltId);
            if(maerkningsFelt) {
                listOfModel.push(skabelonFormularFeltModelFactory(formularSkabelonFelt, maerkningsFelt))
            }
        });
        return listOfModel;
    }

    function getVaelgMaerkningsFeltBySkabelonNavnId(skabelonNavnId: number) : MaerkningsFormularFeltType[] {
        let existingIdSet = new Set([...new Set(formularSkabelonFeltListe.value
            .filter((item => item.formularSkabelonNavnId == skabelonNavnId))
            .map((item) => item.maerkningsFormularFeltId))]);

        return maerkningsFormularFeltListe.value.filter(
            (item) => !existingIdSet.has(item.id));
    }

    function harSkabelonNavnDetteFelt(skabelonNavnId: number, feltNavn: string) : boolean {
        if(maerkningsFormularFeltListe.value.some((item) => item.feltNavn == feltNavn)) {
            let maerkningsFormularFelt = maerkningsFormularFeltListe.value.find(item => item.feltNavn == feltNavn);
            return formularSkabelonFeltListe.value.some(
                (item) => item.formularSkabelonNavnId == skabelonNavnId && 
                          item.maerkningsFormularFeltId == maerkningsFormularFelt?.id);
        }
        return false;
    }

    function skabelonModelFactory(skabelon: formularSkabelonType, skabelonNavn: formularSkabelonNavnType): skabelonModelType {
        return {
            formularSkabelon: skabelon,
            formularSkabelonNavn: skabelonNavn
        }
    }

    function skabelonFormularFeltModelFactory(
        formularSkabelonFelt: formularSkabelonFeltType,
        maerkningsFormularFelt: MaerkningsFormularFeltType): skabelonFeltModelType {
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

    function setLicenshaverListe(liste: licensHaverType[]): void {
        licenshaverListe.value = liste;
    }

    function setLicenshaver(id: number) {
        licenshaverId.value = id;
    }

    function opdaterSkabelon(skabelonRedigerModel: skabelonModelType): void {
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

    function tilfoejSkabelonFelt(formularSkabelonNavnId: number, maerkningsFormularFeltId: number): void {
        formularSkabelonFeltListe.value.push(formularSkabelonFeltFactory(formularSkabelonNavnId, maerkningsFormularFeltId));
        opdaterGenopfriskIndex();
    }

    function formularSkabelonFeltFactory(formularSkabelonNavnId :number, maerkningsFormularFeltId: number) : formularSkabelonFeltType {
        return {
           id: getNewIdForFormularSkabelonFelt(),
           erMinimumsFelt: true, 
           formularSkabelonNavnId: formularSkabelonNavnId,
           maerkningsFormularFeltId: maerkningsFormularFeltId
        }
    }

    function fjernSkabelonFelt(formularSkabelonFeltId : number) :void { 
        if(formularSkabelonFeltListe.value.some((item) => item.id == formularSkabelonFeltId)) {
            let toBeRemoved = formularSkabelonFeltListe.value.find((item) => item.id == formularSkabelonFeltId);
            if(toBeRemoved) {
                let toBeRemovedIndex = formularSkabelonFeltListe.value.indexOf(toBeRemoved);
                formularSkabelonFeltListe.value.splice(toBeRemovedIndex,1);
                opdaterGenopfriskIndex();
            }
        }
    }

    return {
        formularSkabelonListe,
        formularSkabelonNavnListe,
        formularSkabelonFeltListe,
        maerkningsScenarieListe,
        maerkningsFormularFeltListe,
        licenshaverListe,
        licenshaverId,

        getSkabelonListe,
        getSkabelonNavnRedigerModelById,
        getFormularNavnIdBySkabelonId,
        getFormularFelterBySkabelonNavnId,
        getVaelgMaerkningsFeltBySkabelonNavnId,
        erAdministrator,

        harSkabelonNavnDetteFelt,
        fjernSkabelonFelt,
        tilfoejSkabelonFelt,

        setformularSkabelonListe,
        setformularSkabelonNavnListe,
        setformularSkabelonFeltListe,
        setMaerkningsScenarieListe,
        setMaerkningsFormularFeltListe,
        setLicenshaverListe,
        setLicenshaver,
        
        opdaterSkabelon,
        genopfriskIndex
    }
})