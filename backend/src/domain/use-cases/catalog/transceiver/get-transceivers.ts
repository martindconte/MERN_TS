import { QueriesDTO, TransceiverRepository } from '../../..';
import { TransceiverEntityWithPagination } from '../../../../interface';
import { TransceiverEntity } from '../../../entities';


export interface GetTransceiversUseCase {
    execute( queries?: QueriesDTO ): Promise<TransceiverEntity[] | TransceiverEntityWithPagination>
}

export class GetTransceivers implements GetTransceiversUseCase {
    constructor(
        private readonly repository: TransceiverRepository
    ) {}
    execute( queries?: QueriesDTO ): Promise<TransceiverEntity[] | TransceiverEntityWithPagination> {
        return this.repository.getAll( queries );
    }
}