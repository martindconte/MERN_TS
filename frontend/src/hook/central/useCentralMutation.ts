import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCentral, deleteCentral, updateCentral } from '../../api'
import { Central, CentralFormData } from '../../types';

export const useCentralMutation = () => {

    const queryClient = useQueryClient()
  
    const mutationCreateCentral = useMutation({
        mutationFn: createCentral,
        onError: (error) => {
          toast.error(error.message, { theme: 'colored' })
        },
        onSuccess: ( response ) => {
          if( response ) {
            const { msg, payload } = response
            toast.success(`${msg} // ${payload.codeName.toUpperCase()} - ${payload.centralName.toUpperCase()} - ${payload.siteCode.toUpperCase()}`, {
              theme: 'colored'
            })
          }
        }
      });

      const mutationUpdateCentral = useMutation({
        mutationFn: async ({ id, formData }: { id: Central['id']; formData: CentralFormData }) => await updateCentral({ id, formData }),
        onError: (error) => toast.error(error.message, { theme: 'colored' }),
        onSuccess: ( response ) => {
          if( response ) {
            const { msg, payload } = response

            toast.success(`${msg} // ${payload.codeName.toUpperCase()} - ${payload.centralName.toUpperCase()} - ${payload.siteCode.toUpperCase()}`, {
              theme: 'colored'
            })
          }
        }
    });

    const mutationDeleteCentral = useMutation({
      mutationFn: async ({ id }: { id: Central['id'] }) => {
        const response = await deleteCentral( id )
        if (!response) {
          throw new Error('Delete operation failed');
        }
        return response;
      },
      onError: (error) => toast.error(error.message, { theme: 'colored' }),
        onSuccess: ( response ) => {
          if( response ) {
            queryClient.invalidateQueries({
              queryKey: ['centrals']
            })
            const { msg, payload } = response
            toast.success(`${msg} // ${payload.codeName.toUpperCase()} - ${payload.centralName.toUpperCase()} - ${payload.siteCode.toUpperCase()}`, {
              theme: 'colored'
            })
          }
        }
    })

      return {
        mutationCreateCentral,
        mutationUpdateCentral,
        mutationDeleteCentral
      }
}