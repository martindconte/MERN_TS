import { useQuery } from "@tanstack/react-query"
import { getAllDeletedVendors, getVendors } from "../../../api";

interface Props {
    enabled?: boolean;
}

export const useVendors = ({ enabled = true }: Props) => {

    const queryVendors = useQuery({
        queryKey: [ 'vendors' ],
        queryFn: async () => await getVendors(),
        retry: false,
        refetchOnWindowFocus: false,
        enabled
    });

    const queryVendorsDeleted = useQuery({
        queryKey: ['vendorsDeleted'],
        queryFn: async () => await getAllDeletedVendors(),
        retry: false,
        refetchOnWindowFocus: false,
        enabled
    })

    return {
        queryVendors,
        queryVendorsDeleted
    }
}