import { BoardDatasource, BoardEntity, BoardRepository, CreateBoardDTO, QueriesDTO, UpdateBoardDTO } from '../../../domain';
import { BoardEntityWithPagination } from '../../../interface';

export class BoardRepositoyImpl implements BoardRepository {

    constructor(
        private readonly datasource: BoardDatasource
    ){}

    create(createBoardDTO: CreateBoardDTO): Promise<BoardEntity> {
        return this.datasource.create( createBoardDTO )
    }
    getAll(queries?: QueriesDTO): Promise<BoardEntity[] | BoardEntityWithPagination> {
        throw new Error('Method not implemented.');
    }
    getById(id: BoardEntity['id']): Promise<BoardEntity> {
        throw new Error('Method not implemented.');
    }
    updateById(updateTransceiverDTO: UpdateBoardDTO): Promise<BoardEntity> {
        throw new Error('Method not implemented.');
    }
    deleteById(id: BoardEntity['id']): Promise<BoardEntity> {
        throw new Error('Method not implemented.');
    }

}