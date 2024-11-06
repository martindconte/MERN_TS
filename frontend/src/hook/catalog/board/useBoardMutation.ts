import { useMutation } from '@tanstack/react-query'
import { createBoard } from '../../../api'
import { toast } from 'react-toastify'

export const useBoardMutation = () => {

    const mutationCreateBoard = useMutation({
        mutationFn: createBoard,
        onError: (error) => { toast.error(error.message, { theme: 'colored' }) },
        onSuccess: (response) => {
            if (response) {
                const { msg, payload } = response
                toast.success(`${msg} // Vendor: ${payload.vendor.vendorName} // Board Namer: ${payload.boardName.toUpperCase()} / Part Number: ${payload.partNumber.toUpperCase()} / Description: ${payload.description}`, {
                    theme: 'colored'
                })
            };
        }
    });

    return {
        mutationCreateBoard
    }
}