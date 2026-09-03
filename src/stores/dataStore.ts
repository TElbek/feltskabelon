import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { formTemplateType } from '@/types/formTemplateType'
import type { formTemplateNameType } from '@/types/formTemplateNameType';
import type { formTemplateFieldType } from '@/types/formTemplateFieldType';
import type { bandingScenarioType } from '@/types/bandingScenarioType';
import type { templateModelType } from '@/models/templateModelType';
import type { templateFieldModelType } from '@/models/templateFieldModelType';
import type { bandingFormType } from '@/types/bandingFormType';
import type { licenseeType } from '@/types/licenseeType';

export const useDataStore = defineStore('dataStore', () => {
    const formularSkabelonListe = ref([] as formTemplateType[]);
    const formularSkabelonNavnListe = ref([] as formTemplateNameType[]);
    const formularSkabelonFeltListe = ref([] as formTemplateFieldType[]);
    const maerkningsScenarieListe = ref([] as bandingScenarioType[]);
    const maerkningsFormularFeltListe = ref([] as bandingFormType[]);
    const licenshaverListe = ref([] as licenseeType[])
    const licenshaverId = ref(1 as number);
    const genopfriskIndex = ref(0 as number);

    const erAdministrator = computed(() => {
        return licenshaverListe.value.some((item) => item.id == licenshaverId.value && item.isAdmin);
    });

    const licenshaverNavn = computed(() => {
        return licenshaverListe.value.some((item) => item.id == licenshaverId.value) ?
               licenshaverListe.value.find((item) => item.id == licenshaverId.value)?.name : ''
    });

    function opdaterGenopfriskIndex() {
        genopfriskIndex.value ++;
    }

    function getSkabelonListe() : templateModelType[] {
        let listOfModel = [] as templateModelType[];

        formularSkabelonNavnListe.value.filter((item) => item.licenseeId == licenshaverId.value).forEach((skabelonNavn) => {
            let skabelon = formularSkabelonListe.value.find((item) => item.id == skabelonNavn.formTemplateId);
            if(skabelon) {
                listOfModel.push(skabelonModelFactory(skabelon, skabelonNavn));
            }
        });

        formularSkabelonNavnListe.value.filter((item) => item.licenseeId == undefined).forEach((skabelonNavn) => {
            let skabelon = formularSkabelonListe.value.find((item) => item.id == skabelonNavn.formTemplateId);
            if(skabelon && !listOfModel.some((listOfModelItem) => listOfModelItem.formTemplateType.id == skabelon.id)) {
                listOfModel.push(skabelonModelFactory(skabelon, skabelonNavn));
            }
        });

        return listOfModel;
    }

    function getNewIdForSkabelonNavn() {
        return formularSkabelonNavnListe.value.length > 0 ?
            Math.max(...formularSkabelonNavnListe.value.map(o => o.id)) + 1 : 1;
    }

    function getNewIdForSkabelonFelt() {
        return formularSkabelonFeltListe.value.length > 0 ?
            Math.max(...formularSkabelonFeltListe.value.map(o => o.id)) + 1 : 1;
    }

    function getSkabelonNavnModelById(formularSkabelonNavnId: number): templateModelType | undefined {
        let skabelonNavn = formularSkabelonNavnListe.value.find((item) => item.id == formularSkabelonNavnId);
        if(skabelonNavn) {
            let skabelon = formularSkabelonListe.value.find((item) => item.id == skabelonNavn.formTemplateId);
            if (skabelon) {
                return skabelonModelFactory(skabelon, skabelonNavn);
            }
        }
        return undefined;
    }

    function getFormularNavnIdBySkabelonId(skabelonId: number): number | undefined {
        let formularSkabelonNavn = formularSkabelonNavnListe.value.find((item) => item.licenseeId == undefined && item.formTemplateId == skabelonId);
        return formularSkabelonNavn ? formularSkabelonNavn.id : undefined;
    }

    function getFormularFelterBySkabelonNavnId(skabelonNavnId: number): templateFieldModelType[] {
        let listOfModel = [] as templateFieldModelType[];
        let skabelonNavnIdSet = getSkabelonNavnIdSetFromId(skabelonNavnId);

        let formularSkabelonFeltList = formularSkabelonFeltListe.value.filter((item) => skabelonNavnIdSet.has(item.formTemplateNameId));
        formularSkabelonFeltList.forEach((formularSkabelonFelt) => {
            let maerkningsFelt = maerkningsFormularFeltListe.value.find((item) => item.id == formularSkabelonFelt.bandingFormId);
            if(maerkningsFelt) {
                listOfModel.push(skabelonFormularFeltModelFactory(formularSkabelonFelt, maerkningsFelt))
            }
        });
        return listOfModel;
    }

    function getVaelgMaerkningsFeltBySkabelonNavnId(skabelonNavnId: number) : bandingFormType[] {
        let skabelonNavnIdSet = getSkabelonNavnIdSetFromId(skabelonNavnId);
        
        let existingIdSet = new Set([...new Set(formularSkabelonFeltListe.value.filter((item => skabelonNavnIdSet.has(item.formTemplateNameId)))
            .map((item) => item.bandingFormId))]);

        return maerkningsFormularFeltListe.value.filter((item) => !existingIdSet.has(item.id));
    }

    function harSkabelonNavnDetteFelt(skabelonNavnId: number, feltNavn: string) : boolean {

        let skabelonNavnIdSet = getSkabelonNavnIdSetFromId(skabelonNavnId);

        if(maerkningsFormularFeltListe.value.some((item) => item.fieldName == feltNavn)) {
            let maerkningsFormularFelt = maerkningsFormularFeltListe.value.find(item => item.fieldName == feltNavn);
            return formularSkabelonFeltListe.value.some(
                (item) => skabelonNavnIdSet.has(item.formTemplateNameId) && 
                          item.bandingFormId == maerkningsFormularFelt?.id);
        }
        return false;
    }

    function skabelonModelFactory(skabelon: formTemplateType, skabelonNavn: formTemplateNameType): templateModelType {
        return {
            formTemplateType: { ...skabelon},
            formTemplateNameType: { ...skabelonNavn}
        }
    }

    function skabelonFormularFeltModelFactory(
        formularSkabelonFelt: formTemplateFieldType,
        maerkningsFormularFelt: bandingFormType): templateFieldModelType {
        return { 
            formTemplateFieldType: { ...formularSkabelonFelt}, 
            bandingFormType: { ...maerkningsFormularFelt} 
        };
    }

    function setformularSkabelonListe(liste: formTemplateType[]): void {
        formularSkabelonListe.value = liste;
    }

    function setformularSkabelonNavnListe(liste: formTemplateNameType[]): void {
        formularSkabelonNavnListe.value = liste;
    }

    function setformularSkabelonFeltListe(liste: formTemplateFieldType[]): void {
        formularSkabelonFeltListe.value = liste;
    }

    function setMaerkningsScenarieListe(liste: bandingScenarioType[]): void {
        maerkningsScenarieListe.value = liste;
    }

    function setMaerkningsFormularFeltListe(liste: bandingFormType[]): void {
        maerkningsFormularFeltListe.value = liste;
    }

    function setLicenshaverListe(liste: licenseeType[]): void {
        licenshaverListe.value = liste;
    }

    function setLicenshaverId(id: number) {
        licenshaverId.value = id;
    }

    function opdaterSkabelon(skabelonRedigerModel: templateModelType): void {
        if (skabelonRedigerModel.formTemplateType.id > 0) {
            let skabelon = formularSkabelonListe.value.find((item => item.id == skabelonRedigerModel.formTemplateType.id));
            if (skabelon) {
                skabelon.bandingScenarioId = skabelonRedigerModel.formTemplateType.bandingScenarioId;
            }
            let skabelonNavnItem = formularSkabelonNavnListe.value.find((item) => item.id == skabelonRedigerModel.formTemplateNameType.id);
            if (skabelonNavnItem) {
                skabelonNavnItem.templateName = skabelonRedigerModel.formTemplateNameType.templateName;
            }
        }
    }

    function tilfoejSkabelonFelt(formularSkabelonNavnId: number, maerkningsFormularFeltId: number): void {
        formularSkabelonFeltListe.value.push(formularSkabelonFeltFactory(formularSkabelonNavnId, maerkningsFormularFeltId));
        opdaterGenopfriskIndex();
    }

    function formularSkabelonFeltFactory(formularSkabelonNavnId :number, maerkningsFormularFeltId: number) : formTemplateFieldType {
        return {
           id: getNewIdForSkabelonFelt(),
           isMinimumsField: erAdministrator.value, 
           formTemplateNameId: formularSkabelonNavnId,
           bandingFormId: maerkningsFormularFeltId
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

    function kopierSkabelonNavn(skabelonNavnId: number) : templateModelType | undefined {
        let skabelonNavnModel = getSkabelonNavnModelById(skabelonNavnId);
        if(skabelonNavnModel) {
            skabelonNavnModel.formTemplateNameType.id = 0;
            skabelonNavnModel.formTemplateNameType.licenseeId = licenshaverId.value;
            skabelonNavnModel.formTemplateNameType.templateName = 'Kopi af ' + skabelonNavnModel.formTemplateNameType.templateName;
            return skabelonNavnModel;
        }
        return undefined;
    }

    function opretSkabelonNavn(skabelonNavnModel: templateModelType): void {
        skabelonNavnModel.formTemplateNameType.id = getNewIdForSkabelonNavn();
        formularSkabelonNavnListe.value.push(skabelonNavnModel.formTemplateNameType)
    }

    function getSkabelonNavnIdSetFromId(skabelonNavnId: number) {
        let skabelonNavn = formularSkabelonNavnListe.value.find((item) => item.id == skabelonNavnId);
        let skabelonNavnIdSet = new Set();

        if(skabelonNavn && skabelonNavn?.licenseeId > 0) {
            let skabelonNavnListe = formularSkabelonNavnListe.value.filter
                ((item => item.formTemplateId == skabelonNavn.formTemplateId && (item.licenseeId == skabelonNavn.licenseeId || item.licenseeId == undefined)));
            skabelonNavnListe.forEach((skabelonNavnListeitem) => {skabelonNavnIdSet.add(skabelonNavnListeitem.id)});
        }
        else {
            skabelonNavnIdSet.add(skabelonNavn?.id);
        }
        return skabelonNavnIdSet;
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
        getSkabelonNavnModelById,
        getFormularNavnIdBySkabelonId,
        getFormularFelterBySkabelonNavnId,
        getVaelgMaerkningsFeltBySkabelonNavnId,

        erAdministrator,
        licenshaverNavn,

        harSkabelonNavnDetteFelt,
        fjernSkabelonFelt,
        tilfoejSkabelonFelt,

        setformularSkabelonListe,
        setformularSkabelonNavnListe,
        setformularSkabelonFeltListe,
        setMaerkningsScenarieListe,
        setMaerkningsFormularFeltListe,
        setLicenshaverListe,
        setLicenshaverId,

        kopierSkabelonNavn,
        opretSkabelonNavn,
        
        opdaterSkabelon,
        genopfriskIndex
    }
})