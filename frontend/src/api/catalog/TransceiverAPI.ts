import { isAxiosError } from 'axios';
import { responseAPITransceiverSchema, responseAPITransceiversSchema, TransceiverFormData, TransceiverPaginationType, transceiverSchema, TransceiverStatusEnum, TransceiverTechnologyEnum, TransceiverType } from '../../types';
import { api } from '../../lib';
import { buildURL } from '../../helpers';

export const transceiverMapped = (transceiver: TransceiverType) => ({
    id: transceiver.id,
    partNumber: transceiver.partNumber,
    model: transceiver.model,
    description: transceiver.description || '',
    vendor: transceiver.vendor,
    type: transceiver.type,
    observations: transceiver.observations || '',
    technology: transceiver.technology || TransceiverTechnologyEnum.DWDM,
    bitsRates: transceiver.bitsRates || [],
    status: transceiver.status || TransceiverStatusEnum.empty,
    createdAt: transceiver.createdAt ? new Date(transceiver.createdAt) : new Date(),
    updatedAt: transceiver.updatedAt ? new Date( transceiver.updatedAt ) : new Date(),
})

export const createTransceiver = async ( formData: TransceiverFormData ) => {
    try {
        const { data: { msg, payload } } = await api.post('/catalog/transceiver', formData)
        const dataMapped = {
            msg,
            payload: transceiverMapped( payload )
        };
        const response = responseAPITransceiverSchema.safeParse( dataMapped );
        if( response.success ) return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
}

export const getTransceivers = async ( query = {} ) => {
    const baseURL = '/catalog/transceiver'
    const URL = buildURL( baseURL, query )
    try {
        const { data: { payload, pagination } } = await api(URL);
        const mappedData: { payload: TransceiverType[], pagination: TransceiverPaginationType  } = {
            payload: payload.map( ( transceiver: TransceiverType ) => transceiverMapped( transceiver ) ),
            pagination
        }
        const response = responseAPITransceiversSchema.safeParse( mappedData )
        if( response.success ) return response.data
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
}

export const getTransceiver = async ( id: TransceiverType['id'] ) => {
    try {
        const { data } = await api(`catalog/transceiver/${id}`)
        const response = transceiverSchema.safeParse( transceiverMapped( data ) )
        if( response.success ) return response.data
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
}

export const updateTransceiver = async ({ id, formData }: { id: TransceiverType['id'], formData: TransceiverFormData }) => {
    try {
        const { data: { msg, payload } } = await api.put(`/catalog/transceiver/${id}`, formData);
        const dataMapped = {
            msg,
            payload: transceiverMapped( payload )
        };
        const response = responseAPITransceiverSchema.safeParse( dataMapped );
        if( response.success ) return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
}

export const deleteTransceiver = async ( id: TransceiverType['id'] ) => {
    try {
        const { data: { msg, payload } } = await api.delete(`catalog/transceiver/${ id }`)
        console.log({ msg, payload });
        const dataMapped = {
            msg,
            payload: transceiverMapped( payload )
        };
        const response = responseAPITransceiverSchema.safeParse( dataMapped );
        console.log(response);
        if( response.success ) return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
}