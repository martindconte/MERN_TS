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