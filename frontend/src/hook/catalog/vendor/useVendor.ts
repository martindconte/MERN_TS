import { useQuery } from '@tanstack/react-query'
import { VendorType } from '../../../types'
import { getVendor } from '../../../api'

interface Props {
    id: VendorType['id']
    searchParams?: string
}

export const useVendor = ({ id, searchParams }: Props) => {

    const queryVendor = useQuery({
        queryKey: [ 'vendor', id ],
        queryFn: async () => await getVendor({ id, searchParams }),
        retry: false,
        refetchOnWindowFocus: false,
    })

  return { 
    queryVendor
  }
}