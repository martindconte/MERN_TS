import { CentralEntity } from "../../entities/central/central.entity";
import { CentralRepository } from "../../repositories/central/central.repository";

export interface GetCentralUseCase {
    execute( id: string ): Promise<CentralEntity>
}

export class GetCentral implements GetCentralUseCase {
    constructor(
        private readonly repository: CentralRepository
    ) {}
    execute( id: string ): Promise<CentralEntity> {
        return this.repository.getById( id );
    }
}