<template>
    <div class="focus:outline-0 rounded border border-gray-300 focus:border-2 focus:border-snhm">
        <input type="checkbox" :name="name" @input="updateInputValue" :value="modelValue"
            class="h-3.5 w-3.5 mt-1 mb-1.5 mx-2" :checked="modelValue"/>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: false
})

defineProps({
    name: {
        type: String,
        required: true
    },
    modelValue: {
        type: Boolean,
        required: true
    }
})
const emit = defineEmits(['update:modelValue'])
function updateInputValue(event: Event) {
    const input = event.target as HTMLInputElement;
    emit('update:modelValue', input.checked);
}
</script>