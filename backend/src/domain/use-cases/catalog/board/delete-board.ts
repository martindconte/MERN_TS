import { IBoard, IBoardResponse } from '../../../../interface';
import { BoardRepository } from '../../../repositories';

interface DeleteBoardUseCase {
  execute(id: IBoard['id']): Promise<IBoardResponse>;
}

export class DeleteBoard implements DeleteBoardUseCase {
  constructor(private readonly repository: BoardRepository) {}
  execute(id: IBoard['id']): Promise<IBoardResponse> {
    return this.repository.deleteById(id);
  }
}
