import { CreateTransceiverDTO, QueriesDTO, TransceiverDatasource, TransceiverEntity, TransceiverRepository, UpdateTransceiverDTO } from '../../../domain';
import { TransceiverEntityWithPagination } from '../../../interface';

export class TransceiverRepositoryImpl implements TransceiverRepository {
    constructor(
        private readonly datasource: TransceiverDatasource
    ) {}

    create(createTransceiverDTO: CreateTransceiverDTO): Promise<TransceiverEntity> {
        return this.datasource.create( createTransceiverDTO );
    }

    getAll(queries?: QueriesDTO): Promise<TransceiverEntity[] | TransceiverEntityWithPagination> {
        return this.datasource.getAll( queries )
    }

    getById(id: TransceiverEntity['id']): Promise<TransceiverEntity> {
        return this.datasource.getById( id );
    }

    updateById(updateTransceiverDTO: UpdateTransceiverDTO): Promise<TransceiverEntity> {
        return this.datasource.updateById( updateTransceiverDTO );
    }

    deleteById(id: TransceiverEntity['id']): Promise<TransceiverEntity> {
        return this.datasource.deleteById( id );
    }  

}