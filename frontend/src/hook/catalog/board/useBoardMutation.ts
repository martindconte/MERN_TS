import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cleanBoard, createBoard, deleteBoard, updateBoard } from '../../../api'
import { toast } from 'react-toastify'
import { BoardType } from '../../../types'

export const useBoardMutation = () => {
  const queryClient = useQueryClient()

  const mutationCreateBoard = useMutation({
    mutationFn: createBoard,
    onError: error => {
      toast.error(error.message, { theme: 'colored' })
    },
    onSuccess: response => {
      if (response) {
        const { msg, payload } = response
        toast.success(
          `${msg} // Vendor: ${
            payload.vendor.vendorName
          } // Board Namer: ${payload.boardName.toUpperCase()} / Part Number: ${payload.partNumber.toUpperCase()} / Description: ${
            payload.description
          }`,
          {
            theme: 'colored',
          },
        )
      }
    },
  })

  const mutationUpdateBoard = useMutation({
    mutationFn: updateBoard,
    onError: error => {
      toast.error(error.message, { theme: 'colored' })
    },
    onSuccess: response => {
      if (response) {
        queryClient.invalidateQueries({
          queryKey: ['board'],
        })
        const { msg, payload } = response
        toast.success(
          `${msg} // Vendor: ${
            payload.vendor.vendorName
          } // Board Namer: ${payload.boardName.toUpperCase()} / Part Number: ${payload.partNumber.toUpperCase()} / Description: ${
            payload.description
          }`,
          {
            theme: 'colored',
          },
        )
      }
    },
  })

  const mutationDeletedBoard = useMutation({
    mutationFn: async ({ id }: { id: BoardType['id'] }) => await deleteBoard(id),
    onError: error => toast.error(error.message, { theme: 'colored' }),
    onSuccess: response => {
      console.log(response)
      if (response) {
        const { msg, payload } = response
        queryClient.invalidateQueries({
          queryKey: ['boards'],
        })
        toast.success(
          `${msg} // Vendor: ${payload.vendor.vendorName} // Part Number: ${payload.partNumber.toUpperCase()} / Model: ${
            payload?.boardName
          } / Description: ${payload.description}`,
          {
            theme: 'colored',
          },
        )
      }
    },
  })

  const mutationPermanentlyDeleteBoard = useMutation({
    mutationFn: async (id: BoardType['id']) => await cleanBoard(id),
    onError: error => toast.error(error.message, { theme: 'colored' }),
    onSuccess: response => {
      if (response) {
        const { msg, payload } = response
        queryClient.invalidateQueries({
          queryKey: ['boardsDeleted'],
        })
        toast.success(
          `${msg} // Vendor: ${payload.vendor.vendorName} // Part Number: ${payload.partNumber.toUpperCase()} / Model: ${
            payload?.boardName
          } / Description: ${payload.description}`,
          {
            theme: 'colored',
          },
        )
      }
    },
  })

  return {
    mutationCreateBoard,
    mutationUpdateBoard,
    mutationDeletedBoard,
    mutationPermanentlyDeleteBoard,
  }
}
