import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { formTemplateType } from '@/types/formTemplateType'
import type { formTemplateNameType } from '@/types/formTemplateNameType';
import type { formTemplateFieldType } from '@/types/formTemplateFieldType';
import type { bandingScenarioType } from '@/types/bandingScenarioType';
import type { templateModelType } from '@/models/templateModelType';
import type { templateFieldModelType } from '@/models/templateFieldModelType';
import type { bandingFieldType } from '@/types/bandingFieldType';
import type { licenseeType } from '@/types/licenseeType';

export const useDataStore = defineStore('dataStore', () => {
    const formTemplateList = ref([] as formTemplateType[]);
    const formTemplateNameList = ref([] as formTemplateNameType[]);
    const formTemplateFieldList = ref([] as formTemplateFieldType[]);
    const bandingScenarioList = ref([] as bandingScenarioType[]);
    const bandingFieldList = ref([] as bandingFieldType[]);
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
        refreshIndex.value++;
    }

    function getTemplateModelListForScenario(scenarioId: number): templateModelType[] {
        let listOfModel = [] as templateModelType[];
        formTemplateList.value.filter((item) => item.bandingScenarioId == scenarioId).forEach((formTemplate) => {
            formTemplateNameList.value.filter((item) =>
                item.formTemplateId == formTemplate.id &&
                item.isActive).forEach((formTemplateName) => {
                    if(formTemplateNameList.value.some((item) => item.formTemplateId == formTemplate.id && item.licenseeId == undefined && item.isActive))
                    {
                        listOfModel.push(templateModelFactory(formTemplate, formTemplateName));
                    }                    
                })
        })

        return listOfModel;
    }

    function getTemplateModelListForBanding(): templateModelType[] {
        return getTemplateModelList().filter((item) => item.formTemplateName.isActive);
    }

    function getTemplateModelList(): templateModelType[] {
        let listOfModel = [] as templateModelType[];

        formTemplateNameList.value.filter((formTemplateName) => formTemplateName.licenseeId == LicenseeId.value).forEach((templateName) => {
            let formTemplate = formTemplateList.value.find((item) => item.id == templateName.formTemplateId);
            if (formTemplate && formTemplateNameList.value.some((item) => item.formTemplateId == formTemplate.id && item.licenseeId == undefined && item.isActive)) {
                listOfModel.push(templateModelFactory(formTemplate, templateName));
            }
        });

        formTemplateNameList.value.filter((formTemplateName) => formTemplateName.licenseeId == undefined).forEach((templateName) => {
            let formTemplate = formTemplateList.value.find((item) => item.id == templateName.formTemplateId);
            if (formTemplate && !listOfModel.some((listOfModelItem) => listOfModelItem.formTemplate.id == formTemplate.id)) {
                listOfModel.push(templateModelFactory(formTemplate, templateName));
            }
        });

        return isAdministrator.value ?
            listOfModel.sort((a, b) => a.formTemplateName.isActive === b.formTemplateName.isActive ? a.formTemplateName.templateName.localeCompare(b.formTemplateName.templateName) : (a.formTemplateName.isActive ? -1 : 1)) :
            listOfModel.filter((item) => item.formTemplateName.isActive || item.formTemplateName.licenseeId == LicenseeId.value)
                .sort((a, b) => a.formTemplateName.isActive === b.formTemplateName.isActive ? a.formTemplateName.templateName.localeCompare(b.formTemplateName.templateName) : (a.formTemplateName.isActive ? -1 : 1));
    }

    function getNewIdForTemplate() {
        return formTemplateList.value.length > 0 ?
            Math.max(...formTemplateList.value.map(o => o.id)) + 1 : 1;
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
        if (templateName) {
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

        console.log('templateNameIdSet', templateNameIdSet);

        let templateFieldList = formTemplateFieldList.value.filter((item) => templateNameIdSet.has(item.formTemplateNameId));
        templateFieldList.forEach((templateField) => {
            let bandingField = bandingFieldList.value.find((item) => item.id == templateField.bandingFieldId);
            if (bandingField) {
                listOfModel.push(templateFieldModelFactory(templateField, bandingField))
            }
        });
        return listOfModel;
    }

    function getChooseBandingFieldsByTemplateNameId(templateNameId: number): bandingFieldType[] {
        let templateNameIdSet = getTemplateNameIdSetFromId(templateNameId);

        let existingIdSet = new Set([...new Set(formTemplateFieldList.value.filter((item => templateNameIdSet.has(item.formTemplateNameId)))
            .map((item) => item.bandingFieldId))]);

        return bandingFieldList.value.filter((item) => !existingIdSet.has(item.id));
    }

    function hasFormTemplateNameThisField(templateNameId: number, fieldName: string): boolean {

        let templateNameIdSet = getTemplateNameIdSetFromId(templateNameId);

        if (bandingFieldList.value.some((item) => item.fieldName == fieldName)) {
            let bandingField = bandingFieldList.value.find(item => item.fieldName == fieldName);
            return formTemplateFieldList.value.some(
                (item) => templateNameIdSet.has(item.formTemplateNameId) &&
                    item.bandingFieldId == bandingField?.id);
        }
        return false;
    }

    function templateModelFactory(template: formTemplateType, templateName: formTemplateNameType): templateModelType {
        return {
            formTemplate: { ...template },
            formTemplateName: { ...templateName }
        }
    }

    function addTemplateModelFactory(): templateModelType {
        return {
            formTemplate: {
                id: 0,
                bandingScenarioId: 0
            },
            formTemplateName: {
                id: 0,
                licenseeId: undefined,
                formTemplateId: 0,
                templateName: '',
                isActive: false
            }
        }
    }

    function templateFieldModelFactory(
        formTemplateField: formTemplateFieldType,
        bandingField: bandingFieldType): templateFieldModelType {
        return {
            formTemplateFieldType: { ...formTemplateField },
            bandingFieldType: { ...bandingField }
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

    function setBandingFieldList(liste: bandingFieldType[]): void {
        bandingFieldList.value = liste;
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

    function addTemplateModel(templateModel: templateModelType): void {
        if (templateModel.formTemplate.id == 0) {
            templateModel.formTemplate.id = getNewIdForTemplate();
            templateModel.formTemplateName.formTemplateId = templateModel.formTemplate.id;
        }
        if (templateModel.formTemplateName.id == 0) {
            templateModel.formTemplateName.id = getNewIdForTemplateName();
        }

        formTemplateList.value.push(templateModel.formTemplate);
        formTemplateNameList.value.push(templateModel.formTemplateName);
    }

    function addFormTemplateField(formTemplateNameId: number, bandingFieldId: number): void {
        formTemplateFieldList.value.push(formTemplateFieldFactory(formTemplateNameId, bandingFieldId));
        incrementRefreshIndex();
    }

    function formTemplateFieldFactory(formTemplateNameId: number, bandingFieldId: number): formTemplateFieldType {
        return {
            id: getNewIdForTemplateField(),
            isMinimumsField: isAdministrator.value,
            formTemplateNameId: formTemplateNameId,
            bandingFieldId: bandingFieldId
        }
    }

    function removeFormTemplateField(formTemplateFieldId: number): void {
        if (formTemplateFieldList.value.some((item) => item.id == formTemplateFieldId)) {
            let toBeRemoved = formTemplateFieldList.value.find((item) => item.id == formTemplateFieldId);
            if (toBeRemoved) {
                let toBeRemovedIndex = formTemplateFieldList.value.indexOf(toBeRemoved);
                formTemplateFieldList.value.splice(toBeRemovedIndex, 1);
                incrementRefreshIndex();
            }
        }
    }

    function copyTemplateName(templateNameId: number): templateModelType | undefined {
        let templateNameModel = getTemplateNameModelById(templateNameId);
        if (templateNameModel) {
            templateNameModel.formTemplateName.id = 0;
            templateNameModel.formTemplateName.licenseeId = LicenseeId.value;
            templateNameModel.formTemplateName.templateName = licenseeName.value + ': ' + templateNameModel.formTemplateName.templateName;
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

        if (templateName && templateName?.licenseeId != undefined) {
            let templateNameList = formTemplateNameList.value.filter
                ((item => item.formTemplateId == templateName.formTemplateId && (item.licenseeId == templateName.licenseeId || item.licenseeId == undefined)));
            templateNameList.forEach((templateNameItem) => { templateNameIdSet.add(templateNameItem.id) });
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
        bandingFieldList,
        licenseeList,
        LicenseeId,

        getTemplateModelList,
        getTemplateModelListForScenario,
        getTemplateModelListForBanding,
        getTemplateNameModelById,
        getTemplateNameIdByTemplateId,
        getTemplateFieldsByTemplateNameId,
        getChooseBandingFieldsByTemplateNameId,

        isAdministrator,
        licenseeName,

        hasFormTemplateNameThisField,
        removeFormTemplateField,
        addTemplateModelFactory,
        addFormTemplateField,

        setFormTemplateList,
        setFormTemplateNameList,
        setFormTemplateFieldList,
        setBandingScenarioList,
        setBandingFieldList,
        setLicenseeList,
        setLicenseeId,

        copyTemplateName: copyTemplateName,
        createTemplateName: createTemplateName,

        addTemplateModel,
        updateFormTemplate,
        refreshIndex
    }
})