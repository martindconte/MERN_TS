import { SignalEntity, SubrackEntity } from '../../../entities';
import { SignalRepository, SubrackRepository } from '../../../repositories';

export interface GetSignalUseCase {
    execute( id: string ): Promise<SignalEntity>
}

export class GetSignal implements GetSignalUseCase {
    constructor(
        private readonly repository: SignalRepository
    ) {}
    execute( id: string ): Promise<SignalEntity> {
        return this.repository.getById( id );
    }
}