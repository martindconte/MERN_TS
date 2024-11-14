import { useQuery } from '@tanstack/react-query';
import { getAllDeletedVendors } from '../../../api';

interface Props {
    enabled?: boolean;
}

export const useVendorsDeleted = ({ enabled = true }: Props) => {

    const queryVendorsDeleted = useQuery({
        queryKey: ['vendorsDeleted'],
        queryFn: async () => await getAllDeletedVendors(),
        retry: false,
        refetchOnWindowFocus: false,
        enabled
    })

    return {
        queryVendorsDeleted
    }
}