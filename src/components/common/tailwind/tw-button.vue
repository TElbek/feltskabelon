<template>
    <button type="button"
        class="focus:outline-2 focus:outline-snhm text-sm text-snhm cursor-pointer border border-gray-300 rounded min-w-15 p-1"
        @click="clicked">
        <span>{{ props.caption }}</span>
    </button>
</template>

<script lang="ts" setup>
interface TwButtonProps {
    caption: string;
}

const emit = defineEmits(['clicked']);
const props = defineProps<TwButtonProps>();

function clicked() {
    emit('clicked');
}
</script>