import { isAxiosError } from "axios";
import { responseAPIVendor, responseAPIVendors, VendorFormData, vendorSchema, VendorType } from "../../types"
import { api } from "../../lib";

export const vendorMapped = (vendor: VendorType) => {
    return {
        id: vendor.id,
        vendorName: vendor.vendorName || '',
        country: vendor.country || '',
        observation: vendor.observation || '',
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

export const getVendor = async ( id: VendorType['id'] ) => {
    try {
        const { data } = await api(`/catalog/vendor/${ id }`);
        const mappedData = vendorMapped( data );
        const response = vendorSchema.safeParse( mappedData );
        if( response.success ) return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
};

export const updateVendor = async ({ id, formData }: { id: VendorType['id'], formData: VendorFormData }) => {
    try {
        const { data: { msg, payload } } = await api.put( `/catalog/vendor/${ id }`, formData );
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
}