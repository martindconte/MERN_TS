import { UpdateCentralDTO } from "../../dtos/central/update-central.dto";
import { CentralEntity } from "../../entities/central/central.entity";
import { CentralRepository } from "../../repositories/central/central.repository";

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