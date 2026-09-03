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
    const formTemplateList = ref([] as formTemplateType[]);
    const formTemplateNameList = ref([] as formTemplateNameType[]);
    const formTemplateFieldList = ref([] as formTemplateFieldType[]);
    const bandingScenarioList = ref([] as bandingScenarioType[]);
    const bandingFormList = ref([] as bandingFormType[]);
    const licenseeList = ref([] as licenseeType[])
    const LicenseeId = ref(1 as number);
    const refreshIndex = ref(0 as number);

    const isAdministrator = computed(() => {
        return licenseeList.value.some((item) => item.id == LicenseeId.value && item.isAdmin);
    });

    const licenseeName = computed(() => {
        return licenseeList.value.some((item) => item.id == LicenseeId.value) ?
               licenseeList.value.find((item) => item.id == LicenseeId.value)?.name : ''
    });

    function incrementRefreshIndex() {
        refreshIndex.value ++;
    }

    function getTemplateModelList() : templateModelType[] {
        let listOfModel = [] as templateModelType[];

        formTemplateNameList.value.filter((formTemplateName) => formTemplateName.licenseeId == LicenseeId.value).forEach((templateName) => {
            let formTemplate = formTemplateList.value.find((item) => item.id == templateName.formTemplateId);
            if(formTemplate && formTemplateNameList.value.some((item) => item.formTemplateId == formTemplate.id && item.licenseeId == undefined && item.isActive)) {
                listOfModel.push(templateModelFactory(formTemplate, templateName));
            }
        });

        formTemplateNameList.value.filter((formTemplateName) => formTemplateName.licenseeId == undefined).forEach((templateName) => {
            let formTemplate = formTemplateList.value.find((item) => item.id == templateName.formTemplateId);
            if(formTemplate && !listOfModel.some((listOfModelItem) => listOfModelItem.formTemplate.id == formTemplate.id)) {
                listOfModel.push(templateModelFactory(formTemplate, templateName));
            }
        });

        return listOfModel;
    }

    function getNewIdForTemplateName() {
        return formTemplateNameList.value.length > 0 ?
            Math.max(...formTemplateNameList.value.map(o => o.id)) + 1 : 1;
    }

    function getNewIdForTemplateField() {
        return formTemplateFieldList.value.length > 0 ?
            Math.max(...formTemplateFieldList.value.map(o => o.id)) + 1 : 1;
    }

    function getTemplateNameModelById(formularTemplateNameId: number): templateModelType | undefined {
        let templateName = formTemplateNameList.value.find((item) => item.id == formularTemplateNameId);
        if(templateName) {
            let template = formTemplateList.value.find((item) => item.id == templateName.formTemplateId);
            if (template) {
                return templateModelFactory(template, templateName);
            }
        }
        return undefined;
    }

    function getTemplateNameIdByTemplateId(templateId: number): number | undefined {
        let formTemplateName = formTemplateNameList.value.find((item) => item.licenseeId == undefined && item.formTemplateId == templateId);
        return formTemplateName ? formTemplateName.id : undefined;
    }

    function getTemplateFieldsByTemplateNameId(templateNameId: number): templateFieldModelType[] {
        let listOfModel = [] as templateFieldModelType[];
        let templateNameIdSet = getTemplateNameIdSetFromId(templateNameId);

        let templateFieldList = formTemplateFieldList.value.filter((item) => templateNameIdSet.has(item.formTemplateNameId));
        templateFieldList.forEach((templateField) => {
            let bandingFormField = bandingFormList.value.find((item) => item.id == templateField.bandingFormId);
            if(bandingFormField) {
                listOfModel.push(templateFieldModelFactory(templateField, bandingFormField))
            }
        });
        return listOfModel;
    }

    function getChooseBandingFieldsByTemplateNameId(templateNameId: number) : bandingFormType[] {
        let templateNameIdSet = getTemplateNameIdSetFromId(templateNameId);
        
        let existingIdSet = new Set([...new Set(formTemplateFieldList.value.filter((item => templateNameIdSet.has(item.formTemplateNameId)))
            .map((item) => item.bandingFormId))]);

        return bandingFormList.value.filter((item) => !existingIdSet.has(item.id));
    }

    function hasFormTemplateNameThisField(templateNameId: number, fieldName: string) : boolean {

        let templateNameIdSet = getTemplateNameIdSetFromId(templateNameId);

        if(bandingFormList.value.some((item) => item.fieldName == fieldName)) {
            let bandingFormField = bandingFormList.value.find(item => item.fieldName == fieldName);
            return formTemplateFieldList.value.some(
                (item) => templateNameIdSet.has(item.formTemplateNameId) && 
                          item.bandingFormId == bandingFormField?.id);
        }
        return false;
    }

    function templateModelFactory(template: formTemplateType, templateName: formTemplateNameType): templateModelType {
        return {
            formTemplate: { ...template},
            formTemplateName: { ...templateName}
        }
    }

    function templateFieldModelFactory(
        formTemplateField: formTemplateFieldType,
        bandingForm: bandingFormType): templateFieldModelType {
        return { 
            formTemplateFieldType: { ...formTemplateField}, 
            bandingFormType: { ...bandingForm} 
        };
    }

    function setFormTemplateList(liste: formTemplateType[]): void {
        formTemplateList.value = liste;
    }

    function setFormTemplateNameList(liste: formTemplateNameType[]): void {
        formTemplateNameList.value = liste;
    }

    function setFormTemplateFieldList(liste: formTemplateFieldType[]): void {
        formTemplateFieldList.value = liste;
    }

    function setBandingScenarioList(liste: bandingScenarioType[]): void {
        bandingScenarioList.value = liste;
    }

    function setBandingFormList(liste: bandingFormType[]): void {
        bandingFormList.value = liste;
    }

    function setLicenseeList(liste: licenseeType[]): void {
        licenseeList.value = liste;
    }

    function setLicenseeId(id: number) {
        LicenseeId.value = id;
    }

    function updateFormTemplate(templateModel: templateModelType): void {
        if (templateModel.formTemplate.id > 0) {
            let formTemplate = formTemplateList.value.find((item => item.id == templateModel.formTemplate.id));
            if (formTemplate) {
                formTemplate.bandingScenarioId = templateModel.formTemplate.bandingScenarioId;
            }
            let formTemplateName = formTemplateNameList.value.find((item) => item.id == templateModel.formTemplateName.id);
            if (formTemplateName) {
                formTemplateName.templateName = templateModel.formTemplateName.templateName;
                formTemplateName.isActive = templateModel.formTemplateName.isActive;
            }
        }
    }

    function addFormTemplateField(formTemplateNameId: number, bandingFormId: number): void {
        formTemplateFieldList.value.push(formTemplateFieldFactory(formTemplateNameId, bandingFormId));
        incrementRefreshIndex();
    }

    function formTemplateFieldFactory(formTemplateNameId :number, bandingFormId: number) : formTemplateFieldType {
        return {
           id: getNewIdForTemplateField(),
           isMinimumsField: isAdministrator.value, 
           formTemplateNameId: formTemplateNameId,
           bandingFormId: bandingFormId
        }
    }

    function removeFormTemplateField(formTemplateFieldId : number) :void { 
        if(formTemplateFieldList.value.some((item) => item.id == formTemplateFieldId)) {
            let toBeRemoved = formTemplateFieldList.value.find((item) => item.id == formTemplateFieldId);
            if(toBeRemoved) {
                let toBeRemovedIndex = formTemplateFieldList.value.indexOf(toBeRemoved);
                formTemplateFieldList.value.splice(toBeRemovedIndex,1);
                incrementRefreshIndex();
            }
        }
    }

    function copyTemplateName(templateNameId: number) : templateModelType | undefined {
        let templateNameModel = getTemplateNameModelById(templateNameId);
        if(templateNameModel) {
            templateNameModel.formTemplateName.id = 0;
            templateNameModel.formTemplateName.licenseeId = LicenseeId.value;
            templateNameModel.formTemplateName.templateName = 'Copy of ' + templateNameModel.formTemplateName.templateName;
            return templateNameModel;
        }
        return undefined;
    }

    function createTemplateName(templateModel: templateModelType): void {
        templateModel.formTemplateName.id = getNewIdForTemplateName();
        formTemplateNameList.value.push(templateModel.formTemplateName)
    }

    function getTemplateNameIdSetFromId(templateNameId: number) {
        let templateName = formTemplateNameList.value.find((item) => item.id == templateNameId);
        let templateNameIdSet = new Set();

        if(templateName && templateName?.licenseeId > 0) {
            let templateNameList = formTemplateNameList.value.filter
                ((item => item.formTemplateId == templateName.formTemplateId && (item.licenseeId == templateName.licenseeId || item.licenseeId == undefined)));
            templateNameList.forEach((templateNameItem) => {templateNameIdSet.add(templateNameItem.id)});
        }
        else {
            templateNameIdSet.add(templateName?.id);
        }
        return templateNameIdSet;
    }

    return {
        formTemplateList,
        formTemplateNameList,
        formTemplateFieldList,
        bandingScenarioList,
        bandingFormList,
        licenseeList,
        LicenseeId,

        getTemplateModelList,
        getTemplateNameModelById,
        getTemplateNameIdByTemplateId,
        getTemplateFieldsByTemplateNameId,
        getChooseBandingFieldsByTemplateNameId,

        isAdministrator,
        licenseeName,

        hasFormTemplateNameThisField,
        removeFormTemplateField,
        addFormTemplateField,

        setFormTemplateList,
        setFormTemplateNameList,
        setFormTemplateFieldList,
        setBandingScenarioList,
        setBandingFormList,
        setLicenseeList,
        setLicenseeId,

        copyTemplateName: copyTemplateName,
        createTemplateName: createTemplateName,
        
        updateFormTemplate,
        refreshIndex
    }
})