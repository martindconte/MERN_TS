import { TransceiverEntityWithPagination } from '../../../interface';
import { CreateTransceiverDTO, QueriesDTO, UpdateTransceiverDTO } from '../../dtos';
import { TransceiverEntity } from '../../entities';

export abstract class TransceiverDatasource {
    abstract create( createTransceiverDTO: CreateTransceiverDTO ): Promise<TransceiverEntity>;
    abstract getAll( queries?: QueriesDTO ): Promise<TransceiverEntity[] | TransceiverEntityWithPagination>;
    abstract getById( id: TransceiverEntity['id'] ): Promise<TransceiverEntity>;
    abstract updateById( updateTransceiverDTO: UpdateTransceiverDTO ): Promise<TransceiverEntity>;
    abstract deleteById( id: TransceiverEntity['id'] ): Promise<TransceiverEntity>;
};