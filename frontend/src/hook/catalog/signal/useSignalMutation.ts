import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { createSignal } from '../../../api'

export const useSignalMutation = () => {
  const queryClient = useQueryClient()

  const mutationCreateSignal = useMutation({
    mutationFn: createSignal,
    onError: error => toast.error(error.message, { theme: 'colored' }),
    onSuccess: response => {
      if (response) {
        const { msg, payload } = response
        queryClient.invalidateQueries({
          queryKey: ['signals'],
        })
        toast.success(`${msg} // ${payload.type.toUpperCase()} ${payload.subType.toUpperCase()}`, {
          theme: 'colored',
        })
      }
    },
  })

  return {
    mutationCreateSignal,
  }
}
