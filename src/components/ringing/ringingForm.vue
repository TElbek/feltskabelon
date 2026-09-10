<template>
    <form :id="`maerkningForm_${props.index}`" :class="[formIsVisible ? 'visible' : 'hidden']">
        <div class="flex flex-row flex-wrap gap-2">
            <validitet_roed_20px></validitet_roed_20px>
            <tw-input :type="'text'" :name="'data_type'" :placeholder="'DataType'" />
            <tw-input :type="'text'" :name="'RingingScheme'" :placeholder="'Ringcentral'" />
            <tw-input :type="'text'" :name="'IdentificationNumber'" class="text-end" :placeholder="'RingNummer'" />
            <tw-input :type="'text'" :name="'euringDate'" class="text-center" :placeholder="'Dato (åååå-mm-dd)'" />
            <tw-input :type="'text'" :name="'euringTime'" class="text-center" :placeholder="'Tid (tt:mm)'" />
            <tw-input :type="'text'" :name="'SpeciesReported'" :placeholder="'Art'" />
            <tw-input :type="'text'" :name="'SexReported'" :placeholder="'Køn'" />
            <tw-input :type="'text'" :name="'AgeReported'" class="text-end" :placeholder="'Alder'" />
            <tw-input :type="'text'" :name="'LokalitetID'" :placeholder="'Lokalitet'" />
            <tw-input :type="'number'" :name="'LicensNr'" class="text-end" :placeholder="'LicensNr'" />
            <tw-input :type="'text'" :name="'CatchingMethod'" :placeholder="'Fangstmetode'" />
            <tw-input :type="'text'" :name="'PlaceName'" :placeholder="'Præcis sted'" />
            <tw-input :type="'text'" :name="'ColorRing'" :placeholder="'Farvering'" />
            <tw-input :type="'number'" :name="'ColorRingNr'" class="text-end" :placeholder="'Farvering Nr'" />
            <tw-input :type="'text'" :name="'Status'" :placeholder="'Status'" />
            <tw-input :type="'number'" :name="'Sub-licensNr'" class="text-end" :placeholder="'Sub-licensNr'" />
            <tw-input :type="'number'" :name="'BroodSize'" class="text-end" :placeholder="'Kuld'" />
            <tw-input :type="'text'" :name="'PullusAge'" :placeholder="'Unge alder'" />
            <tw-input :type="'text'" :name="'CatchingLures'" :placeholder="'Lokkemetode'" />
            <tw-input :type="'number'" :name="'Mass'" class="text-end" :placeholder="'Vægt (g)'" />
            <tw-input :type="'number'" :name="'WingLength'" class="text-end" :placeholder="'Vinge (mm)'" />
            <tw-input :type="'text'" :name="'Remarks'" :placeholder="'Bemærkninger'" />
            <tw-input :type="'text'" :name="'BroodPatch'" :placeholder="'Rugeplet'" />
            <tw-input :type="'text'" :name="'project_Moult'" :placeholder="'Fældning'" />
            <tw-input :type="'number'" :name="'FatScore'" class="text-end" :placeholder="'FedtScore'" />
            <tw-input :type="'text'" :name="'FatScoreMethod'" :placeholder="'FedtScoreMetode'" />
            <tw-input :type="'text'" :name="'project_HabitatType'" :placeholder="'HabitatType'" />
            <tw-input :type="'number'" :name="'project_TotalNetLength'" class="text-end" :placeholder="'NetLængde'" />
            <tw-input :type="'text'" :name="'project_VisitPeriod'" :placeholder="'Periode'" />
            <tw-input :type="'text'" :name="'project_TimeStart'" class="text-center" :placeholder="'Starttid (tt:mm)'" />
            <tw-input :type="'text'" :name="'project_TimeEnd'" class="text-center" :placeholder="'Sluttid (tt:mm)'" />
        </div>
    </form>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { onMounted, ref, watch } from 'vue';
import validitet_roed_20px from '@/components/ringing/icons/validitet_roed_20px.vue';

const dataStore = useDataStore();

const formIsVisible = ref(false);
const waitTimeInms = 100;

interface ringingFormProps {
    formTemplateNameId: number,
    index: number
}

const props = defineProps<ringingFormProps>();

onMounted(() => {
    setTimeout(() => {
        hideAndShow(props.index);
        formIsVisible.value = true;
    }, waitTimeInms);
});

function hideAndShow(index: number): void {
    let form = getFormElementById('maerkningForm_' + index);
    if (form) {
        findInputElementsInForm(form);
    }
}

function findInputElementsInForm(formElement: HTMLElement) {
    loopElementList(getElementsInFormByTagName(formElement, "input"));
}

function getElementsInFormByTagName(formElement: HTMLElement, tagName: string): HTMLCollectionOf<Element> {
    return formElement.getElementsByTagName(tagName);
}

function loopElementList(elementList: HTMLCollectionOf<Element>) {
    for (let index = 0; index < elementList.length; ++index) {
        let element = elementList[index];
        if (element instanceof HTMLInputElement) {
            dataStore.hasFormTemplateNameThisField(props.formTemplateNameId, element.name) ?
                element.classList.remove('skjul-felt') : element.classList.add('skjul-felt');
        }
    }
}

function getFormElementById(formId: string): HTMLElement | null {
    return document.getElementById(formId);
}

watch(() => props.formTemplateNameId, () => {
    formIsVisible.value = false;
    hideAndShow(props.index);
    formIsVisible.value = true;
});
</script>

<style scoped>
input {
    field-sizing: content;
    padding-left: 5px;
    padding-right: 5px;
}
</style>