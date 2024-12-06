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


const app = createApp(App);

app.use(router);
app.use(createPinia());
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

if (settings.platform.auth) {
    const authManage = authStored();
    (async () => {
        try {
            await authManage.authVerify();
        } catch (error) {
            authStored.goLogin();
        }
    })()
}

changeTheme();
app.mount('#app');
