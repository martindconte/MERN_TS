import { useQuery } from '@tanstack/react-query'
import { SubrackType } from '../../../types'
import { getSubrack } from '../../../api'

interface Props {
  id: SubrackType['id'];
  searchParams?: string;
  enabled?: boolean;
}

export const useSubrack = ({ id, searchParams, enabled = true }: Props) => {
  const querySubrack = useQuery({
    queryKey: ['subrack', id],
    queryFn: async () => await getSubrack(id, searchParams),
    retry: false,
    refetchOnWindowFocus: false,
    enabled
  })

  return {
    querySubrack,
  }
}
