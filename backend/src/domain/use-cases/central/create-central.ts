import { CreateCentralDTO } from "../../dtos/central/create-central.dto";
import { CentralEntity } from "../../entities/central/central.entity";
import { CentralRepository } from "../../repositories/central/central.repository";

export interface CreateCentralUseCase {
    execute( dto: CreateCentralDTO ): Promise<CentralEntity>
}

export class CreateCentral implements CreateCentralUseCase {
    constructor(
        private readonly repository: CentralRepository
    ) {}
    execute( dto: CreateCentralDTO ): Promise<CentralEntity> {
        return this.repository.create( dto );
    }
}