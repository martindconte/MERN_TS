import { CentralEntityWithPagination } from "../../datasources/central/central.datasource";
import { QueriesDTO } from "../../dtos/shared/queries.dto";
import { CentralEntity } from "../../entities/central/central.entity";
import { CentralRepository } from "../../repositories/central/central.repository";

export interface GetCentralsUseCase {
    execute( queries?: QueriesDTO ): Promise<CentralEntity[] | CentralEntityWithPagination>
}

export class GetCentrals implements GetCentralsUseCase {
    constructor(
        private readonly repository: CentralRepository
    ) {}
    execute( queries?: QueriesDTO ): Promise<CentralEntity[] | CentralEntityWithPagination> {
        return this.repository.getAll( queries);
    }
}