import { useQuery } from "@tanstack/react-query"
import { getAllTransceiversDeleted } from "../../../api"

interface Props {
    enabled?: boolean;
}

export const useTransceiversDeleted = ({ enabled = true }: Props) => {

    const queryTransceiversDeleted = useQuery({
        queryKey: ['transceiversDeleted'],
        queryFn: async () => await getAllTransceiversDeleted(),
        retry: false,
        refetchOnWindowFocus: false,
        enabled
    })

    return {
        queryTransceiversDeleted
    }
}