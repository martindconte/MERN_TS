import { useQuery } from '@tanstack/react-query'
import { TransceiverType } from '../../../types'
import { getTransceiver } from '../../../api';

interface Props {
    id: TransceiverType['id'];
}

export const useTransceiver = ({ id }: Props) => {

    const queryTransceiver = useQuery({
        queryKey: [ 'transceiver', id ],
        queryFn: async () => await getTransceiver( id ),
        retry: false,
        refetchOnWindowFocus: false,
    })

    return {
        queryTransceiver
    }
}