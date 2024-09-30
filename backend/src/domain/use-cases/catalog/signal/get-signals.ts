import { SubrackEntityWithPagination } from '../../../../interface';
import { QueriesDTO } from '../../../dtos';
import { SignalEntity, SubrackEntity } from '../../../entities';
import { SignalRepository, SubrackRepository } from '../../../repositories';


export interface GetSignalsUseCase {
    execute(): Promise<SignalEntity[]>
}

export class GetSignals implements GetSignalsUseCase {
    constructor(
        private readonly repository: SignalRepository
    ) {}

    execute(): Promise<SignalEntity[]> {
        return this.repository.getAll();
    }
}