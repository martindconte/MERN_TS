import { useQuery } from "@tanstack/react-query"
import { getCentral } from "../../api";

interface Props {
    id: string;
}

export const useCentral = ({ id }: Props) => {

    const queryCentral = useQuery({
        queryKey: [ 'central', id ],
        queryFn: async () => await getCentral( id ),
        retry: false,
        refetchOnWindowFocus: false,
    })

    return {
        queryCentral,
    }
}