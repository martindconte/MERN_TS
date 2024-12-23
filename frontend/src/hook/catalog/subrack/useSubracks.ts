import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSubrtacks } from '../../../api'

interface Props {
  enabled?: boolean
  search?: { [key: string]: any }
}

export const useSubracks = ({ enabled = true, search = {} }: Props) => {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)

  const querySubracks = useQuery({
    queryKey: ['subracks', { search, page, limit }],
    queryFn: async () => await getSubrtacks({ ...search, page, limit }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
  })

  return {
    querySubracks,

    page,
    setPage,
    limit,
    setLimit,
  }
}
