<template>
    <input :type="type" :name="name" @input="updateInputValue" :value="modelValue" :placeholder="placeholder"
        class="px-2 focus:outline-2 focus:outline-snhm rounded border border-gray-300 " :class="props.class" />
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
    type: {
        type: String,
        default: 'text'
    },
    modelValue: {
        type: [String, Number, Date, Boolean],
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    class: {
        type: String
    }
});

const emit = defineEmits(['update:modelValue'])

function updateInputValue(event: Event) {
    const input = event.target as HTMLInputElement;
    emit('update:modelValue', input.value);
}
</script>