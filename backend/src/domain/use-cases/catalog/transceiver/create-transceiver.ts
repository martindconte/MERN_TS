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
// import { CreateTransceiverDTO } from '../../../dtos';
// import { TransceiverEntity } from '../../../entities';
// import { TransceiverRepository } from '../../../repositories';

// interface CreateTransceiverUseCase {
//     execute( dto: CreateTransceiverDTO ): Promise<TransceiverEntity> 
// }

// export class CreateTransceiver implements CreateTransceiverUseCase{
//     constructor(
//         private readonly repository: TransceiverRepository
//     ) {}
//     execute(dto: CreateTransceiverDTO): Promise<TransceiverEntity> {
//         return this.repository.create( dto )
//     }
// }