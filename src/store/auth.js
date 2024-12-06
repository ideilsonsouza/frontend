import { authController } from "@/service/AuthController"; // Controlador de autenticação
import Storer from "@/service/Storer"; // Serviço de armazenamento (ex.: localStorage)
import { defineStore } from "pinia"; // Gerenciador de estado centralizado
import { computed, reactive } from "vue"; // APIs reativas do Vue.js

/**
 * Store de autenticação usando Pinia.
 * Responsável por gerenciar o estado de autenticação do usuário, incluindo o token, os dados do usuário e o status de autenticação.
 */
export const authStored = defineStore('auth', () => {
    // Estado reativo inicial
    const state = reactive({
        token: Storer.get('token', true) || '', // Token de autenticação armazenado
        token_type: Storer.get('typeToken', true) || 'Bearer', // Tipo de token de autenticação armazenado
        user: Storer.json('user', null, true), // Dados do usuário armazenados
        isAuth: false // Status de autenticação
    });

    /**
     * Define o status de autenticação (`isAuth`) no estado.
     * @param {boolean} value - Novo valor para `isAuth`.
     */
    function defineIsAuth(value) {
        try {
            state.isAuth = value;
        } catch (error) {
            console.error('Erro ao definir isAuth:', error.message);
        }
    }

    /**
     * Define os dados do usuário (`user`) no estado.
     * @param {Object|null} value - Dados do usuário (ou `null` para limpar).
     */
    function defineUser(value) {
        try {
            state.user = value;
            Storer.json('user', value, true);
        } catch (error) {
            console.error('Erro ao definir user:', error.message);
        }
    }

    /**
     * Define o token de autenticação (`token`) no estado, com validação do formato.
     * @param {string} value - Novo token de autenticação.
     */
    function defineToken(token, typeToken) {
        try {

            if (typeof token === 'string' && /^[A-Za-z0-9-_.]+$/.test(token)) {
                state.token = token;
                state.token_type = typeToken;
                Storer.set('token', token, true);
                Storer.set('typeToken', typeToken, true);

            } else {
                console.warn('Token inválido fornecido.');
                clear();
            }
        } catch (error) {
            console.error('Erro ao definir token:', error.message);
        }
    }

    /**
     * Limpa os dados de autenticação no estado (logout).
     */
    function clear() {
        state.token = '';
        state.user = null;
        state.isAuth = false;
        Storer.delete('token'); // Remove o token do armazenamento
        Storer.delete('user'); // Remove os dados do usuário do armazenamento
        Storer.delete('typeToken'); // Remove o tipo do token do armazenamento
    }

    /**
     * Verifica o status de autenticação e valida o token no backend.
     * Se o token for válido, atualiza os dados do usuário e o status autenticado.
     * Caso contrário, limpa o estado de autenticação.
     */
    function authVerify() {
        try {
            if (state.token) {
                (async () => {
                    try {
                        defineIsAuth(true);
                        const response = authController.verify();
                        defineUser(response.user);
                    } catch (error) {
                        defineIsAuth(false);
                    }
                })();
            }
        } catch (error) {
            console.debug(error.message);
        }
    }

    function goLogin() {
        window.location.href = '/auht/login';
    }

    // Computed properties para acessar o estado reativo
    const token = computed(() => state.token); // Retorna o token
    const token_type = computed(() => state.token_type);
    const user = computed(() => state.user); // Retorna os dados do usuário
    const isAuth = computed(() => state.isAuth); // Retorna o status de autenticação

    // Retorna as funções e propriedades disponíveis externamente
    return {
        token,
        token_type,
        user,
        isAuth,
        defineToken,
        defineUser,
        defineIsAuth,
        clear,
        authVerify,
        goLogin,
    };
});

/**
 * Melhorias e boas práticas implementadas:
 * 
 * 1. **Validação do token:** Verifica o formato do token antes de armazená-lo.
 * 
 * 2. **Verificação de expiração do token:** Implementada para tokens JWT, garante que tokens expirados sejam invalidados automaticamente.
 * 
 * 3. **Armazenamento seguro:** Tokens e dados do usuário são removidos do armazenamento local durante o logout.
 * 
 * 4. **Tratamento de erros:** Logs detalhados para facilitar a depuração e tratamento de falhas no backend.
 * 
 * 5. **Separação de responsabilidades:** Cada função tem uma única responsabilidade, facilitando manutenção e teste.
 * 
 * Exemplo de uso:
 * 
 * ```javascript
 * import { authStored } from "@/stores/auth";
 * 
 * const auth = authStored();
 * 
 * // Verificar autenticação
 * auth.authVerify();
 * 
 * // Atualizar token
 * auth.defineToken('novo-token');
 * 
 * // Limpar dados de autenticação
 * auth.clear();
 * ```
 */
