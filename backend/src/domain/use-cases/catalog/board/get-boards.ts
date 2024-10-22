import { BoardEntity, TransceiverEntity } from '../../../entities';
import { BoardRepository, TransceiverRepository } from '../../../repositories';
import { QueriesDTO } from '../../../dtos';
import { BoardEntityWithPagination, TransceiverEntityWithPagination } from '../../../../interface';


export interface GetBoardsUseCase {
    execute( queries?: QueriesDTO ): Promise<BoardEntity[] | BoardEntityWithPagination>
}

export class GetBoards implements GetBoardsUseCase {
    constructor(
        private readonly repository: BoardRepository
    ) {}
    execute( queries?: QueriesDTO ): Promise<BoardEntity[] | BoardEntityWithPagination> {
        return this.repository.getAll( queries );
    }
}