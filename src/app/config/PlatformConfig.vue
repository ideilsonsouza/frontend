<script setup>
import { settingsStored } from '@/store/settings';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { iconsList } from './icons';

const router = useRouter();

const settings = settingsStored();
const platform = computed(() => settings.platform);
const silderbar = computed(() => settings.platform.silderbar);

const selectedSessions = ref();
const selectedItems = ref();
const onOpemDialog = ref(false);
const icons = ref([]);
const selectedIcon = ref('');

function onSelectedSessions(event) {
    selectedSessions.value = event.data.items;
}
function onSelectedItems(event) {
    if (event.data) {
        onOpemDialog.value = true;
        selectedItems.value = event.data;
    }
}

const getRouteNameFromUrl = (url) => {
    // Acessa a instância do Vue Router
    const route = router.getRoutes().find(r => r.path === url); // Busca a rota correspondente ao path
    return route?.name || url; // Retorna o nome ou a URL
};

const routesOptions = ref(
    router.getRoutes()
        .filter(route => route.name) // Considera apenas rotas com nome
        .map(route => ({
            label: route.name || "Sem Nome", // Nome da rota
            value: route.path, // Caminho da rota
        }))
);

const getPrimeIcons = () => {
    const iconList = [];
    for (const sheet of document.styleSheets) {
        try {
            for (const rule of sheet.cssRules) {
                if (rule.selectorText?.startsWith('.pi-') && rule.selectorText.includes(':before')) {
                    const iconName = rule.selectorText.split(':')[0].replace('.', '');
                    iconList.push({ label: iconName.replace('pi-', ''), value: iconName });
                }
            }
        } catch (e) {
            // Ignora erros de acesso a CSS cross-origin
        }
    }
    return iconList;
};

onMounted(() => {
    icons.value = getPrimeIcons(); // Pega os ícones quando o componente monta
});
</script>

<template>
    <div class="p-6  min-h-screen">
        <h2 class="text-2xl font-bold mb-4">Gerenciador de Itens</h2>
        <DataTable :value="silderbar" selectionMode="single" @rowSelect="onSelectedSessions">
            <Column field="label" header="Raiz"></Column>
            <Column>
                <template #body="slotProps">
                    <div class="flex">
                        <Button icon="pi pi-pencil" rounded text />
                    </div>
                </template>
            </Column>
        </DataTable>


        <div v-if="selectedSessions" class="flex">

            <!-- Tabela com PrimeVue -->
            <DataTable :value="selectedSessions" selectionMode="single" @rowSelect="onSelectedItems">
                <!-- Coluna Nome -->
                <Column header="Nome" field="label"></Column>

                <!-- Coluna Ícone -->
                <Column header="Ícone" field="icon">
                    <template #body="slotProps">
                        <i :class="slotProps.data.icon" </i>
                    </template>
                </Column>

                <!-- Coluna Rota -->
                <Column header="Rota" field="to">
                    <template #body="slotProps">
                        {{ getRouteNameFromUrl(slotProps.data.to) }}
                    </template>
                </Column>

                <!-- Coluna Ações -->
                <Column header="Ações">
                    <template #body="slotProps">
                        <Button icon="pi pi-trash" class="p-button-danger" tooltip="Remover" />
                    </template>
                </Column>
            </DataTable>

        </div>

        <!-- Botão Adicionar -->
        <Button label="Adicionar Item" icon="pi pi-plus" class="p-button-success" @click="addItem" />
    </div>


    <Dialog v-model:visible="onOpemDialog" modal :style="{ width: 'auto' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Configurações do {{ selectedItems.label
            }}</span>


        <DataTable :value="selectedItems.items" selectionMode="single">
            <Column field="label" header="Raiz">
                <template #body="slotProps">
                    <div class="flex">
                        <InputText v-model="slotProps.data.label" class="w-96" />
                    </div>
                </template>
            </Column>
            <Column field="icon" header="Icone">
                <template #body="{ data }">

                    <Select v-model="data.icon" :options="iconsList" filter optionLabel="label" optionValue="value"
                        placeholder="Selecione um ícone" class="w-auto">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex items-center">
                                <i :class="slotProps.value" class="mr-2"></i>
                                <span>{{ slotProps.value.label }}</span>
                            </div>
                            <span v-else>
                                Selecione um ícone
                            </span>
                        </template>

                        <template #option="slotProps">
                            <div class="flex items-center justify-between">
                                <i :class="slotProps.option.value" class="mr-2"></i>
                                <span>{{ slotProps.option.label }}</span>
                            </div>
                        </template>
                    </Select>


                </template>
            </Column>

            <Column field="to" header="Destino">

                <template #body="{ data }">

                    <Select v-model="data.to" :options="routesOptions" optionLabel="label" optionValue="value"
                        placeholder="" class="w-full md:w-56">

                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex items-center">
                                <span>{{ slotProps.value }}</span>
                            </div>
                            <span v-else>
                                Escolha uma rota
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex items-center">
                                <span>{{ slotProps.option.label }}</span>
                            </div>
                        </template>
                    </Select>
                </template>

            </Column>

            <Column>
                <template #body="slotProps">
                    <div class="flex">
                        <Button icon="pi pi-pencil" rounded text />
                    </div>
                </template>
            </Column>
        </DataTable>

        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="onOpemDialog = false"></Button>
            <Button type="button" label="Save" @click="onOpemDialog = false"></Button>
        </div>
    </Dialog>

</template>

<style scoped></style>
