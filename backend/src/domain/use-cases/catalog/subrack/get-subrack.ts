import { SubrackEntity } from '../../../entities';
import { SubrackRepository } from '../../../repositories';

export interface GetSubrackUseCase {
    execute( id: string ): Promise<SubrackEntity>
}

export class GetSubrack implements GetSubrackUseCase {
    constructor(
        private readonly repository: SubrackRepository
    ) {}
    execute( id: string ): Promise<SubrackEntity> {
        return this.repository.getById( id );
    }
}