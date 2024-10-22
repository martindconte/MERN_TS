import { BoardEntity } from '../../../entities';
import { BoardRepository } from '../../../repositories';

interface GetBoardUseCase {
    execute( id: BoardEntity['id'] ): Promise <BoardEntity>
}

export class GetBoard implements GetBoardUseCase {
    constructor(
        private readonly repository: BoardRepository 
    ) {}

    execute(id: BoardEntity["id"]): Promise<BoardEntity> {
        return this.repository.getById( id )
    }

}