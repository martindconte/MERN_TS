import { IBoard, IBoardResponse } from '../../../../interface';
import { BoardRepository } from '../../../repositories';

interface CleanBoardUseCase {
  execute(id: IBoard['id']): Promise<IBoardResponse>;
}

export class CleanBoard implements CleanBoardUseCase {
  constructor(private readonly repository: BoardRepository) {}
  execute(id: IBoard['id']): Promise<IBoardResponse> {
    return this.repository.clean(id);
  }
}
// export class DeleteBoard implements CleanBoardUseCase {
//     constructor(
//         private readonly repository: BoardRepository
//     ) {}
//     execute(id: BoardEntity["id"]): Promise<BoardEntity> {
//         return this.repository.clean( id );
//     };
// };
