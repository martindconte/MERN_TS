import { BoardRepository } from '../../../repositories';
import { IBoardSearch, IBoardsResponse } from '../../../../interface';

export interface GetBoardsUseCase {
  execute(queries?: IBoardSearch): Promise<IBoardsResponse>;
}

export class GetBoards implements GetBoardsUseCase {
  constructor(private readonly repository: BoardRepository) {}
  execute(queries?: IBoardSearch): Promise<IBoardsResponse> {
    return this.repository.getAll(queries);
  }
}
