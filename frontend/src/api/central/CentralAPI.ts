import { isAxiosError } from "axios";
import { api } from "../../lib";
import { Central, CentralFormData } from "../../types";

export const centralMapped = (central: Central) => {
    return {
        id: central.id,
        centralName: central.centralName || '',
        codeName: central.codeName || '',
        siteCode: central.siteCode || '',
        owner: central.owner || '',
        status: central.status || '',
        provinceName: central.provinceName || '',
        districtName: central.districtName || '',
        localityName: central.localityName || '',
        address: central.address || '',
        latitude: central.latitude || 0,
        longitude: central.longitude || 0,
        description: central.description || '',
        observations: central.observations || '',
        createdAt: central.createdAt || '',
        updatedAt: central.updatedAt || '',
    }
}


export const createCentral = async (formData: CentralFormData) => {
    try {
        const { data: { msg, payload } } = await api.post('/central', formData);
        return {
            msg,
            data: centralMapped(payload)
        };
    } catch (error) { 
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
};
