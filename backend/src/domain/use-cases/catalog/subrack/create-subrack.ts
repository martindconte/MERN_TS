import { CreateSubrackDTO, CreateVendorDTO } from '../../../dtos';
import { SubrackEntity } from '../../../entities/catalog/subrack.entity';
import { SubrackRepository } from '../../../repositories/catalog/subrack.repository';

export interface CreateSubrackUseCase {
    execute( dto: CreateSubrackDTO ): Promise<SubrackEntity>
}

export class CreateSubrack implements CreateSubrackUseCase {
    constructor(
        private readonly repository: SubrackRepository
    ) {}
    execute( dto: CreateSubrackDTO ): Promise<SubrackEntity> {
        return this.repository.create( dto )
    }
}