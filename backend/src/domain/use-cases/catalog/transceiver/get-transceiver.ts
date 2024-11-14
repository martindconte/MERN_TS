import { SearchTransceiverDTO } from '../../../dtos';
import { TransceiverEntity } from '../../../entities';
import { TransceiverRepository } from '../../../repositories';

interface GetTransceiverUseCase {
    execute(id: TransceiverEntity['id'], queries?: SearchTransceiverDTO): Promise<TransceiverEntity>
}

export class GetTransceiver implements GetTransceiverUseCase {
    constructor(
        private readonly repository: TransceiverRepository
    ){};
    
    execute(id: TransceiverEntity['id'], queries?: SearchTransceiverDTO): Promise<TransceiverEntity> {
        return this.repository.getById(id, queries)
    };
};