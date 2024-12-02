import { ITransceiver } from '../../../../interface';
import { TransceiverRepository } from '../../../repositories';

interface CleanTransceiverUseCase {
    execute( id: ITransceiver['id'] ): Promise<ITransceiver>
}

export class CleanTransceiver implements CleanTransceiverUseCase {
    constructor(
        private readonly repository: TransceiverRepository
    ) {}
    execute( id: ITransceiver['id'] ): Promise<ITransceiver> {
        return this.repository.clean( id )
    }
}
// import { TransceiverEntity } from '../../../entities';
// import { TransceiverRepository } from '../../../repositories';

// interface CleanTransceiverUseCase {
//     execute( id: TransceiverEntity['id'] ): Promise<TransceiverEntity>
// }

// export class CleanTransceiver implements CleanTransceiverUseCase {
//     constructor(
//         private readonly repository: TransceiverRepository
//     ) {}
//     execute( id: TransceiverEntity['id'] ): Promise<TransceiverEntity> {
//         return this.repository.clean( id )
//     }
// }