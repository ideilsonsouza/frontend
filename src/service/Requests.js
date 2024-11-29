import axios from "axios";

export const Requests = async (method, url, data = null) => {

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios({ method, url, data, headers });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};