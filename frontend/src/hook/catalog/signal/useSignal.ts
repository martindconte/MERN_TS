import { useQuery } from "@tanstack/react-query"
import { SignalType } from "../../../types"
import { getSignal } from "../../../api"

interface Props {
  id: SignalType['id']
}

export const useSignal = ({ id }: Props) => {

  const querySignal = useQuery({
    queryKey: ['signal', id],
    queryFn: async () => await getSignal( id ),
    retry: false,
    refetchOnWindowFocus: false,
  })
  

  return {
    querySignal
  }
}
