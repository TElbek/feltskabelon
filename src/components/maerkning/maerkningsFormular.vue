<template>
    <div>
        <form id="maerkningForm" :class="[formIsVisible ? 'visible' : 'hidden']">
            <div class="flex flex-row flex-wrap mt-2 gap-2">
                <tw-input :type="'text'" :name="'data_type'" :placeholder="'DataType'" />
                <tw-input :type="'text'" :name="'RingingScheme'" :placeholder="'Scheme'" />
                <tw-input :type="'text'" :name="'IdentificationNumber'" class="text-end" :placeholder="'RingNummer'" />
                <tw-input :type="'text'" :name="'euringDate'" class="text-center" :placeholder="'åååå-mm-dd'" />
                <tw-input :type="'text'" :name="'euringTime'" class="text-center" :placeholder="'tt:mm'" />
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
                <tw-input :type="'text'" :name="'BroodPatch'" :placeholder="'Brood Patch'" />
                <tw-input :type="'text'" :name="'project_Moult'" :placeholder="'Moult'" />
                <tw-input :type="'number'" :name="'FatScore'" class="text-end" :placeholder="'FatScore'" />
                <tw-input :type="'text'" :name="'FatScoreMethod'" :placeholder="'FatScoreMethod'" />
                <tw-input :type="'text'" :name="'project_HabitatType'" :placeholder="'HabitatType'" />
                <tw-input :type="'number'" :name="'project_TotalNetLength'" class="text-end"
                    :placeholder="'NetLength'" />
                <tw-input :type="'text'" :name="'project_VisitPeriod'" :placeholder="'VisitPeriod'" />
                <tw-input :type="'text'" :name="'project_TimeStart'" class="text-center"
                    :placeholder="'Start (tt:mm)'" />
                <tw-input :type="'text'" :name="'project_TimeEnd'" class="text-center"
                    :placeholder="'End (tt:mm)'" />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const route = useRoute();
const formularStore = useDataStore();
const { refreshIndex: genopfriskIndex } = storeToRefs(formularStore);

const formIsVisible = ref(false);
const formularSkabelonNavnId = computed(() => Number(route.params.skabelonNavnId));
const waitTimeInms = 100;

onMounted(() => {
    setTimeout(() => {
        hideAndShow();
        formIsVisible.value = true;
    }, waitTimeInms);
});

function hideAndShow(): void {
    let form = getFormElementById('maerkningForm');
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
            formularStore.hasFormTemplateNameThisField(formularSkabelonNavnId.value, element.name) ?
                element.classList.remove('skjul-felt') : element.classList.add('skjul-felt');
        }
    }
}

function getFormElementById(formId: string): HTMLElement | null {
    return document.getElementById(formId);
}

watch(genopfriskIndex, () => {
    hideAndShow();
})
</script>

<style scoped>
input {
    field-sizing: content;
    padding-left: 5px;
    padding-right: 5px;
}
</style>