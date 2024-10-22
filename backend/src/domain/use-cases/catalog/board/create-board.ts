import { CreateBoardDTO } from '../../../dtos';
import { BoardEntity } from '../../../entities';
import { BoardRepository } from '../../../repositories';

interface CreateBoardUseCase {
    execute( dto: CreateBoardDTO ): Promise<BoardEntity> 
}

export class CreateBoard implements CreateBoardUseCase{
    constructor(
        private readonly repository: BoardRepository
    ) {}
    execute(dto: CreateBoardDTO): Promise<BoardEntity> {
        return this.repository.create( dto )
    }
}