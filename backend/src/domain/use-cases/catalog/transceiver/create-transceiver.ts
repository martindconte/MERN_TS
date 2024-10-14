import { CreateTransceiverDTO } from '../../../dtos';
import { TransceiverEntity } from '../../../entities';
import { TransceiverRepository } from '../../../repositories';

interface CreateTransceiverUseCase {
    execute( dto: CreateTransceiverDTO ): Promise<TransceiverEntity> 
}

export class CreateTransceiver implements CreateTransceiverUseCase{
    constructor(
        private readonly repository: TransceiverRepository
    ) {}
    execute(dto: CreateTransceiverDTO): Promise<TransceiverEntity> {
        return this.repository.create( dto )
    }
}