<template>
    <tw-show-md>
        <navigation-sm />
    </tw-show-md>
    <tw-show-lg>
        <navigation-lg />
    </tw-show-lg>
</template>

<script setup lang="ts">
import NavigationLg from '@/components/common/navigation/navigation-lg.vue';
import NavigationSm from '@/components/common/navigation/navigation-sm.vue';
</script>