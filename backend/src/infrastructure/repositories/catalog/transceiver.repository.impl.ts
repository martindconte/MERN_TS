import { CreateTransceiverDTO, QueriesDTO, SearchTransceiverDTO, TransceiverDatasource, TransceiverEntity, TransceiverRepository, UpdateTransceiverDTO } from '../../../domain';
import { ITransceiversDeleted, TransceiverEntityWithPagination } from '../../../interface';

export class TransceiverRepositoryImpl implements TransceiverRepository {
    constructor(
        private readonly datasource: TransceiverDatasource
    ) {}  

    create(createTransceiverDTO: CreateTransceiverDTO): Promise<TransceiverEntity> {
        return this.datasource.create( createTransceiverDTO );
    };

    getAll(queries?: QueriesDTO): Promise<TransceiverEntity[] | TransceiverEntityWithPagination> {
        return this.datasource.getAll( queries )
    };

    getAllDeleted(): Promise<ITransceiversDeleted> {
        return this.datasource.getAllDeleted()
    }

    getById(id: TransceiverEntity['id'], queries?: SearchTransceiverDTO): Promise<TransceiverEntity> {
        return this.datasource.getById( id, queries );
    };

    updateById(updateTransceiverDTO: UpdateTransceiverDTO, queries?: SearchTransceiverDTO): Promise<TransceiverEntity> {
        return this.datasource.updateById( updateTransceiverDTO, queries );
    };

    deleteById(id: TransceiverEntity['id']): Promise<TransceiverEntity> {
        return this.datasource.deleteById( id );
    };

    clean(id: TransceiverEntity['id']): Promise<TransceiverEntity> {
        return this.datasource.clean( id )
    };

}