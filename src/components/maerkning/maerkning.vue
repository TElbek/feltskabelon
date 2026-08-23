<template>
    <div>
        <form id="maerkningForm">
            <div class="flex flex-row flex-wrap mt-2 gap-2">
                <input type="text" name="data_type" class="w-20" placeholder="DataType">
                <input type="text" name="RingingScheme" class="w-20" placeholder="Scheme">
                <input type="text" name="IdentificationNumber" class="w-40" placeholder="RingNummer">
                <input type="text" name="euringDate" class="w-30" placeholder="åååå-mm-dd">
                <input type="text" name="euringTime" class="w-15" placeholder="tt:mm">
                <input type="text" name="SpeciesReported" class="w-50" placeholder="Art">
                <input type="text" name="SexReported" class="w-20" placeholder="Køn">
                <input type="text" name="AgeReported" class="w-20" placeholder="Alder">
                <input type="text" name="LokalitetID" class="w-50" placeholder="Lokalitet">
                <input type="text" name="LicensNr" class="w-40" placeholder="LicensNr">
                <input type="text" name="CatchingMethod" class="w-30" placeholder="Fangstmetode">
                <input type="text" name="PlaceName" class="w-30" placeholder="Præcis sted">
                <input type="text" name="ColorRing" class="w-30" placeholder="Farvering">
                <input type="text" name="ColorRingNr" class="w-30" placeholder="Farvering Nr">
                <input type="text" name="Status" class="w-20" placeholder="Status">
                <input type="text" name="Sub-licensNr" class="w-40" placeholder="Sub-licensNr">
                <input type="text" name="BroodSize" class="w-30" placeholder="Kuld">
                <input type="text" name="PullusAge" class="w-30" placeholder="Unge alder">
                <input type="text" name="CatchingLures" class="w-30" placeholder="Lokkemetode">
                <input type="text" name="Mass" class="w-20" placeholder="Vægt (g)">
                <input type="text" name="WingLength" class="w-25" placeholder="Vinge (mm)">
                <input type="text" name="Remarks" class="w-50" placeholder="Bemærkninger">
            </div>
            <div class="flex flex-row flex-wrap mt-2 gap-2">
                <span class="text-sm">Projekt Data:</span>
                <input type="text" name="BroodPatch" class="w-30" placeholder="Brood Patch">
                <input type="text" name="project_Moult" class="w-30" placeholder="Moult">
                <input type="text" name="FatScore" class="w-20" placeholder="FatScore">
                <input type="text" name="FatScoreMethod" class="w-35" placeholder="FatScoreMethod">
                <input type="text" name="project_HabitatType" class="w-30" placeholder="HabitatType">
                <input type="text" name="project_TotalNetLength" class="w-25" placeholder="NetLength">
                <input type="text" name="project_VisitPeriod" class="w-25" placeholder="VisitPeriod">
                <input type="text" name="project_TimeStart" class="w-25" placeholder="Start (tt:mm)">
                <input type="text" name="project_TimeEnd" class="w-25" placeholder="End (tt:mm)">
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useFormularStore } from '@/stores/formularStore';
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';

const formularStore = useFormularStore();
const { formularSkabelonFelterForAdministrator } = storeToRefs(formularStore)

onMounted(() => {
    hideAndShow()
});

function hideAndShow() :void {
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
            if (!formularStore.formularSkabelonFelterForAdministrator.some((felt) => felt.feltNavn == element.name)) {
                element.classList.add('skjul-felt');
            }
            else {
                element.classList.remove('skjul-felt');
            }
        }
    }
}

function getFormElementById(formId: string): HTMLElement | null {
    return document.getElementById(formId);
}

watch(formularSkabelonFelterForAdministrator, () => {
    hideAndShow();
})
</script>