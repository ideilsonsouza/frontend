import { DefaultTheme } from "@/config";
import Storer from "@/service/Storer";
import { MessageError, MessageSuccess } from "@/service/Toast";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const settingsStored = defineStore('settings', (i18n) => {

    const state = reactive({
        platform: ref({
            name: '',
            auth: false,
            silderbar: [],
        }),
        countries: ref([
            { name: 'Português (Brasil)', code: 'BR', locale: 'pt-BR' },
            { name: 'English', code: 'US', locale: 'en' },
        ]),
        theme: Storer.json('theme') || DefaultTheme,
        timeZone: Storer.get('timezone') || import.meta.env.VITE_DEFAULT_TIMEZONE,
        locale: Storer.get('locale') || import.meta.env.VITE_DEFAULT_LOCALE,
        country: Storer.get('country') || import.meta.env.VITE_DEFAULT_COUNTRY,
        backend: import.meta.env.VITE_DEFAULT_BACKEND || 'http://localhost:8000/api',
        remember: Storer.json('user_remember', null, true) || null,
    });

    function defaultPlatform() {
        try {

            state.platform.name = 'Zabe mineração';
            state.platform.auth = false;
            state.platform.silderbar = [
                {
                    label: 'Sistema', icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Pedreira guapo', icon: 'pi pi-th-large ', items: [
                                { label: 'Areas', icon: 'pi pi-fw pi-wrench', to: '/' },
                            ]
                        },
                    ]
                },
            ];
        } catch (error) {
            console.warn(`Falha ao carregar plataforma: ${error}`);
        }
    }

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

    function setTimeZone(newTimeZone) {
        if (newTimeZone.value) {
            Storer.set('timezone', newTimeZone.value);
            state.timeZone = newTimeZone.value;
        }

    };

    function setLocale(newLocale) {
        if (newLocale) {
            if (newLocale !== state.locale) {
                Storer.set('locale', newLocale);
                window.location.reload();
            }
        }
    }

    function setCountry(newCountry) {
        if (newCountry.value) {
            // Salva o código do país
            Storer.set('country', newCountry.value);

            // Procura na lista de países e aplica o locale correspondente
            const selectedCountry = state.countries.find(
                (country) => country.code.toLowerCase() === newCountry.value.toLowerCase()
            );

            if (selectedCountry) {
                setLocale(selectedCountry.locale);
            } else {
                console.warn(`País com código ${newCountry.value} não encontrado na lista.`);
            }
        }
    }

    function setBackend(backend) { };

    function saveSettings() { };

    function loadSettings() { };


    const theme = computed(() => state.theme);
    const timeZone = computed(() => state.timeZone);
    const locale = computed(() => state.locale);
    const backend = computed(() => state.backend);
    const remember = computed(() => state.remember);
    const platform = computed(() => state.platform);
    const countries = computed(() => state.countries);
    const country = computed(() => state.country);

    defaultPlatform()

    return {
        theme,
        timeZone,
        locale,
        backend,
        platform,
        remember,
        countries,
        country,
        setTheme,
        resetTheme,
        setTimeZone,
        setLocale,
        setCountry,
        setBackend,
    };

});