import { IBoardResponse } from '../../../../interface';
import { CreateBoardDTO } from '../../../dtos';
import { BoardRepository } from '../../../repositories';

interface CreateBoardUseCase {
  execute(dto: CreateBoardDTO): Promise<IBoardResponse>;
}

export class CreateBoard implements CreateBoardUseCase {
  constructor(private readonly repository: BoardRepository) {}
  execute(dto: CreateBoardDTO): Promise<IBoardResponse> {
    return this.repository.create(dto);
  }
}
