import { SubrackEntityWithPagination } from "../../../datasources/catalog/subrack.datasource";
import { QueriesDTO } from "../../../dtos";
import { SubrackEntity } from "../../../entities/catalog/subrack.entity";
import { SubrackRepository } from "../../../repositories/catalog/subrack.repository";


export interface GetSubracksUseCase {
    execute( queries?: QueriesDTO ): Promise<SubrackEntity[] | SubrackEntityWithPagination>
}

export class GetSubracks implements GetSubracksUseCase {
    constructor(
        private readonly repository: SubrackRepository
    ) {}

    execute( queries?: QueriesDTO ): Promise<SubrackEntity[] | SubrackEntityWithPagination> {
        return this.repository.getAll( queries );
    }
}