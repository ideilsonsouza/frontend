import { ServiceRequest } from "./Requests";

const authEndpoint = import.meta.env.VITE_AUHT_ENDPOINT;

export const authController = {
    async login(data) {
        try {
            const response = await ServiceRequest('post', `${import.meta.env.VITE_AUTH}/login`, data)
            if (response) {
                // implementation save of token
                return response
            }

        } catch (error) {
            throw new Error(error.message);
        }
    },
    async verify() {
        try {
            const response = await ServiceRequest('get', `${import.meta.env.VITE_AUTH}/token`);
            if (response) {
                return response
            }
        } catch (error) {
            throw new Error(error.message
            );
        }
    }

}
