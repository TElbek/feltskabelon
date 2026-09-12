<template>
    <tw-show-lg>
        <navigation-lg />
    </tw-show-lg>
    <tw-show-xl>
        <Navigation-xl />
    </tw-show-xl>
</template>

<script setup lang="ts">
import NavigationXl from '@/components/common/navigation/navigation-xl.vue';
import navigationLg from '@/components/common/navigation/navigation-lg.vue';
</script>