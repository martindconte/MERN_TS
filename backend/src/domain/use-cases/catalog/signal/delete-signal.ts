import { SignalEntity, VendorEntity } from '../../../entities';
import { SignalRepository, VendorRepository } from '../../../repositories';

export interface DeleteSignalUseCase {
    execute( id: string ): Promise<SignalEntity>
}

export class DeleteSignal implements DeleteSignalUseCase {
    constructor(
        private readonly repository: SignalRepository
    ) {}
    execute( id: string ): Promise<SignalEntity> {
        return this.repository.deleteById( id );
    }
}