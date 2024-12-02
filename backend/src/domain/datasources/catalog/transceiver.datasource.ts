import { ITransceiver, ITransceiversDeleted, ITransceiverSearch, ITransceiversResponse /* TransceiverEntityWithPagination */ } from '../../../interface';
import { CreateTransceiverDTO, QueriesDTO, SearchTransceiverDTO, UpdateTransceiverDTO } from '../../dtos';
import { TransceiverEntity } from '../../entities';

export abstract class TransceiverDatasource {
    abstract create( createTransceiverDTO: CreateTransceiverDTO ): Promise<ITransceiver>;
    abstract getAll( queries?: ITransceiverSearch ): Promise<ITransceiversResponse>;
    abstract getById( id: ITransceiver['id'], queries?: ITransceiverSearch ): Promise<ITransceiver>;
    abstract updateById( updateTransceiverDTO: UpdateTransceiverDTO, queries?: ITransceiverSearch ): Promise<ITransceiver>;
    abstract deleteById( id: ITransceiver['id'] ): Promise<ITransceiver>;
    abstract getAllDeleted(): Promise<ITransceiversDeleted>;
    abstract clean( id: ITransceiver['id'] ): Promise<ITransceiver>;
    // abstract create( createTransceiverDTO: CreateTransceiverDTO ): Promise<TransceiverEntity>;
    // abstract getAll( queries?: QueriesDTO ): Promise<TransceiverEntity[] | TransceiverEntityWithPagination>;
    // abstract getById( id: TransceiverEntity['id'], queries?: SearchTransceiverDTO ): Promise<TransceiverEntity>;
    // abstract updateById( updateTransceiverDTO: UpdateTransceiverDTO, queries?: SearchTransceiverDTO ): Promise<TransceiverEntity>;
    // abstract deleteById( id: TransceiverEntity['id'] ): Promise<TransceiverEntity>;
    // abstract getAllDeleted(): Promise<ITransceiversDeleted>;
    // abstract clean( id: TransceiverEntity['id'] ): Promise<TransceiverEntity>;
};