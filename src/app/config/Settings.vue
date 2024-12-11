<script setup>
import { settingsStored } from "@/store/settings";
import { onMounted } from 'vue';
import PlatformConfig from './PlatformConfig.vue';

const settings = settingsStored();

onMounted(() => {

});

</script>

<template>
    <div>
        <PlatformConfig />
    </div>

</template>
