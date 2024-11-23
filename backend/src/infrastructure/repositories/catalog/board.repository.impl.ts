import { BoardDatasource, BoardEntity, BoardRepository, CreateBoardDTO, QueriesDTO, UpdateBoardDTO } from '../../../domain';
import { BoardEntityWithPagination, IBoardsDeleted, IBoardSearch } from '../../../interface';

export class BoardRepositoyImpl implements BoardRepository {

    constructor(
        private readonly datasource: BoardDatasource
    ){}

    create(createBoardDTO: CreateBoardDTO): Promise<BoardEntity> {
        return this.datasource.create( createBoardDTO )
    }
    getAll(queries?: IBoardSearch): Promise<BoardEntity[] | BoardEntityWithPagination> {
        return this.datasource.getAll( queries )
    }
    getById(id: BoardEntity['id'], queries?: IBoardSearch): Promise<BoardEntity> {
        return this.datasource.getById( id, queries )
    }
    updateById(UpdateBoardDTO: UpdateBoardDTO, queries?: IBoardSearch): Promise<BoardEntity> {
        return this.datasource.updateById( UpdateBoardDTO, queries )
    }
    deleteById(id: BoardEntity['id']): Promise<BoardEntity> {
        return this.datasource.deleteById( id )
    }
    getAllDeleted(): Promise<IBoardsDeleted> {
        return this.datasource.getAllDeleted()
    }
    clean(id: BoardEntity['id']): Promise<BoardEntity> {
        return this.datasource.clean( id )
    }

    // constructor(
    //     private readonly datasource: BoardDatasource
    // ){}
    // getAllDeleted(): Promise<IBoardsDeleted> {
    //     throw new Error('Method not implemented.');
    // }
    // clean(id: BoardEntity['id']): Promise<BoardEntity> {
    //     throw new Error('Method not implemented.');
    // }

    // create(createBoardDTO: CreateBoardDTO): Promise<BoardEntity> {
    //     return this.datasource.create( createBoardDTO )
    // }
    // getAll(queries?: QueriesDTO): Promise<BoardEntity[] | BoardEntityWithPagination> {
    //     return this.datasource.getAll( queries )
    // }
    // getById(id: BoardEntity['id']): Promise<BoardEntity> {
    //     return this.datasource.getById( id )
    // }
    // updateById(updateTransceiverDTO: UpdateBoardDTO): Promise<BoardEntity> {
    //     return this.datasource.updateById( updateTransceiverDTO )
    // }
    // deleteById(id: BoardEntity['id']): Promise<BoardEntity> {
    //     return this.datasource.deleteById( id )
    // }

}