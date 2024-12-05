// toast.js
import { useToast } from 'primevue/usetoast'; // Importa o hook useToast do PrimeVue para gerenciar notificações

let toast; // Variável que armazenará a instância do toast

/**
 * Função para inicializar o toast, garantindo que ele esteja disponível
 * para ser usado nas outras funções.
 * Deve ser chamada antes de qualquer outra função que utilize o toast.
 */
export const initializeToast = () => {
    toast = useToast(); // Inicializa a instância do toast
};

/**
 * Função genérica para exibir uma mensagem toast personalizada com severidade,
 * título, mensagem e duração.
 * 
 * @param {string} message - A mensagem detalhada que será exibida no toast.
 * @param {string} title - O título ou resumo da mensagem.
 * @param {string} severity - A severidade da mensagem. Pode ser 'success', 'warn', 'error', 'info', etc.
 * @param {number} life - A duração da mensagem em milissegundos (padrão: 8000).
 */
export const MessageBox = (message, title, severity = 'warn', life = 8000) => {
    if (toast) {
        // Verifica se o toast foi inicializado antes de tentar adicionar a mensagem
        toast.add({
            severity, // Tipo de severidade da mensagem (ex: 'warn', 'success', 'error', 'info')
            summary: title, // O título da mensagem
            detail: message, // O conteúdo detalhado da mensagem
            group: 'headless', // Identifica o grupo de mensagens, utilizado para agrupamento (opcional)
            life: life, // Tempo de exibição do toast, em milissegundos
            styleClass: 'backdrop-blur-lg rounded-2xl' // Estilos CSS personalizados para o toast
        });
    } else {
        console.warn('Toast não inicializado'); // Exibe um aviso no console se o toast não foi inicializado
    }
}

/**
 * Função para exibir uma mensagem de sucesso.
 * Utiliza a função MessageBox, mas com severidade 'success' e título 'Êxito' por padrão.
 * 
 * @param {string} message - A mensagem detalhada que será exibida no toast.
 * @param {string} title - O título (opcional, padrão é 'Êxito').
 * @param {number} life - A duração da mensagem em milissegundos (opcional, padrão é 8000).
 */
export const MessageSuccess = (message, title = 'Êxito', life = 8000) => {
    // Chama a função MessageBox com severidade 'success'
    MessageBox(message, title, 'success', life);
}

/**
 * Função para exibir uma mensagem de alerta/aviso.
 * Utiliza a função MessageBox, mas com severidade 'secondary' (ou 'warn') e título 'Atenção' por padrão.
 * 
 * @param {string} message - A mensagem detalhada que será exibida no toast.
 * @param {string} title - O título (opcional, padrão é 'Atenção').
 * @param {number} life - A duração da mensagem em milissegundos (opcional, padrão é 8000).
 */
export const MessageWarn = (message, title = 'Atenção', life = 8000) => {
    // Chama a função MessageBox com severidade 'warn'
    MessageBox(message, title, 'secondary', life);
}

/**
 * Função para exibir uma mensagem de erro.
 * Utiliza a função MessageBox, mas com severidade 'error' e título 'Mensagem de Error' por padrão.
 * 
 * @param {string} message - A mensagem detalhada que será exibida no toast.
 * @param {string} title - O título (opcional, padrão é 'Mensagem de Error').
 * @param {number} life - A duração da mensagem em milissegundos (opcional, padrão é 8000).
 */
export const MessageError = (message, title = 'Mensagem de Error', life = 8000) => {
    // Chama a função MessageBox com severidade 'error'
    MessageBox(message, title, 'error', life);
}

/**
 * Função para exibir uma mensagem de informação.
 * Utiliza a função MessageBox, mas com severidade 'info' e título 'Informação' por padrão.
 * 
 * @param {string} message - A mensagem detalhada que será exibida no toast.
 * @param {string} title - O título (opcional, padrão é 'Informação').
 * @param {number} life - A duração da mensagem em milissegundos (opcional, padrão é 8000).
 */
export const MessageInfo = (message, title = 'Informação', life = 8000) => {
    // Chama a função MessageBox com severidade 'info'
    MessageBox(message, title, 'info', life);
}

/**
 * NOTA IMPORTANTE: 
 * Para que o toast funcione corretamente, é necessário configurar o componente Toast 
 * do PrimeVue no seu arquivo de layout ou componente principal, por exemplo:
 * 
 * <template>
 *   <Toast group="headless" />
 * </template>
 * 
 * Além disso, a função `initializeToast()` deve ser chamada antes de exibir qualquer mensagem
 * toast, para garantir que o `useToast` tenha sido corretamente inicializado.
 * 
 * Exemplo de uso:
 * 
 * // main.js ou equivalente
 * import { initializeToast, MessageSuccess, MessageError } from './toast';
 * 
 * initializeToast(); // Inicializa o toast
 * 
 * MessageSuccess('Tudo pronto!', 'Êxito');
 * MessageError('Falha ao carregar os dados!', 'Erro');
 */
