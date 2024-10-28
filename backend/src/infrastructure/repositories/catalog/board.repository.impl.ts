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
        return this.datasource.getAll( queries )
    }
    getById(id: BoardEntity['id']): Promise<BoardEntity> {
        return this.datasource.getById( id )
    }
    updateById(updateTransceiverDTO: UpdateBoardDTO): Promise<BoardEntity> {
        return this.datasource.updateById( updateTransceiverDTO )
    }
    deleteById(id: BoardEntity['id']): Promise<BoardEntity> {
        return this.datasource.deleteById( id )
    }

}