import { useQuery } from "@tanstack/react-query";
import { getAllBoardsDeleted } from "../../../api";

interface Props {
    enabled?: boolean;
}

export const useBoardsDeleted = ({ enabled = true }: Props) => {

    const queryBoardsDeleted = useQuery({
        queryKey: ['boardsDeleted'],
        queryFn: async () => await getAllBoardsDeleted(),
        retry: false,
        refetchOnWindowFocus: false,
        enabled
    })

    return {
        queryBoardsDeleted
    }
}