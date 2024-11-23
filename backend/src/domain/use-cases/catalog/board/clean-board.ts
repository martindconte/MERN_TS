import { BoardEntity } from '../../../entities';
import { BoardRepository } from '../../../repositories';

interface CleanBoardUseCase {
    execute( id: BoardEntity['id']  ): Promise<BoardEntity>
}

export class DeleteBoard implements CleanBoardUseCase {
    constructor(
        private readonly repository: BoardRepository
    ) {}
    execute(id: BoardEntity["id"]): Promise<BoardEntity> {
        return this.repository.clean( id );
    };
};