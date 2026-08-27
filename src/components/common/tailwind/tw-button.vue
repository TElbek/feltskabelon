<template>
    <button type="button"
        class="focus:border-2 focus:border-snhm focus:outline-0 text-sm text-snhm cursor-pointer border border-snhm rounded p-2"
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