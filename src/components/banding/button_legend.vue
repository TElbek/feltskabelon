<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div class="flex flex-col gap-2">
            <div class="flex gap-2">
                <new_blank_20pxb></new_blank_20pxb>
                <span class="text-sm text-gray-500">Opret tom formular</span>
            </div>
            <div class="flex gap-2">
                <new_duplicate_20px></new_duplicate_20px>
                <span class="text-sm text-gray-500">Opret kopi af denne formular</span>
            </div>
            <div class="flex gap-2">
                <new_duplicate_more_20px></new_duplicate_more_20px>
                <span class="text-sm text-gray-500">Opret ønskede antal kopier af denne formular</span>
            </div>
            <div class="flex gap-2">
                <delete_red_20px></delete_red_20px>
                <span class="text-sm text-gray-500">Slet post</span>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex gap-2">
                <validitet_roed_20px></validitet_roed_20px>
                <span class="text-sm text-gray-500">Indtastning er mangelfuld</span>
            </div>
            <div class="flex gap-2">
                <validitet_gul_20px></validitet_gul_20px>
                <span class="text-sm text-gray-500">Indtastning kan være mangelfuld</span>
            </div>
            <div class="flex gap-2">
                <validitet_groen_20px></validitet_groen_20px>
                <span class="text-sm text-gray-500">Indtastning er korrekt</span>
            </div>
            <div class="flex gap-2">
                <data_type_m></data_type_m>
                <span class="text-sm text-gray-500">Mærkningsdata</span>
            </div>
            <div class="flex gap-2">
                <data_type_g></data_type_g>
                <span class="text-sm text-gray-500">Aflæsninger / Genmeldinger</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import delete_red_20px from './icons/delete_red_20px.vue'
import new_blank_20pxb from './icons/new_blank_20pxb.vue'
import new_duplicate_20px from './icons/new_duplicate_20px.vue'
import new_duplicate_more_20px from './icons/new_duplicate_more_20px.vue'
import validitet_roed_20px from './icons/validitet_roed_20px.vue'
import validitet_gul_20px from './icons/validitet_gul_20px.vue'
import validitet_groen_20px from './icons/validitet_groen_20px.vue'

import data_type_m from './icons/data_type_m.vue'
import data_type_g from './icons/data_type_g.vue'
</script>