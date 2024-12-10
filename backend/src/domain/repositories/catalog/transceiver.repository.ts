import { ITransceiver, ITransceiversDeleted, ITransceiverSearch, ITransceiversResponse, /* TransceiverEntityWithPagination */ } from '../../../interface';
import { CreateTransceiverDTO, UpdateTransceiverDTO } from '../../dtos';

export abstract class TransceiverRepository {
    abstract create( createTransceiverDTO: CreateTransceiverDTO ): Promise<ITransceiver>;
    abstract getAll( queries?: ITransceiverSearch ): Promise<ITransceiversResponse>;
    abstract getById( id: ITransceiver['id'], queries?: ITransceiverSearch ): Promise<ITransceiver>;
    abstract updateById( updateTransceiverDTO: UpdateTransceiverDTO, queries?: ITransceiverSearch ): Promise<ITransceiver>;
    abstract deleteById( id: ITransceiver['id'] ): Promise<ITransceiver>;
    abstract getAllDeleted(): Promise<ITransceiversDeleted>;
    abstract clean( id: ITransceiver['id'] ): Promise<ITransceiver>;
};