import { CreateTransceiverDTO, QueriesDTO, UpdateTransceiverDTO } from "../../dtos";
import { TransceiverEntity } from "../../entities";

interface TransceiverEntityWithPagination {
    payload: TransceiverEntity[];
    pagination: {
        totalDocs: number;
        totalPages: number;
        prevPage: string | null;
        nextPage: string | null;
        page: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
    };
};

export abstract class TransceiverRepository {
    abstract create( createTransceiverDTO: CreateTransceiverDTO ): Promise<TransceiverEntity>;
    abstract getAll( queries?: QueriesDTO ): Promise<TransceiverEntity[] | TransceiverEntityWithPagination>;
    abstract getById( id: TransceiverEntity['id'] ): Promise<TransceiverEntity>;
    abstract updateById( updateTransceiverDTO: UpdateTransceiverDTO ): Promise<TransceiverEntity>;
    abstract deleteById( id: TransceiverEntity['id'] ): Promise<TransceiverEntity>;
};