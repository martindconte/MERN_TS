import { ITransceiversDeleted, TransceiverEntityWithPagination } from '../../../interface';
import { CreateTransceiverDTO, QueriesDTO, SearchTransceiverDTO, UpdateTransceiverDTO } from '../../dtos';
import { TransceiverEntity } from '../../entities';

export abstract class TransceiverRepository {
    abstract create( createTransceiverDTO: CreateTransceiverDTO ): Promise<TransceiverEntity>;
    abstract getAll( queries?: QueriesDTO ): Promise<TransceiverEntity[] | TransceiverEntityWithPagination>;
    abstract getById( id: TransceiverEntity['id'], queries?: SearchTransceiverDTO ): Promise<TransceiverEntity>;
    abstract updateById( updateTransceiverDTO: UpdateTransceiverDTO, queries?: SearchTransceiverDTO ): Promise<TransceiverEntity>;
    abstract deleteById( id: TransceiverEntity['id'] ): Promise<TransceiverEntity>;
    abstract getAllDeleted(): Promise<ITransceiversDeleted>;
    abstract clean( id: TransceiverEntity['id'] ): Promise<TransceiverEntity>;
};