<template>
    <div v-if="hasData">
        <div class="grid" :class="colsCountClass">
            <div v-for="property in properties">
                <div class="border-gray-300 text-snhm border-b-2 border-t border-l px-2 capitalize">{{
                    property }}</div>
            </div>
            <template v-for="item in itemList">
                <div v-for="property in properties">
                    <div class=" border-gray-300 text-snhm border-b border-l px-2">
                        <span :class="[item[property] == undefined ? 'text-gray-400' : '']">
                            {{ item[property] != undefined ? item[property] : 'null' }}</span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface dataGridProps {
    properties: any[],
    itemList: any[]
}

const props = defineProps<dataGridProps>();

const hasData = computed(() => props.properties && props.properties.length > 0);

const colsCountClass = computed(() => {
    return "grid-cols-[repeat(" + props.properties.length + ",max-content)]"
});
</script>