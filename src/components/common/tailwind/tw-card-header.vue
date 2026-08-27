<template>
    <div class="flex justify-between text-[1.3rem] pb-0.5 font-semibold text-snhm">
        <span class="capitalize">{{ props.caption }}</span>
    </div>
</template>

<script setup lang="ts">
interface twCardHeaderProps {
    caption: string | number,
    count: number,
    showCount: boolean
}

const props = withDefaults(defineProps<twCardHeaderProps>(), {
    showCount: false,
    count: 0
});
</script>