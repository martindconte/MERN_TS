import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCentrals } from '../../api';

interface Props {
    enabled: boolean;
    search: { [key: string]: any }
}

export const useCentrals = ({ enabled = true , search = {} }: Props) => {

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const queryCentrals = useQuery({
        queryKey: [ 'centrals', { search, page, limit } ],
        queryFn: async () => await getCentrals({ ...search, page, limit }),
        retry: false,
        refetchOnWindowFocus: false,
        enabled
    })


    return {
        queryCentrals,

        page,
        setPage,
        limit,
        setLimit,
    }
}