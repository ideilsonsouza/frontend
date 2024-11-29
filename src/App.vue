<script setup>
import { onMounted } from 'vue';
import { initializeToast } from './service/Toast';


onMounted(() => {
    initializeToast();
});

</script>

<template>
    <router-view />
</template>

<style scoped></style>
