import { ISubrackSearch, ISubracksResponse } from '../../../../interface';
import { SubrackRepository } from '../../../repositories';


export interface GetSubracksUseCase {
    execute( queries: ISubrackSearch ): Promise<ISubracksResponse>
}

export class GetSubracks implements GetSubracksUseCase {
    constructor(
        private readonly repository: SubrackRepository
    ) {}

    execute( queries: ISubrackSearch ): Promise<ISubracksResponse> {
        return this.repository.getAll( queries );
    }
}