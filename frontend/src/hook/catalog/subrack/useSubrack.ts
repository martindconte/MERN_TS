import { useQuery } from '@tanstack/react-query'
import { SubrackType } from '../../../types'
import { getSubrack } from '../../../api'

interface Props {
  id: SubrackType['id']
  searchParams?: string
}

export const useSubrack = ({ id, searchParams }: Props) => {
  const querySubrack = useQuery({
    queryKey: ['subrack', id],
    queryFn: async () => await getSubrack(id, searchParams),
    retry: false,
    refetchOnWindowFocus: false,
  })

  return {
    querySubrack,
  }
}
