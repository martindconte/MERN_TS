import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { createTransceiver, deleteTransceiver, updateTransceiver } from '../../../api'
import { TransceiverType, TransceiverFormData } from '../../../types'


export const useTransceiverMutation = () => {

  const queryClient = useQueryClient()

  const mutationCreateTransceiver = useMutation({
    mutationFn: createTransceiver,
    onError: (error) => toast.error(error.message, { theme: 'colored' }),
    onSuccess: (response) => {
      if (response) {
        const { msg, payload } = response
        toast.success(`${msg} // Vendor: ${ payload.vendor.vendorName } // Part Number: ${payload.partNumber.toUpperCase()} / Model: ${payload?.model} / Description: ${payload.description}`, {
          theme: 'colored'
        })
      }
    }
  })

  const mutationUpdateTransceiver = useMutation({
    mutationFn: async ({ id, formData }: { id: TransceiverType['id']; formData: TransceiverFormData }) => await updateTransceiver({ id, formData }),
    onError: (error) => toast.error(error.message, { theme: 'colored' }),
    onSuccess: (response) => {
      if (response) {
        const { msg, payload } = response
        queryClient.invalidateQueries({ queryKey: ['transceiver', payload.id] })
        toast.success(`${msg} // Vendor: ${ payload.vendor.vendorName } // Part Number: ${payload.partNumber.toUpperCase()} / Model: ${payload?.model} / Description: ${payload.description}`, {
          theme: 'colored'
        })
      }
    }
  })

  const mutationDeleteTransceiver = useMutation({
    mutationFn: async ({ id }: { id: TransceiverType['id'] } ) => {
      const response = await deleteTransceiver( id )
      if (!response) throw new Error('Delete operation failed');
      return response;
    },
    onError: (error) => toast.error(error.message, { theme: 'colored' }),
    onSuccess: (response) => {
      if (response) {
        const { msg, payload } = response
        queryClient.invalidateQueries({
          queryKey: ['transceivers']
        })
        toast.success(`${msg} // Vendor: ${ payload.vendor.vendorName } // Part Number: ${payload.partNumber.toUpperCase()} / Model: ${payload?.model} / Description: ${payload.description}`, {
          theme: 'colored'
        })
      }
    }
  })

  return {
    mutationCreateTransceiver,
    mutationUpdateTransceiver,
    mutationDeleteTransceiver,
  }
}