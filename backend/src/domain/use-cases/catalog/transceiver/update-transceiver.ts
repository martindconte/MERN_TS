import { ITransceiver, ITransceiverSearch } from '../../../../interface';
import { UpdateTransceiverDTO } from '../../../dtos';
import { TransceiverRepository } from '../../../repositories';

interface UpdateTransceiverUseCase {
    execute( dto: UpdateTransceiverDTO, queries?: ITransceiverSearch ): Promise<ITransceiver>
}

export class UpdateTransceiver implements UpdateTransceiverUseCase {
    constructor(
        private readonly repository: TransceiverRepository
    ) {}
    execute(dto: UpdateTransceiverDTO, queries?: ITransceiverSearch): Promise<ITransceiver> {
        return this.repository.updateById( dto, queries )
    }
}