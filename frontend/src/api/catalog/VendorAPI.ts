import { isAxiosError } from "axios";
import { responseAPIVendor, responseAPIVendors, vendorDeletedSchema, VendorDeletedType, VendorFormData, vendorSchema, VendorType } from "../../types"
import { api } from "../../lib";
import { transceiverMapped } from "./TransceiverAPI";
import { boardMapped } from "./BaordAPI";

export const vendorMapped = (vendor: VendorType) => {
    return {
        id: vendor.id,
        vendorName: vendor.vendorName,
        country: vendor.country,
        observation: vendor.observation,
        isDeleted: vendor.isDeleted,
        createdAt: vendor.createdAt ? new Date(vendor.createdAt) : new Date(),
        updatedAt: vendor.updatedAt ? new Date(vendor.updatedAt) : new Date(),
    }
};

export const createVendor = async ( formData: VendorFormData ) => {
    try {
        const { data: { msg, payload } } = await api.post(`/catalog/vendor`, formData);
        const dataMapped = {
            msg,
            payload: vendorMapped( payload )
        };
        const response = responseAPIVendor.safeParse( dataMapped);
        if( response.success ) return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
}

export const getVendors = async () => {
    try {
        const { data } = await api('/catalog/vendor');
        const mappedData = data.map(( vendor: VendorType ) => vendorMapped( vendor ));
        const response = responseAPIVendors.safeParse( mappedData );
        if( response.success ) return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
};

export const getVendor = async ({ id, searchParams }: { id: VendorType['id'], searchParams?: string } ) => {
    try {
        const { data } = await api(`/catalog/vendor/${ id }` + searchParams);
        const mappedData = vendorMapped( data );
        const response = vendorSchema.safeParse( mappedData );
        if( response.success ) return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
};

export const updateVendor = async ({ id, formData, searchParams }: { id: VendorType['id'], formData: VendorFormData, searchParams?: string }) => {

    try {
        const { data: { msg, payload } } = await api.put( `/catalog/vendor/${ id }` + searchParams, formData );
        const dataMapped = {
            msg,
            payload: vendorMapped( payload )
        };
        const { success, data } = responseAPIVendor.safeParse( dataMapped );
        if( success ) return data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
};

export const deleteVendor = async ( id: VendorType['id'] ) => {
    try {
        const { data: { msg, payload } } = await api.delete(`/catalog/vendor/${ id }`)
        const dataMapped = {
            msg,
            payload: vendorMapped( payload )
        };
        const { success, data } = responseAPIVendor.safeParse( dataMapped );
        if( success ) return data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
};

export const getAllDeletedVendors = async (): Promise<VendorDeletedType> => {
    try {
        const { data: { vendors, boards, transceivers } }: {data: VendorDeletedType} = await api('/catalog/vendor/clean-vendors');
        const dataMapped: VendorDeletedType = {
            vendors: vendors.map( vendor => vendorMapped( vendor ) ),
            transceivers: transceivers.map( transceiver => transceiverMapped( transceiver ) ),
            boards: boards.map( board => boardMapped( board ) ),
        };
        const { success, data } = vendorDeletedSchema.safeParse( dataMapped );
        if( success ) {
            return data;
        } else {
            throw Error('Validation failed! Check Info Vendor')
        };
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg); 
        throw error; // Re-throw the error if it's not an AxiosError
    };
};

export const cleanVendor = async ( id: VendorType['id'] ) => {
    try {
        const { data: { msg, payload } } = await api.delete(`catalog/vendor/clean-vendors/${ id }/permanently-delete`);
        const dataMapped = {
            msg,
            payload: vendorMapped( payload )
        };
        const { success, data } = responseAPIVendor.safeParse( dataMapped );
        if( success ) return data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg); 
        throw error; // Re-throw the error if it's not an AxiosError
    };
};