import { SubrackEntity } from '../../../entities/catalog/subrack.entity';
import { SubrackRepository } from '../../../repositories/catalog/subrack.repository';

export interface DeleteSubrackUseCase {
    execute( id: string ): Promise<SubrackEntity>
}

export class DeleteSubrack implements DeleteSubrackUseCase {
    constructor(
        private readonly repository: SubrackRepository
    ) {}
    execute( id: string ): Promise<SubrackEntity> {
        return this.repository.deleteById( id );
    }
}