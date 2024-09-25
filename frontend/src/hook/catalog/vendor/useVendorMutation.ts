import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createVendor, deleteVendor, updateVendor } from '../../../api';
import { VendorFormData, VendorType } from '../../../types';

export const useVendorMutation = () => {

    const queryClient = useQueryClient()
  
    const mutationCreateVendor = useMutation({
        mutationFn: createVendor,
        onError: (error) => {
          toast.error(error.message, { theme: 'colored' })
        },
        onSuccess: ( response ) => {
          if( response ) {
            const { msg, payload } = response
            queryClient.invalidateQueries({
                queryKey: ['vendors']
            })
            toast.success(`${msg} // ${ payload.vendorName.toUpperCase() }`, {
              theme: 'colored'
            })
          }
        }
      });

      const mutationUpdateVendor = useMutation({
        mutationFn: async ({ id, formData }: { id: VendorType['id']; formData: VendorFormData }) => await updateVendor({ id, formData }),
        onError: (error) => toast.error(error.message, { theme: 'colored' }),
        onSuccess: ( response ) => {
          if( response ) {
            const { msg, payload } = response
            toast.success(`${msg} // ${payload.vendorName.toUpperCase()} - ${payload.country.toUpperCase()}`, {
              theme: 'colored'
            })
          }
        }
    });

    const mutationDeleteVendor = useMutation({
      mutationFn: async ({ id }: { id: VendorType['id'] }) => {
        const response = await deleteVendor( id )
        if (!response) {
          throw new Error('Delete operation failed');
        }
        return response;
      },
      onError: (error) => toast.error(error.message, { theme: 'colored' }),
        onSuccess: ( response ) => {
          if( response ) {
            queryClient.invalidateQueries({
              queryKey: ['vendors']
            })
            const { msg, payload } = response
            toast.success(`${msg} // ${payload.vendorName.toUpperCase()} - ${payload.country.toUpperCase()} `, {
              theme: 'colored'
            })
          }
        }
    })

      return {
        mutationCreateVendor,
        mutationUpdateVendor,
        mutationDeleteVendor,
      }
}