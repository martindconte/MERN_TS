import { UpdateCentralDTO } from '../../dtos';
import { CentralEntity } from '../../entities';
import { CentralRepository } from '../../repositories';

export interface UpdateCentralUseCase {
    execute( dto: UpdateCentralDTO ): Promise<CentralEntity>
}

export class UpdateCentral implements UpdateCentralUseCase {
    constructor(
        private readonly repository: CentralRepository
    ) {}
    execute( dto: UpdateCentralDTO ): Promise<CentralEntity> {
        return this.repository.updateById( dto );
    }
}