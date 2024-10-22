import { UpdateBoardDTO } from '../../../dtos';
import { BoardEntity } from '../../../entities';
import { BoardRepository } from '../../../repositories';

interface UpdateBoardUseCase {
    execute( dto: UpdateBoardDTO ): Promise<BoardEntity>
}

export class UpdateBoard implements UpdateBoardUseCase {
    constructor(
        private readonly repository: BoardRepository
    ) {}
    execute(dto: UpdateBoardDTO): Promise<BoardEntity> {
        return this.repository.updateById( dto )
    }
}