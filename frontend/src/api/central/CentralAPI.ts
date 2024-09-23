import { isAxiosError } from 'axios';
import { api } from '../../lib';
import { Central, CentralFormData, centralSchema, responseCentralsSchema, responseGetCentralsSchema } from '../../types';
import { buildURL } from '../../helpers';

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
        createdAt: central.createdAt ? new Date(central.createdAt) : '',
        updatedAt: central.updatedAt ? new Date(central.updatedAt) : '',
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
        console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
};

export const getCentrals = async ( query = {} ) => {

    const baseURL = '/central'
    const URL = buildURL( baseURL, query )

    try {
        const { data } = await api(URL);
        const { payload, pagination } = data
        const mappedData = {
            payload: payload.map( ( central: Central ) => centralMapped( central ) ),
            pagination
        }

        const response = responseGetCentralsSchema.safeParse( mappedData )
        
        if( response.success ) return response.data

    } catch (error) { 
        console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
};

export const getCentral = async ( id: string ) => {
    try {
        const { data } = await api( `/central/${ id }` )
        const response = centralSchema.safeParse( centralMapped( data ) )
        if( response.success ) return response.data
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
    }
};

export const updateCentral = async ({ id, formData }: { id: string; formData: CentralFormData }) => {
    try {
        const { data } = await api.put( `/central/${id}`, formData );
        const { msg, payload } = data

        const mappedPayload = centralMapped( payload )

        const response = responseCentralsSchema.safeParse({
            msg,
            payload: mappedPayload
        });

        console.log(response);
        if (response.success) return {
            msg: response.data.msg,
            payload: centralMapped(response.data.payload)
        };
        
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg)
        }
        throw error; // Re-throw the error if it's not an AxiosError
    }
};