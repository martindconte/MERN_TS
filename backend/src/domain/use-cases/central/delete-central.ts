import { CentralEntity } from "../../entities/central/central.entity";
import { CentralRepository } from "../../repositories/central/central.repository";

export interface DeleteCentralUseCase {
    execute( id: string ): Promise<CentralEntity>
}

export class DeleteCentral implements DeleteCentralUseCase {
    constructor(
        private readonly repository: CentralRepository
    ) {}
    execute( id: string ): Promise<CentralEntity> {
        return this.repository.delete( id );
    }
}