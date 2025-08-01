import { isAxiosError } from "axios";
import { api } from "../../lib";
import { NEFormData, respAPINESchema } from "../../types";

export const createNetworkElement = async (formData: NEFormData) => {
    try {
        const { data } = await api.post('/network-element', formData);
        console.log('desde API NE --->', data);
        const response = respAPINESchema.safeParse(data);
        if (response.success) return response.data;
        throw new Error('Invalid response data');
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) {
            if (error.response.status === 500) {
                throw new Error(error.message);
            } else {
                throw new Error(error.response.data.msg);
            }
        }
        throw error; // Re-throw the error if it's not an AxiosError
    }
}