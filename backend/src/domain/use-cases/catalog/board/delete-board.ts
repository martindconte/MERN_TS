import { BoardEntity } from '../../../entities';
import { BoardRepository } from '../../../repositories';

interface DeleteBoardUseCase {
    execute( id: BoardEntity['id']  ): Promise<BoardEntity>
}

export class DeleteBoard implements DeleteBoardUseCase {
    constructor(
        private readonly repository: BoardRepository
    ) {}
    execute(id: BoardEntity["id"]): Promise<BoardEntity> {
        return this.repository.deleteById( id )
    }
}