import { UpdateSubrackDTO } from '../../../dtos';
import { SubrackEntity } from '../../../entities';
import { SubrackRepository } from '../../../repositories';

export interface UpdateSubrackUseCase {
    execute( dto: UpdateSubrackDTO ): Promise<SubrackEntity>
}

export class UpdateSubrack implements UpdateSubrackUseCase {
    constructor(
        private readonly repository: SubrackRepository
    ) {}
    execute( dto: UpdateSubrackDTO ): Promise<SubrackEntity> {
        return this.repository.updateById( dto );
    }
}