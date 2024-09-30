import { UpdateSignalDTO } from '../../../dtos';
import { SignalEntity } from '../../../entities';
import { SignalRepository } from '../../../repositories';

export interface UpdateSignalUseCase {
    execute( dto: UpdateSignalDTO ): Promise<SignalEntity>
}

export class UpdateSignal implements UpdateSignalUseCase {
    constructor(
        private readonly repository: SignalRepository
    ) {}
    execute( dto: UpdateSignalDTO ): Promise<SignalEntity> {
        return this.repository.updateById( dto );
    }
}