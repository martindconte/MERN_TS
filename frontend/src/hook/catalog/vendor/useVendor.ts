import { useQuery } from "@tanstack/react-query"
import { VendorType } from "../../../types"
import { getVendor } from "../../../api"

interface Props {
    id: VendorType['id']
}

export const useVendor = ({ id }: Props) => {

    const queryVendor = useQuery({
        queryKey: [ 'vendor', id ],
        queryFn: async () => await getVendor( id ),
        retry: false,
        refetchOnWindowFocus: false,
    })

  return { 
    queryVendor
  }
}