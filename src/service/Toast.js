// toast.js
import { useToast } from 'primevue/usetoast';

let toast;

export const initializeToast = () => {
    toast = useToast();
};

export const MessageBox = (message, title, severity = 'warn', life = 8000) => {
    if (toast) {
        toast.add({ severity, summary: title, detail: message, group: 'headless', life: life, styleClass: 'backdrop-blur-lg rounded-2xl' });

    } else {
        console.warn('Toast não inicializado');
    }
}

export const MessageSuccess = (message, title = 'Êxito', life = 8000) => {
    MessageBox(message, title, 'success', life);
}
export const MessageWarn = (message, title = 'Atenção', life = 8000) => {
    MessageBox(message, title, 'secondary', life);
}
export const MessageError = (message, title = 'Menssagem de Error', life = 8000) => {
    MessageBox(message, title, 'error', life);
}
export const MessageInfo = (message, title = 'Informação', life = 8000) => {
    MessageBox(message, title, 'info', life);
}
