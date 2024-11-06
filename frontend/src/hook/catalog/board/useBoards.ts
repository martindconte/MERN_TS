import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { getBoards } from "../../../api";

interface Props {
    enabled?: boolean;
    search?: { [key: string]: any }
}

export const useBoards = ({ enabled = true, search = {} }: Props) => {
    
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)

    const queryBoards = useQuery({
        queryKey: ['boards', { search, page, limit }],
        queryFn: async () => await getBoards({ ...search, page, limit }),
        retry: false,
        refetchOnWindowFocus: false, 
        enabled,
    })

    return {
        queryBoards,

        page,
        setPage,
        limit,
        setLimit,
    }
}