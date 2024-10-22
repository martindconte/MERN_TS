import { isAxiosError } from 'axios';
import { api } from '../../lib';
import { responseAPISignal, responseAPISignals, SignalFormData, signalSchema, SignalType } from '../../types';

// export const mappedSignal = ( signal: SignalType ) => ({
//     id: signal.id,
//     type: signal.type,
//     subType: signal.subType,
//     bandwidth: signal.bandwidth.map( bw => ({
//         id: bw.id ? bw.id : undefined,
//         amount: Number(bw.amount),
//         unit: bw.unit
//     })),
//     observation: signal.observation,
//     createdAt: signal.createdAt ? new Date(signal.createdAt) : undefined,
//     updatedAt: signal.updatedAt ? new Date(signal.updatedAt) : undefined,
// })
export const mappedSignal = ( signal: SignalType ) => ({
    id: signal.id,
    type: signal.type,
    subType: signal.subType,
    bandwidth: signal.bandwidth,
    observation: signal.observation,
    createdAt: signal.createdAt ? new Date(signal.createdAt) : undefined,
    updatedAt: signal.updatedAt ? new Date(signal.updatedAt) : undefined,
})

export const createSignal = async ( formData: SignalFormData ) => {

    // const uniqueBandwidth: SignalType['bandwidth'] = [];

    // const repeat = new Set<string>()

    // for( const bw of formData.bandwidth ) {
    //     const data = `${ bw.amount }-${ bw.unit }`
    //     if(!repeat.has( data )) {
    //         repeat.add( data )
    //         uniqueBandwidth.push(bw)
    //     }
    // }

    // const formDataBW: SignalFormData = {
    //     ...formData,
    //     bandwidth: uniqueBandwidth,
    // }

    try {
        const { data: { msg, payload } } = await api.post(`/catalog/signal`, formData);
        const dataMapped = {
            msg,
            payload: mappedSignal( payload )
        };
        const response = responseAPISignal.safeParse( dataMapped );
        if( response.success ) return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
};

export const getSignals = async () => {
    try {
        const { data } = await api('catalog/signal');
        const dataMapped = data.map(( signal: SignalType ) => mappedSignal( signal ) );
        const response = responseAPISignals.safeParse( dataMapped );
        if( response.success ) return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    };
};

export const getSignal = async ( id: string ) => {
    try {
        const { data } = await api(`catalog/signal/${ id }`);
        const dataMapped = mappedSignal( data );
        const response = signalSchema.safeParse( dataMapped );
        if( response.success ) return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
}

export const updateSignal = async ({ id, formData }: { id: SignalType['id'], formData: SignalFormData }) => {
    console.log(id);
    console.log(formData);
}