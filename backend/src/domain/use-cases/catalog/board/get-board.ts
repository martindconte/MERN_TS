import { IBoard, IBoardSearch } from '../../../../interface';
import { BoardEntity } from '../../../entities';
import { BoardRepository } from '../../../repositories';

interface GetBoardUseCase {
  execute(id: IBoard['id'], queries?: IBoardSearch): Promise<IBoard>;
}

export class GetBoard implements GetBoardUseCase {
  constructor(private readonly repository: BoardRepository) {}
  execute(id: IBoard['id'], queries?: IBoardSearch): Promise<IBoard> {
    return this.repository.getById(id, queries);
  }
  // constructor(
  //     private readonly repository: BoardRepository
  // ) {}

  // execute(id: BoardEntity["id"], queries?: IBoardSearch): Promise<BoardEntity> {
  //     return this.repository.getById( id, queries )
  // }
}
