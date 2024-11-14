import { SearchTransceiverDTO, UpdateTransceiverDTO } from '../../../dtos';
import { TransceiverEntity } from '../../../entities';
import { TransceiverRepository } from '../../../repositories';

interface UpdateTransceiverUseCase {
    execute( dto: UpdateTransceiverDTO, queries?: SearchTransceiverDTO ): Promise<TransceiverEntity>
}

export class UpdateTransceiver implements UpdateTransceiverUseCase {
    constructor(
        private readonly repository: TransceiverRepository
    ) {}
    execute(dto: UpdateTransceiverDTO, queries?: SearchTransceiverDTO): Promise<TransceiverEntity> {
        return this.repository.updateById( dto, queries )
    }
}