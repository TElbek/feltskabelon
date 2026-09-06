<template>
    <div v-if="hasData">
        <div class="grid" :style="gridStyle">
            <div v-for="(property, index) in properties">
                <div class="border-gray-300 text-snhm border-b-2 border-t border-l px-2 capitalize">{{
                    property }}</div>
                <input type="text" v-model="state.filterValues[index]"
                    class="px-1 border-s text-sm border-b border-gray-300" placeholder="filter..." />
            </div>
            <template v-for="item in filteredRows">
                <div v-for="property in properties">
                    <div class=" border-gray-300 text-snhm border-b border-l px-2"
                        :class="[isNumeric(item[property]) ? 'text-end' : 'text-start']">
                        <span :class="[item[property] == undefined ? 'text-gray-400' : '']">
                            {{ item[property] != undefined ? item[property] : 'null' }}</span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';

interface dataGridProps {
    properties: any[],
    itemList: any[]
}

const props = defineProps<dataGridProps>();
const hasData = computed(() => props.properties && props.properties.length > 0);
const gridStyle = computed(() => {
    return {
        gridTemplateColumns: `repeat(${props.properties.length}, max-content)`
    };
});

const state = reactive({
    filterValues: props.properties.map(() => '')
});

const activeFilters = computed(() => props.properties
    .map((property, index) => ({
        property,
        value: state.filterValues[index]?.trim().toLowerCase() ?? ''
    }))
    .filter(filter => filter.value.length > 0)
);

const filteredRows = computed(() => {
    return props.itemList.filter(item => {
        return activeFilters.value.every(({ property, value }) => {
            return (typeof(item[property]) === 'string') && String(item[property] ?? '').toLowerCase().includes(value) ||
                   (typeof(item[property]) === 'number') && item[property ?? 0] === Number(value) ||
                   (typeof(item[property]) === 'boolean') && item[property] === Boolean(value)
        });
    });
});

function isNumeric(value: any): boolean {
    return typeof (value) == 'number';
}
</script>