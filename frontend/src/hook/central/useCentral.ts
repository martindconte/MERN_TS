import { useQuery } from "@tanstack/react-query"
import { getCentral } from "../../api";
import { Central } from "../../types";

interface Props {
    id: Central['id'];
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