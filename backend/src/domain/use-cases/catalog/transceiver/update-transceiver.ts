import { UpdateTransceiverDTO } from '../../../dtos';
import { TransceiverEntity } from '../../../entities';
import { TransceiverRepository } from '../../../repositories';

interface UpdateTransceiverUseCase {
    execute( dto: UpdateTransceiverDTO ): Promise<TransceiverEntity>
}

export class UpdateTransceiver implements UpdateTransceiverUseCase {
    constructor(
        private readonly repository: TransceiverRepository
    ) {}
    execute(dto: UpdateTransceiverDTO): Promise<TransceiverEntity> {
        return this.repository.updateById( dto )
    }
}