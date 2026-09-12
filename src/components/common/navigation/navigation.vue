<template>
    <tw-show-lg>
        <navigation-md />
    </tw-show-lg>
    <tw-show-xl>
        <navigation-lg />
    </tw-show-xl>
</template>

<script setup lang="ts">
import NavigationLg from '@/components/common/navigation/navigation-xl.vue';
import navigationMd from '@/components/common/navigation/navigation-lg.vue';
</script>