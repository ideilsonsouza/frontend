import CryptoJS from 'crypto-es';

/**
 * Classe utilitária para criptografia AES usando CryptoJS.
 * Permite a encriptação e decriptação de strings com suporte a configuração dinâmica de chave secreta.
 */
export const Cryptor = {
    /**
     * Retorna a chave secreta usada para encriptação/desencriptação.
     * @returns {string} Chave secreta (deve ser personalizada para produção).
     */
    getKey() {
        return process.env.CRYPTOR_SECRET_KEY || 'my_key_secret'; // Use variáveis de ambiente para maior segurança
    },

    /**
     * Encripta uma string usando AES.
     * @param {string} plaintext Texto simples que será encriptado.
     * @returns {string} String encriptada.
     * @throws {Error} Lança erro em caso de falha.
     */
    encrypt(plaintext) {
        try {
            if (typeof plaintext !== 'string' || plaintext.trim() === '') {
                throw new Error('O texto a ser encriptado deve ser uma string não vazia.');
            }
            const encrypted = CryptoJS.AES.encrypt(plaintext, this.getKey()).toString();
            return encrypted;
        } catch (error) {
            throw new Error(`ERRO: | Falha ao tentar encriptar o valor - ${error.message}`);
        }
    },

    /**
     * Desencripta uma string encriptada usando AES.
     * @param {string} encryptedText Texto encriptado que será desencriptado.
     * @returns {string} Texto original (desencriptado).
     * @throws {Error} Lança erro em caso de falha.
     */
    decrypt(encryptedText) {
        try {
            if (typeof encryptedText !== 'string' || encryptedText.trim() === '') {
                throw new Error('O texto a ser desencriptado deve ser uma string não vazia.');
            }
            const bytes = CryptoJS.AES.decrypt(encryptedText, this.getKey());
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);

            if (!decrypted) {
                throw new Error('Falha ao desencriptar o texto. A chave pode estar incorreta.');
            }
            return decrypted;
        } catch (error) {
            throw new Error(`ERRO: | Falha ao tentar desencriptar o valor - ${error.message}`);
        }
    },
};
