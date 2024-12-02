import { TransceiverRepository } from '../../../repositories';
import { ITransceiverSearch, ITransceiversResponse } from '../../../../interface';

export interface GetTransceiversUseCase {
    execute( queries?: ITransceiverSearch ): Promise<ITransceiversResponse>
}

export class GetTransceivers implements GetTransceiversUseCase {
    constructor(
        private readonly repository: TransceiverRepository
    ) {}
    execute( queries?: ITransceiverSearch ): Promise<ITransceiversResponse> {
        return this.repository.getAll( queries );
    }
}
// import { TransceiverEntity } from '../../../entities';
// import { TransceiverRepository } from '../../../repositories';
// import { QueriesDTO } from '../../../dtos';
// import { TransceiverEntityWithPagination } from '../../../../interface';


// export interface GetTransceiversUseCase {
//     execute( queries?: QueriesDTO ): Promise<TransceiverEntity[] | TransceiverEntityWithPagination>
// }

// export class GetTransceivers implements GetTransceiversUseCase {
//     constructor(
//         private readonly repository: TransceiverRepository
//     ) {}
//     execute( queries?: QueriesDTO ): Promise<TransceiverEntity[] | TransceiverEntityWithPagination> {
//         return this.repository.getAll( queries );
//     }
// }