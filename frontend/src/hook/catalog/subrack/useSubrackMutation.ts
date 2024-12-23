import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cleanSubrack, createSubrack, deleteSubrack, updateSubrack } from '../../../api'
import { toast } from 'react-toastify'
import { SubrackType } from '../../../types'

export const useSubrackMutation = () => {
  const queryClient = useQueryClient()

  const mutationCreateSubrack = useMutation({
    mutationFn: createSubrack,
    onError: error => toast.error(error.message, { theme: 'colored' }),
    onSuccess: response => {
      if (response) {
        const { msg, payload } = response
        toast.success(
          `${msg} // Vendor: ${payload.vendor.vendorName} // Subrack: ${payload.subrackType} ${
            payload.subrackFamily
          } // Part Number: ${payload.partNumber.toUpperCase()} / Model: ${payload?.modelName} / Description: ${payload.description}`,
          {
            theme: 'colored',
          },
        )
      }
    },
  })

  const mutationUpdateSubrack = useMutation({
    mutationFn: updateSubrack,
    onError: error => {
      toast.error(error.message, { theme: 'colored' })
    },
    onSuccess: response => {
      if (response) {
        const { msg, payload } = response
        toast.success(
          `${msg} // Vendor: ${payload.vendor.vendorName} // Board Namer: ${payload.subrackType} ${payload.subrackFamily}
          // / Part Number: ${payload.partNumber.toUpperCase()} / Description: ${payload.description}`,
          {
            theme: 'colored',
          },
        )
      }
    },
  })

  const mutationDeletedSubrack = useMutation({
    mutationFn: async ({ id }: { id: SubrackType['id'] }) => await deleteSubrack(id),
    onError: error => toast.error(error.message, { theme: 'colored' }),
    onSuccess: response => {
      if (response) {
        const { msg, payload } = response
        const {
          description,
          modelName,
          partNumber,
          subrackFamily,
          subrackType,
          vendor: { vendorName },
        } = payload
        queryClient.invalidateQueries({
          queryKey: ['subracks'],
        })
        toast.success(
          `${msg} // Vendor: ${vendorName} // Part Number: ${partNumber.toUpperCase()} / Subrack: ${subrackType} ${subrackFamily} Model: ${modelName} / Description: ${description}`,
          {
            theme: 'colored',
          },
        )
      }
    },
  })

  const mutationPermanentlyDeleteSubrack = useMutation({
    mutationFn: async (id: SubrackType['id']) => await cleanSubrack(id),
    onError: error => toast.error(error.message, { theme: 'colored' }),
    onSuccess: response => {
      if (response) {
        const { msg, payload } = response
        const {
          description,
          modelName,
          partNumber,
          subrackFamily,
          subrackType,
          vendor: { vendorName },
        } = payload
        queryClient.invalidateQueries({
          queryKey: ['subracksDeleted'],
        })
        toast.success(
          `${msg} // Vendor: ${vendorName} // Part Number: ${partNumber.toUpperCase()} / Subrack: ${subrackType} ${subrackFamily} Model: ${modelName} / Description: ${description}`,
          {
            theme: 'colored',
          },
        )
      }
    },
  })

  return {
    mutationCreateSubrack,
    mutationUpdateSubrack,
    mutationDeletedSubrack,
    mutationPermanentlyDeleteSubrack,
  }
}
