import { SubrackEntity } from '../../../entities/catalog/subrack.entity';
import { SubrackRepository } from '../../../repositories/catalog/subrack.repository';

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