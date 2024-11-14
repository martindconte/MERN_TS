import { useQuery } from '@tanstack/react-query'
import { TransceiverType } from '../../../types'
import { getTransceiver } from '../../../api';

interface Props {
    id: TransceiverType['id'];
    searchParams?: string
}

export const useTransceiver = ({ id, searchParams }: Props) => {

    const queryTransceiver = useQuery({
        queryKey: [ 'transceiver', id ],
        queryFn: async () => await getTransceiver( id, searchParams ),
        retry: false,
        refetchOnWindowFocus: false,
    })

    return {
        queryTransceiver
    }
}