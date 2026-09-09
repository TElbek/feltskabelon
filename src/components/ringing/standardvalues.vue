<template>
    <form>
        <div class="flex flex-wrap flex-row gap-2">
            <tw-input :type="'text'" :name="'RingingScheme'" :placeholder="'Scheme'" />
            <tw-input :type="'text'" :name="'euringDate'" class="text-center" :placeholder="'åååå-mm-dd'" />
            <tw-input :type="'text'" :name="'euringTime'" class="text-center" :placeholder="'tt:mm'" />
            <tw-input :type="'text'" :name="'LokalitetID'" :placeholder="'Lokalitet'" />
            <tw-input :type="'text'" :name="'PlaceName'" :placeholder="'Præcis sted'" />
            <tw-input :type="'number'" :name="'LicensNr'" class="text-end" :placeholder="'LicensNr'" />
            <tw-input :type="'number'" :name="'Sub-licensNr'" class="text-end" :placeholder="'Sub-licensNr'" />
            <tw-input :type="'text'" :name="'CatchingMethod'" :placeholder="'Fangstmetode'" />
        </div>
    </form>
</template>

<style scoped>
input {
    field-sizing: content;
    padding-left: 5px;
    padding-right: 5px;
}
</style>