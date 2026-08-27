<template>
    <button type="button"
        :disabled="isSelected"
        class="text-sm text-snhm cursor-pointer"
        :class="[props.isSelected ? '': '']">
        <div class="text-start">
            <span v-if="props.isSelected" class="mr-1 inline">✓</span>
            <span>{{ props.caption }}</span>
        </div>
    </button>
</template>

<script lang="ts" setup>
interface TwButtonProps {
    isSelected: boolean;
    caption: string;
}

const props = defineProps<TwButtonProps>();
</script>