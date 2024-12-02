import { isAxiosError } from 'axios';
import { responseAPITransceiverSchema, responseAPITransceiversSchema, TransceiverFormData, TransceiverPaginationType, transceiverSchema, TransceiversDeletedSchema, TransceiversDeletedType, TransceiverType } from '../../types';
import { api } from '../../lib';
import { buildURL } from '../../helpers';
import { RoadmapEnum, TechnologyEnum } from '../../types/catalog/commonTypes';
import { boardMapped } from './BaordAPI';

export const transceiverMapped = (transceiver: TransceiverType) => ({
    id: transceiver.id,
    partNumber: transceiver.partNumber,
    modelName: transceiver.modelName,
    description: transceiver.description || '',
    vendor: { id: transceiver.vendor.id, vendorName: transceiver.vendor.vendorName },
    type: transceiver.type,
    observations: transceiver.observations || '',
    technology: transceiver.technology || TechnologyEnum.DWDM,
    bitsRates: transceiver.bitsRates || [],
    roadmap: transceiver.roadmap || RoadmapEnum.empty,
    isDeleted: transceiver.isDeleted,
    createdAt: transceiver.createdAt ? new Date(transceiver.createdAt) : new Date(),
    updatedAt: transceiver.updatedAt ? new Date( transceiver.updatedAt ) : new Date(),
})

export const createTransceiver = async ( formData: TransceiverFormData ) => {
    try {
        const { data: { msg, payload } } = await api.post('/catalog/transceiver', formData);
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
    const baseURL = '/catalog/transceiver';
    const URL = buildURL( baseURL, query );
    try {
        const { data: { payload, pagination } } = await api(URL);
        const mappedData: { payload: TransceiverType[], pagination: TransceiverPaginationType  } = {
            payload: payload.map( ( transceiver: TransceiverType ) => transceiverMapped( transceiver ) ),
            pagination
        };

        const response = responseAPITransceiversSchema.safeParse( mappedData );
        if( response.success ) return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    };
};

export const getTransceiver = async ( id: TransceiverType['id'], searchParams: string = '' ) => {
    try {
        const { data } = await api(`catalog/transceiver/${id}` + searchParams);
        const response = transceiverSchema.safeParse( transceiverMapped( data ) );
        if( response.success ) return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    };
};

export const updateTransceiver = async ({ id, formData, searchParams = '' }: { id: TransceiverType['id'], formData: TransceiverFormData, searchParams?: string }) => {
    try {
        const { data: { msg, payload } } = await api.put(`/catalog/transceiver/${id}` + searchParams, formData);
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
    };
};

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
    };
};

export const getAllTransceiversDeleted = async () => {
    try {
        const { data: { boards, transceivers } }: {data: TransceiversDeletedType} = await api('/catalog/transceiver/clean-transceiver');
        const dataMapped: TransceiversDeletedType = {
            transceivers: transceivers.map( transceiver => transceiverMapped( transceiver ) ),
            boards: boards.map( board => boardMapped( board ) ),
        };
        const { success, data } = TransceiversDeletedSchema.safeParse( dataMapped );
        if( success ) {
            return data;
        } else {
            throw Error('Validation failed! Check Info Transceiver Deleted');
        };
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    };
};

export const cleanTransceiver = async ( id: TransceiverType['id'] ) => {
    try {
        const { data: { msg, payload } } = await api.delete(`catalog/transceiver/clean-transceiver/${ id }/permanently-delete`);
        const dataMapped = {
            msg,
            payload: transceiverMapped( payload )
        };
        const { success, data } = responseAPITransceiverSchema.safeParse( dataMapped );
        if( success ) return data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg); 
        throw error; // Re-throw the error if it's not an AxiosError
    };
};