<script setup>
import { useLayout } from '@/layout/composables/layout';
import { settingsStored } from '@/store/settings';
import { menuModeOptions, onMenuModeChange, onPresetChange, presetOptions, primaryColors, surfaces, updateColors } from '@/utils/theme';
import { ref } from 'vue';

const { layoutConfig, isDarkTheme } = useLayout();
const settings = settingsStored();

const menuMode = ref(layoutConfig.menuMode);
const preset = ref(layoutConfig.preset);


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
        class="config-panel hidden absolute top-[3.25rem] right-0 w-64 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]">
        <div class="flex flex-col gap-4">
            <div>
                <span class="text-sm text-muted-color font-semibold">Cor primária</span>
                <div class="pt-2 flex gap-2 flex-wrap justify-between">
                    <button v-for="primaryColor of primaryColors" :key="primaryColor.name" type="button"
                        :title="primaryColor.name" @click="updateColors('primary', primaryColor)"
                        :class="['border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1', { 'outline-primary': layoutConfig.primary === primaryColor.name }]"
                        :style="{ backgroundColor: `${primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor.palette['500']}` }"></button>
                </div>
            </div>
            <div>
                <span class="text-sm text-muted-color font-semibold">Tonalidade da Superfície</span>
                <div class="pt-2 flex gap-2 flex-wrap justify-between">
                    <button v-for="surface of surfaces" :key="surface.name" type="button" :title="surface.name"
                        @click="updateColors('surface', surface)" :class="[
                            'border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1',
                            { 'outline-primary': layoutConfig.surface ? layoutConfig.surface === surface.name : isDarkTheme ? surface.name === 'zinc' : surface.name === 'slate' }
                        ]" :style="{ backgroundColor: `${surface.palette['500']}` }"></button>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-sm text-muted-color font-semibold">Bordas</span>
                <SelectButton v-model="preset" @change="onPresetChange(preset)" :options="presetOptions"
                    optionLabel="label" optionValue="value" :allowEmpty="false" />
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-sm text-muted-color font-semibold">Menu</span>
                <SelectButton v-model="menuMode" @change="onMenuModeChange(menuMode)" :options="menuModeOptions"
                    :allowEmpty="false" optionLabel="label" optionValue="value" />
            </div>
            <hr>
            <div class="flex justify-between ">
                <Button label="Salva" icon="pi pi-save" size="small" text severity="success" @click="saveTheme()" />
                <Button label="Resetar" icon="pi pi-undo" size="small" text severity="warn" @click="resetTheme()" />
            </div>
        </div>
    </div>
</template>
