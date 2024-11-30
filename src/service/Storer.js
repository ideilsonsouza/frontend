import { Cryptor } from './Encryption';

/**
 * Classe utilitária para manipulação de dados no localStorage.
 * Oferece suporte a operações como salvar, recuperar e excluir,
 * além de suporte para criptografia e armazenamento de objetos JSON.
 */
export default class Storer {
    /**
     * Verifica se o localStorage está disponível no ambiente.
     * @returns {boolean} True se localStorage estiver disponível, caso contrário, False.
     */
    static isLocalStorageAvailable() {
        try {
            const test = '__test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Lança uma exceção com uma mensagem formatada.
     * @param {string} message Mensagem de erro principal.
     * @param {Error} error Objeto de erro capturado.
     */
    static handleError(message, error) {
        throw new Error(`${message}: ${error.message}`);
    }

    /**
     * Registra uma operação no console.
     * @param {string} action Nome da ação (SET, GET, DELETE).
     * @param {string} key Chave associada à operação.
     * @param {*} [value=null] Valor da operação (opcional).
     */
    static logOperation(action, key, value = null) {
        console.log(`[Storer] ${action}: ${key}`, value ? `Valor: ${value}` : '');
    }

    /**
     * Salva um valor no localStorage.
     * Suporta criptografia opcional para proteger o valor.
     * @param {string} key Chave para o item a ser salvo.
     * @param {*} value Valor a ser salvo.
     * @param {boolean} [crypted=false] Indica se o valor deve ser criptografado.
     */
    static set(key, value, crypted = false) {
        try {
            if (!this.isLocalStorageAvailable()) {
                throw new Error('localStorage não está disponível neste ambiente.');
            }
            if (typeof key !== 'string' || key.trim() === '') {
                throw new Error('A chave deve ser uma string válida.');
            }
            if (value === undefined) {
                throw new Error('O valor não pode ser indefinido.');
            }

            const currentValue = localStorage.getItem(key);
            const newValue = crypted ? Cryptor.encrypt(value) : value;

            // Apenas salva se o valor for diferente
            if (currentValue !== newValue) {
                localStorage.setItem(key, newValue);
                this.logOperation('SET', key, newValue);
            }
        } catch (error) {
            this.handleError('Falha ao tentar salvar o item', error);
        }
    }

    /**
     * Recupera um valor do localStorage.
     * Descriptografa automaticamente se indicado.
     * @param {string} key Chave do item a ser recuperado.
     * @param {boolean} [crypted=false] Indica se o valor é criptografado.
     * @returns {*} O valor recuperado (descriptografado, se aplicável).
     */
    static get(key, crypted = false) {
        try {
            if (!this.isLocalStorageAvailable()) {
                throw new Error('localStorage não está disponível neste ambiente.');
            }
            if (typeof key !== 'string' || key.trim() === '') {
                throw new Error('A chave deve ser uma string válida.');
            }

            const variable = localStorage.getItem(key);
            return crypted ? Cryptor.decrypt(variable) : variable;
        } catch (error) {
            this.handleError('Falha ao tentar recuperar o item', error);
        }
    }

    /**
     * Exclui um item do localStorage.
     * @param {string} key Chave do item a ser excluído.
     */
    static delete(key) {
        try {
            if (!this.isLocalStorageAvailable()) {
                throw new Error('localStorage não está disponível neste ambiente.');
            }
            if (typeof key !== 'string' || key.trim() === '') {
                throw new Error('A chave deve ser uma string válida.');
            }

            localStorage.removeItem(key);
            this.logOperation('DELETE', key);
        } catch (error) {
            this.handleError('Falha ao tentar excluir o item', error);
        }
    }

    /**
     * Manipula dados JSON no localStorage.
     * Se `value` for fornecido, o método salva o JSON.
     * Caso contrário, tenta recuperar e analisar o JSON salvo.
     * @param {string} key Chave do item JSON.
     * @param {*} [value=null] Valor a ser salvo (ou null para recuperar).
     * @param {boolean} [crypted=false] Indica se o valor deve ser criptografado.
     * @returns {*} O objeto JSON recuperado ou `null` se não encontrado.
     */
    static json(key, value = null, crypted = false) {
        if (key && value) {
            // Salvar JSON
            try {
                const serialized = JSON.stringify(value);
                this.set(key, serialized, crypted);
            } catch (error) {
                this.handleError('Falha ao tentar serializar ou salvar JSON', error);
            }
        } else if (key && !value) {
            // Recuperar JSON
            try {
                const variable = this.get(key, crypted);
                return variable ? JSON.parse(variable) : null;
            } catch (error) {
                this.handleError('Falha ao tentar recuperar ou analisar JSON', error);
            }
        }
    }
}
