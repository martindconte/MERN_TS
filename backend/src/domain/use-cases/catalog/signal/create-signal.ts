import { CreateSignalDTO } from '../../../dtos'
import { SignalEntity } from '../../../entities'
import { SignalRepository } from '../../../repositories'

export interface CreateSignalUseCase {
    execute( dto: CreateSignalDTO ): Promise<SignalEntity>
}

export class CreateSignal implements CreateSignalUseCase {
    constructor(
        private readonly repository: SignalRepository
    ) {}
    execute( dto: CreateSignalDTO ): Promise<SignalEntity> {
        return this.repository.create( dto )
    }
}