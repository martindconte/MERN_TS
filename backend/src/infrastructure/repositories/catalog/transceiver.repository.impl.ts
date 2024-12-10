import { CreateTransceiverDTO, TransceiverDatasource, TransceiverRepository, UpdateTransceiverDTO } from '../../../domain';
import { ITransceiver, ITransceiversDeleted, ITransceiverSearch, ITransceiversResponse  } from '../../../interface';

export class TransceiverRepositoryImpl implements TransceiverRepository {
    constructor(
        private readonly datasource: TransceiverDatasource
    ) {}  
    create(createTransceiverDTO: CreateTransceiverDTO): Promise<ITransceiver> {
        return this.datasource.create( createTransceiverDTO );
    }
    getAll(queries?: ITransceiverSearch): Promise<ITransceiversResponse> {
        return this.datasource.getAll( queries )
    }
    getById(id: ITransceiver['id'], queries?: ITransceiverSearch): Promise<ITransceiver> {
        return this.datasource.getById( id, queries );
    }
    updateById(updateTransceiverDTO: UpdateTransceiverDTO, queries?: ITransceiverSearch): Promise<ITransceiver> {
        return this.datasource.updateById( updateTransceiverDTO, queries );
    }
    deleteById(id: ITransceiver['id']): Promise<ITransceiver> {
        return this.datasource.deleteById( id );
    }
    getAllDeleted(): Promise<ITransceiversDeleted> {
        return this.datasource.getAllDeleted()
    }
    clean(id: ITransceiver['id']): Promise<ITransceiver> {
        return this.datasource.clean( id )
    }
}