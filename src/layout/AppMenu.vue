<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

import { settingsStored } from "@/store/settings";

const settings = settingsStored();

const silderbar = ref([
    {
        label: `${settings.platform.name}`, icon: 'pi pi-home',
        items: [
            {
                label: $t('application'), icon: 'pi pi-th-large ', items: [
                    { label: $t('settings'), icon: 'pi pi-fw pi-wrench', to: '/platform/settings' },
                ]
            },
        ]
    },
    ...settings.platform.silderbar,
]);

</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in silderbar" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
