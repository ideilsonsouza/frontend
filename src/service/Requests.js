import { authStored } from "@/store/auth";
import { settingsStored } from "@/store/settings";
import axios from "axios";

/**
 * Função para realizar requisições HTTP de forma simplificada.
 * Baseada no Axios, suporta diferentes métodos HTTP, tratamento de erros e configuração adicional.
 * 
 * @param {string} method Método HTTP a ser usado (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {string} url URL da API ou endpoint de destino.
 * @param {Object|null} [data=null] Dados a serem enviados no corpo da requisição (para métodos como POST/PUT).
 * @param {Object} [customHeaders={}] Headers adicionais a serem incluídos na requisição.
 * @param {Object} [config={}] Configurações adicionais para o Axios (e.g., timeout, params, etc.).
 * @returns {Promise<Object>} Resposta da API (dados no formato JSON).
 * @throws {Error} Erro com detalhes sobre a falha da requisição.
 */
export const ServiceRequest = async (method, url, data = null, customHeaders = {}, config = {}) => {
    // Validação dos parâmetros obrigatórios
    if (typeof method !== "string" || !["GET", "POST", "PUT", "DELETE", "PATCH"].includes(method.toUpperCase())) {
        throw new Error("Método HTTP inválido. Use 'GET', 'POST', 'PUT', 'DELETE' ou 'PATCH'.");
    }

    if (typeof url !== "string" || !url.trim()) {
        throw new Error("URL inválida. Deve ser uma string não vazia.");
    }

    // Configuração dos headers padrão
    const settings = settingsStored();
    const auth = authStored();

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...customHeaders, // Mescla com headers personalizados
    };

    if (settings.platform.auth && auth.token) {
        headers['Authorization'] = `${auth.token_type} ${auth.token}`;
    }

    // Combina configurações adicionais
    const axiosConfig = {
        method: method.toUpperCase(), // Garante que o método esteja em maiúsculas
        url,
        headers,
        data,
        ...config, // Sobrescreve ou adiciona configurações extras
    };

    try {
        // Realiza a requisição HTTP
        const response = await axios(axiosConfig);
        return response.data;
    } catch (error) {
        // Tratamento de erros
        if (error.response) {
            // Resposta recebida com código HTTP de erro
            const { status, data: errorData } = error.response;
            throw new Error(
                `Erro na requisição [${status}]: ${JSON.stringify(errorData, null, 2)}`
            );
        } else if (error.request) {
            // Nenhuma resposta recebida (ex.: timeout)
            throw new Error("Falha na conexão com o servidor ou tempo limite excedido.");
        } else {
            // Erro de configuração ou outro
            throw new Error(`Erro desconhecido: ${error.message}`);
        }
    }
};
