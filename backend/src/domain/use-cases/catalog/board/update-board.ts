import { IBoardSearch } from '../../../../interface';
import { UpdateBoardDTO } from '../../../dtos';
import { BoardEntity } from '../../../entities';
import { BoardRepository } from '../../../repositories';

interface UpdateBoardUseCase {
  execute(dto: UpdateBoardDTO, queries?: IBoardSearch): Promise<BoardEntity>;
}

export class UpdateBoard implements UpdateBoardUseCase {
  constructor(private readonly repository: BoardRepository) {}
  execute(dto: UpdateBoardDTO, queries?: IBoardSearch): Promise<BoardEntity> {
    return this.repository.updateById(dto, queries);
  }
}
