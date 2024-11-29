import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

export const DateUtils = {
    utc() {
        try {
            return new Date().toISOString();
        } catch (error) {
            throw new Error(error);
        }
    },

    formatted(date, formatString = 'yyyy-MM-dd', timeZone = 'America/Sao_Paulo') {
        try {
            if (!date) return null;
            return formatInTimeZone(new Date(date), timeZone, formatString, { locale: ptBR });
        } catch (error) {
            throw new Error(error);
        }
    },

    formatDateTime(date, formatString = 'yyyy-MM-dd HH:mm:ss') {
        try {
            return format(new Date(date), formatString, { locale: ptBR });
        } catch (error) {
            throw new Error(error);
        }
    },

    formatTime(date, formatString = 'HH:mm:ss') {
        try {

            return format(new Date(date), formatString, { locale: ptBR });
        } catch (error) {
            throw new Error(error);
        }
    },

    formatOrNow(date, formatString = 'yyyy-MM-dd', timeZone = 'America/Sao_Paulo') {
        try {
            let dateToFormat;
            if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
                dateToFormat = parseISO(date);
            } else {
                dateToFormat = date ? new Date(date) : new Date();
            }

            return format(dateToFormat, formatString, { locale: ptBR });

        } catch (error) {
            throw new Error(error);
        }
    }
};
