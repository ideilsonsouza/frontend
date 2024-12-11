import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';

import { authStored } from './store/auth';
import { settingsStored } from './store/settings';
import { changeTheme } from './utils/theme';

import langs from '@/utils/lang';
import { createI18n } from 'vue-i18n';
import Storer from './service/Storer';


const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);


const settings = settingsStored();

const i18n = createI18n({
    locale: Storer.get('locale') || import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: 'en',
    messages: langs,
});



app.use(i18n);

globalThis.$t = i18n.global.t;

if (settings.platform.auth) {
    const authManage = authStored();
    authManage.authVerify();
}

changeTheme();
app.mount('#app');

