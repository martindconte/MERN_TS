import { BoardEntity } from '../../../entities';
import { BoardRepository } from '../../../repositories';
import { QueriesDTO, SearchBoardDTO } from '../../../dtos';
import { BoardEntityWithPagination, IBoardSearch } from '../../../../interface';


export interface GetBoardsUseCase {
    execute( queries?: IBoardSearch ): Promise<BoardEntity[] | BoardEntityWithPagination>
}

export class GetBoards implements GetBoardsUseCase {
    constructor(
        private readonly repository: BoardRepository
    ) {}
    execute( queries?: IBoardSearch ): Promise<BoardEntity[] | BoardEntityWithPagination> {
        return this.repository.getAll( queries );
    }
}