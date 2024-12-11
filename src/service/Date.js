import { settingsStored } from '@/store/settings';
import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';



/**
 * Serviço utilitário para manipulação e formatação de datas.
 */
export const ServiceDate = {
    /**
     * Retorna a data atual no formato UTC (ISO 8601).
     * @returns {string} Data atual em formato ISO.
     */
    utc() {
        try {
            return new Date().toISOString();
        } catch (error) {
            throw new Error(`Erro ao obter data UTC: ${error.message}`);
        }
    },

    /**
     * Formata uma data em um formato específico considerando o fuso horário.
     * @param {Date|string} date Data a ser formatada (string ou objeto Date).
     * @param {string} formatString Formato desejado (padrão: 'yyyy-MM-dd').
     * @param {string} timeZone Fuso horário a ser considerado (padrão: 'America/Sao_Paulo').
     * @returns {string|null} Data formatada ou `null` se a data for inválida.
     */
    formatted(date, formatString = 'yyyy-MM-dd', timeZone = null) {
        try {
            const settings = settingsStored();
            if (!date) return null;
            if (!timeZone) {
                timeZone = settings.timeZone;
            }
            return formatInTimeZone(new Date(date), timeZone, formatString, { locale: ptBR });
        } catch (error) {
            throw new Error(`Erro ao formatar data no fuso horário ${timeZone}: ${error.message}`);
        }
    },

    /**
     * Formata uma data e hora no formato padrão brasileiro ou definido pelo usuário.
     * @param {Date|string} date Data a ser formatada.
     * @param {string} formatString Formato desejado (padrão: 'yyyy-MM-dd HH:mm:ss').
     * @returns {string} Data e hora formatadas.
     */
    formatDateTime(date, formatString = 'yyyy-MM-dd HH:mm:ss') {
        try {
            if (!date) throw new Error('Data inválida ou não fornecida.');
            return format(new Date(date), formatString, { locale: ptBR });
        } catch (error) {
            throw new Error(`Erro ao formatar data e hora: ${error.message}`);
        }
    },

    /**
     * Formata apenas a hora de uma data.
     * @param {Date|string} date Data a ser formatada.
     * @param {string} formatString Formato desejado (padrão: 'HH:mm:ss').
     * @returns {string} Hora formatada.
     */
    formatTime(date, formatString = 'HH:mm:ss') {
        try {
            if (!date) throw new Error('Data inválida ou não fornecida.');
            return format(new Date(date), formatString, { locale: ptBR });
        } catch (error) {
            throw new Error(`Erro ao formatar hora: ${error.message}`);
        }
    },

    /**
     * Formata uma data ou retorna a data atual se nenhuma for fornecida.
     * @param {Date|string|null} date Data a ser formatada ou `null` para usar a data atual.
     * @param {string} formatString Formato desejado (padrão: 'yyyy-MM-dd').
     * @param {string} timeZone Fuso horário a ser considerado (padrão: 'America/Sao_Paulo').
     * @returns {string} Data formatada.
     */
    formatOrNow(date, formatString = 'yyyy-MM-dd', timeZone = null) {
        try {
            const settings = settingsStored();
            const dateToFormat = date
                ? typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)
                    ? parseISO(date)
                    : new Date(date)
                : new Date();
            if (!timeZone) {
                timeZone = settings.timeZone;
            }
            return formatInTimeZone(dateToFormat, timeZone, formatString, { locale: ptBR });
        } catch (error) {
            throw new Error(`Erro ao formatar ou usar data atual: ${error.message}`);
        }
    },
};
