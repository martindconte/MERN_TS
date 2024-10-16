import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTransceivers } from '../../../api';

interface Props {
    enabled?: boolean;
    search?: { [key: string]: any }
}

export const useTransceivers = ({ enabled = true, search = {} }: Props) => {

        const [page, setPage] = useState(1);
        const [limit, setLimit] = useState(10);

        const queryTransceivers = useQuery({
            queryKey: [ 'transceivers', { search, page, limit } ],
            queryFn: async () => await getTransceivers({ ...search, limit, page }),
            retry: false,
            refetchOnWindowFocus: false,
            enabled
        })

        return {
            queryTransceivers,

            page,
            setPage,
            limit,
            setLimit
        }
}
