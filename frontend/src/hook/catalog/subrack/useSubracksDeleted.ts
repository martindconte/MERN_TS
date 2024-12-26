import { useQuery } from '@tanstack/react-query'
import { getAllSubracksDeleted } from '../../../api'

interface Props {
  enabled?: boolean
}

export const useSubracksDeleted = ({ enabled = true }: Props) => {
  const querySubracksDeleted = useQuery({
    queryKey: ['subracksDeleted'],
    queryFn: async () => await getAllSubracksDeleted(),
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
  })

  return {
    querySubracksDeleted,
  }
}
