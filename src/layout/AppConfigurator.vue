<script setup>
import { useLayout } from '@/layout/composables/layout';
import { settingsStored } from '@/store/settings';
import { menuModeOptions, onMenuModeChange, onPresetChange, presetOptions, primaryColors, surfaces, updateColors } from '@/utils/theme';
import timeZones from '@/utils/timezones';
import { ref } from 'vue';

const { layoutConfig, isDarkTheme, toggleDarkMode } = useLayout();
const settings = settingsStored();

const menuMode = ref(layoutConfig.menuMode);
const preset = ref(layoutConfig.preset);
const country = ref(settings.country);
const timezone = ref(settings.timeZone)

function saveTheme() {
    if (layoutConfig) {
        settings.setTheme(layoutConfig);
    }
}

function resetTheme() {
    settings.resetTheme()
}



</script>

<template>

    <div
        class="config-panel hidden absolute top-[3.25rem] right-0 w-80
         p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]">
        <div class="flex flex-col gap-4">

            <div class="flex flex-col  gap-3 ">
                <div class="flex flex-row gap-2">
                    <i class="pi pi-language"></i>
                    <span class="text-sm text-muted-color font-semibold"> {{ $t('language') }}</span>
                </div>

                <Select :options="settings.countries" optionLabel="name" optionValue="code" v-model="country"
                    @change="settings.setCountry">

                    <!-- Template para exibir as opções no dropdown -->
                    <template #option="slotProps">
                        <div class="flex items-center">
                            <img :alt="slotProps.option.name"
                                :src="`https://flagcdn.com/w40/${slotProps.option.code.toLowerCase()}.png`" class="mr-2"
                                style="width: 18px; height: 12px;" />
                            {{ slotProps.option.name }}
                        </div>
                    </template>

                    <!-- Ícone do dropdown -->
                    <template #dropdownicon>
                        <img :src="`https://flagcdn.com/w40/${settings.country.toLowerCase()}.png`" class="mr-2"
                            style="width: 18px; height: 12px;" />
                    </template>
                </Select>


            </div>

            <div class="flex flex-col  gap-3 ">
                <div class="flex flex-row gap-2">
                    <i class="pi pi-clock"></i>
                    <span class="text-sm text-muted-color font-semibold"> {{ $t('timezone') }}</span>
                </div>
                <Select :options="timeZones" optionLabel="label" optionValue="tzCode" v-model="timezone"
                    @change="settings.setTimeZone" class="w-full text-sm">


                    <template #option="slotProps">
                        <div class="flex flex-col">
                            <span class="text-sm">{{ slotProps.option.label }}</span>
                            <span class="text-sm"> {{ slotProps.option.name }} </span>
                        </div>
                    </template>

                    <template #dropdownicon>
                        <i class="pi pi-clock" />
                    </template>

                </Select>
            </div>

            <hr>

            <div>
                <span class="text-sm text-muted-color font-semibold">{{ $t('primary_color') }}</span>
                <div class="pt-2 flex gap-2 flex-wrap justify-between">
                    <button v-for="primaryColor of primaryColors" :key="primaryColor.name" type="button"
                        :title="primaryColor.name" @click="updateColors('primary', primaryColor)"
                        :class="['border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1', { 'outline-primary': layoutConfig.primary === primaryColor.name }]"
                        :style="{ backgroundColor: `${primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor.palette['500']}` }"></button>
                </div>
            </div>
            <div>
                <span class="text-sm text-muted-color font-semibold">{{ $t('surface') }}</span>
                <div class="pt-2 flex gap-2 flex-wrap justify-between">
                    <button v-for="surface of surfaces" :key="surface.name" type="button" :title="surface.name"
                        @click="updateColors('surface', surface)" :class="[
                            'border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1',
                            { 'outline-primary': layoutConfig.surface ? layoutConfig.surface === surface.name : isDarkTheme ? surface.name === 'zinc' : surface.name === 'slate' }
                        ]" :style="{ backgroundColor: `${surface.palette['500']}` }"></button>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-sm text-muted-color font-semibold">{{ $t('borders') }}</span>
                <SelectButton v-model="preset" @change="onPresetChange(preset)" :options="presetOptions"
                    optionLabel="label" optionValue="value" :allowEmpty="false">

                    <template #option="slotProps">
                        {{ $t(slotProps.option.label) }}
                    </template>

                </SelectButton>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-sm text-muted-color font-semibold">{{ $t('menu') }}</span>
                <SelectButton v-model="menuMode" @change="onMenuModeChange(menuMode)" :options="menuModeOptions"
                    :allowEmpty="false" optionLabel="label" optionValue="value">

                    <template #option="slotProps">
                        {{ $t(slotProps.option.label) }}
                    </template>

                </SelectButton>
            </div>

            <Button :label="`${$t('theme')} - ${isDarkTheme ? $t('dark') : $t('light')}`" @click="toggleDarkMode()"
                :icon="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'" text rounded size="large" />

            <hr>
            <div class="flex justify-between ">
                <Button :label="$t('save')" icon="pi pi-save" size="small" text severity="success"
                    @click="saveTheme()" />
                <Button :label="$t('reset')" icon="pi pi-undo" size="small" text severity="warn"
                    @click="resetTheme()" />
            </div>
        </div>
    </div>
</template>
