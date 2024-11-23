import { IBoardSearch } from '../../../../interface';
import { BoardEntity } from '../../../entities';
import { BoardRepository } from '../../../repositories';

interface GetBoardUseCase {
    execute( id: BoardEntity['id'], queries?: IBoardSearch ): Promise <BoardEntity>
}

export class GetBoard implements GetBoardUseCase {
    constructor(
        private readonly repository: BoardRepository 
    ) {}

    execute(id: BoardEntity["id"], queries?: IBoardSearch): Promise<BoardEntity> {
        return this.repository.getById( id, queries )
    }

}