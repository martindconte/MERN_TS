import { ITransceiver } from '../../../../interface';
import { CreateTransceiverDTO } from '../../../dtos';
import { TransceiverRepository } from '../../../repositories';

interface CreateTransceiverUseCase {
    execute( dto: CreateTransceiverDTO ): Promise<ITransceiver> 
}

export class CreateTransceiver implements CreateTransceiverUseCase{
    constructor(
        private readonly repository: TransceiverRepository
    ) {}
    execute(dto: CreateTransceiverDTO): Promise<ITransceiver> {
        return this.repository.create( dto )
    }
}