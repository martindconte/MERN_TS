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
    // constructor(
    //     private readonly datasource: TransceiverDatasource
    // ) {}  

    // create(createTransceiverDTO: CreateTransceiverDTO): Promise<TransceiverEntity> {
    //     return this.datasource.create( createTransceiverDTO );
    // };

    // getAll(queries?: QueriesDTO): Promise<TransceiverEntity[] | TransceiverEntityWithPagination> {
    //     return this.datasource.getAll( queries )
    // };

    // getAllDeleted(): Promise<ITransceiversDeleted> {
    //     return this.datasource.getAllDeleted()
    // }

    // getById(id: TransceiverEntity['id'], queries?: SearchTransceiverDTO): Promise<TransceiverEntity> {
    //     return this.datasource.getById( id, queries );
    // };

    // updateById(updateTransceiverDTO: UpdateTransceiverDTO, queries?: SearchTransceiverDTO): Promise<TransceiverEntity> {
    //     return this.datasource.updateById( updateTransceiverDTO, queries );
    // };

    // deleteById(id: TransceiverEntity['id']): Promise<TransceiverEntity> {
    //     return this.datasource.deleteById( id );
    // };

    // clean(id: TransceiverEntity['id']): Promise<TransceiverEntity> {
    //     return this.datasource.clean( id )
    // };

}