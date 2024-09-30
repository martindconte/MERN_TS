import { SubrackEntityWithPagination } from '../../../../interface';
import { QueriesDTO } from '../../../dtos';
import { SubrackEntity } from '../../../entities';
import { SubrackRepository } from '../../../repositories';


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