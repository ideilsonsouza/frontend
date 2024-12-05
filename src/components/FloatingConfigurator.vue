<script setup>
import AppConfigurator from '@/layout/AppConfigurator.vue';
import { useLayout } from '@/layout/composables/layout';
const { toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="fixed flex gap-4 top-8 right-8">
        <Button type="button" @click="toggleDarkMode" rounded :icon="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'"
            severity="secondary" />
        <div class="relative">
            <Button icon="pi pi-palette"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                type="button" rounded />
            <AppConfigurator />
        </div>
    </div>
    <Toast position="bottom-left" group="bl" />
    <Toast position="top-center" group="top-center" />

    <div class="flex justify-center">
        <Toast position="top-center" group="headless" @close="visible = false">
            <template #container="{ message, closeCallback }">
                <section class="flex flex-col p-4 gap-4 w-full  rounded-xl">
                    <div class="flex items-center gap-5">
                        <span class="font-bold text-base ">{{ message.summary }}</span>
                    </div>
                    <div class="flex flex-col gap-2">
                        {{ message.detail }}
                    </div>

                </section>
            </template>
        </Toast>
    </div>
</template>
