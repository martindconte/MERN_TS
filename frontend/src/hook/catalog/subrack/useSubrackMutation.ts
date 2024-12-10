import { useMutation } from '@tanstack/react-query'
import { createSubrack } from '../../../api'
import { toast } from 'react-toastify'

export const useSubrackMutation = () => {
  const mutationCreateSubrack = useMutation({
    mutationFn: createSubrack,
    onError: error => toast.error(error.message, { theme: 'colored' }),
    onSuccess: response => {
      if (response) {
        const { msg, payload } = response
        toast.success(
          `${msg} // Vendor: ${payload.vendor.vendorName} // Subrack: ${
            payload.subrackType
          } ${
            payload.subrackFamily
          } // Part Number: ${payload.partNumber.toUpperCase()} / Model: ${
            payload?.modelName
          } / Description: ${payload.description}`,
          {
            theme: 'colored',
          },
        )
      }
    },
  })

  return {
    mutationCreateSubrack,
  }
}
