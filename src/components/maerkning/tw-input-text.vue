<template>
    <input type="text" :name="props.name"  :placeholder="props.placeholder"
        class="focus:outline-0 rounded border border-gray-300 focus:border-2 focus:border-snhm ps-2" />
</template>

<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    }
})
</script>