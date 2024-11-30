import { DefaultTheme } from "@/config";
import Storer from "@/service/Storer";
import { MessageError, MessageSuccess } from "@/service/Toast";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const settingsStored = defineStore('settings', () => {

    const state = reactive({
        theme: Storer.json('theme') || DefaultTheme,
        timeZone: import.meta.VITE_DEFAULT_TIMEZONE || 'America/Sao_Paulo',
        locale: import.meta.VITE_DEFAULT_LOCALE || 'pt-BR',
        backend: import.meta.VITE_DEFAULT_BACKEND || 'http://localhost:8000/api',
    });

    function setTheme(theme) {
        try {
            if (theme) {
                Storer.json('theme', theme);
                MessageSuccess('O Tema aplicado foi salvo com sucesso!')
            }
        } catch (error) {
            MessageError('Falha ao salvar o thema aplicado')
        }

    };

    function resetTheme() {
        try {
            Storer.delete('theme');
            MessageSuccess('Tema resetado com sucesso')

        } catch (error) {
            MessageError('ERRO: Não foi possivel resetar o thema')
        }
    }

    function setTimeZone(timeZone) { };

    function setLocale(locale) { };

    function setBackend(backend) { };

    function saveSettings() { };

    function loadSettings() { };

    loadSettings();


    const theme = computed(() => state.theme);
    const timeZone = computed(() => state.timeZone);
    const locale = computed(() => state.locale);
    const backend = computed(() => state.backend);

    return {
        theme,
        timeZone,
        locale,
        backend,
        setTheme,
        resetTheme,
        setTimeZone,
        setLocale,
        setBackend,
    };

});