import { useQuery } from "@tanstack/react-query";
import { getSignals } from "../../../api";

interface Props {
  enabled?: boolean;
}

export const useSignals = ( { enabled = true }: Props ) => {

  const querySignals = useQuery({
    queryKey: ['signals'],
    queryFn: async () => await getSignals(),
    retry: false,
    refetchOnWindowFocus: false,
    enabled
  })

  return {
    querySignals
  }
}
