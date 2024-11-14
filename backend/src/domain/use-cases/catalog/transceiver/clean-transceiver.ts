import { TransceiverEntity } from '../../../entities';
import { TransceiverRepository } from '../../../repositories';

interface CleanTransceiverUseCase {
    execute( id: TransceiverEntity['id'] ): Promise<TransceiverEntity>
}

export class CleanTransceiver implements CleanTransceiverUseCase {
    constructor(
        private readonly repository: TransceiverRepository
    ) {}
    execute( id: TransceiverEntity['id'] ): Promise<TransceiverEntity> {
        return this.repository.clean( id )
    }
}