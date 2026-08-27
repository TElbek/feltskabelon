<template>
    <div>
        <form id="maerkningForm">
            <div class="flex flex-row flex-wrap mt-2 gap-2">
                <tw-input :type="'text'" :name="'data_type'" class="w-25" :placeholder="'DataType'" />
                <tw-input :type="'text'" :name="'RingingScheme'" class="w-20" :placeholder="'Scheme'" />
                <tw-input :type="'text'" :name="'IdentificationNumber'" class="w-40" :placeholder="'RingNummer'" />
                <tw-input :type="'text'" :name="'euringDate'" class="w-30" :placeholder="'åååå-mm-dd'" />
                <tw-input :type="'text'" :name="'euringTime'" class="w-15" :placeholder="'tt:mm'" />
                <tw-input :type="'text'" :name="'SpeciesReported'" class="w-50" :placeholder="'Art'" />
                <tw-input :type="'text'" :name="'SexReported'" class="w-20" :placeholder="'Køn'" />
                <tw-input :type="'text'" :name="'AgeReported'" class="w-20" :placeholder="'Alder'" />
                <tw-input :type="'text'" :name="'LokalitetID'" class="w-50" :placeholder="'Lokalitet'" />
                <tw-input :type="'text'" :name="'LicensNr'" class="w-40" :placeholder="'LicensNr'" />
                <tw-input :type="'text'" :name="'CatchingMethod'" class="w-35" :placeholder="'Fangstmetode'" />
                <tw-input :type="'text'" :name="'PlaceName'" class="w-30" :placeholder="'Præcis sted'" />
                <tw-input :type="'text'" :name="'ColorRing'" class="w-30" :placeholder="'Farvering'" />
                <tw-input :type="'text'" :name="'ColorRingNr'" class="w-30" :placeholder="'Farvering Nr'" />
                <tw-input :type="'text'" :name="'Status'" class="w-20" :placeholder="'Status'" />
                <tw-input :type="'text'" :name="'Sub-licensNr'" class="w-40" :placeholder="'Sub-licensNr'" />
                <tw-input :type="'text'" :name="'BroodSize'" class="w-30" :placeholder="'Kuld'" />
                <tw-input :type="'text'" :name="'PullusAge'" class="w-30" :placeholder="'Unge alder'" />
                <tw-input :type="'text'" :name="'CatchingLures'" class="w-30" :placeholder="'Lokkemetode'" />
                <tw-input :type="'text'" :name="'Mass'" class="w-20" :placeholder="'Vægt (g)'" />
                <tw-input :type="'text'" :name="'WingLength'" class="w-25" :placeholder="'Vinge (mm)'" />
                <tw-input :type="'text'" :name="'Remarks'" class="w-50" :placeholder="'Bemærkninger'" />
                <tw-input :type="'text'" :name="'BroodPatch'" class="w-30" :placeholder="'Brood Patch'" />
                <tw-input :type="'text'" :name="'project_Moult'" class="w-30" :placeholder="'Moult'" />
                <tw-input :type="'text'" :name="'FatScore'" class="w-20" :placeholder="'FatScore'" />
                <tw-input :type="'text'" :name="'FatScoreMethod'" class="w-35" :placeholder="'FatScoreMethod'" />
                <tw-input :type="'text'" :name="'project_HabitatType'" class="w-30" :placeholder="'HabitatType'" />
                <tw-input :type="'text'" :name="'project_TotalNetLength'" class="w-25" :placeholder="'NetLength'" />
                <tw-input :type="'text'" :name="'project_VisitPeriod'" class="w-25" :placeholder="'VisitPeriod'" />
                <tw-input :type="'text'" :name="'project_TimeStart'" class="w-30" :placeholder="'Start (tt:mm)'" />
                <tw-input :type="'text'" :name="'project_TimeEnd'" class="w-30" :placeholder="'End (tt:mm)'" />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';

const formularStore = useFormularStore();
//const { formularSkabelonFelterForAdministrator } = storeToRefs(formularStore)

onMounted(() => {
    //hideAndShow()
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
            // formularStore.formularSkabelonFelterForAdministrator.some((felt) => felt.feltNavn == element.name) ?
            //     element.classList.remove('skjul-felt') : element.classList.add('skjul-felt');
        }
    }
}

function getFormElementById(formId: string): HTMLElement | null {
    return document.getElementById(formId);
}

// watch(formularSkabelonFelterForAdministrator, () => {
//     hideAndShow();
// })
</script>