<template>
    <select
        class="px-2 focus:outline-2 rounded border border-gray-300 h-7 w-full focus:outline-snhm"
        @input="updateInputValue" :value="modelValue">
        <slot></slot>
    </select>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: false
})

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    modelValue: {
        type: [String, null, Number],
        default: '',
        required: true
    }
})
const emit = defineEmits(['update:modelValue'])
function updateInputValue(event: Event) {
    const input = event.target as HTMLInputElement;
    emit('update:modelValue', Number(input.value) );
}
</script>