import { ITransceiver } from '../../../../interface';
import { TransceiverRepository } from '../../../repositories';

interface DeleteTransceiverUseCase {
    execute( id: ITransceiver['id']  ): Promise<ITransceiver>
}

export class DeleteTransceiver implements DeleteTransceiverUseCase {
    constructor(
        private readonly repository: TransceiverRepository
    ) {}
    execute(id: ITransceiver["id"]): Promise<ITransceiver> {
        return this.repository.deleteById( id )
    }
}
// import { TransceiverEntity } from '../../../entities';
// import { TransceiverRepository } from '../../../repositories';

// interface DeleteTransceiverUseCase {
//     execute( id: TransceiverEntity['id']  ): Promise<TransceiverEntity>
// }

// export class DeleteTransceiver implements DeleteTransceiverUseCase {
//     constructor(
//         private readonly repository: TransceiverRepository
//     ) {}
//     execute(id: TransceiverEntity["id"]): Promise<TransceiverEntity> {
//         return this.repository.deleteById( id )
//     }
// }