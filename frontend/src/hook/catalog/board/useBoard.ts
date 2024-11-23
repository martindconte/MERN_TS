import { useQuery } from "@tanstack/react-query";
import { BoardType } from "../../../types";
import { getBoard } from "../../../api";

interface Props {
    id: BoardType['id'];
    searchParams?: string;
}

export const useBoard = ({ id, searchParams }: Props) => {

    const queryBoard = useQuery({
        queryKey: ['board', id],
        queryFn: async () => await getBoard( id, searchParams ),
        retry: false,
        refetchOnWindowFocus: false,
    })

  return {
    queryBoard
  };
};
