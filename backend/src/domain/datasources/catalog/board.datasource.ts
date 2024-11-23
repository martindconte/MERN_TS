import { BoardEntityWithPagination, IBoardsDeleted, IBoardSearch } from '../../../interface';
import { CreateBoardDTO, UpdateBoardDTO } from '../../dtos';
import { BoardEntity } from '../../entities';

export abstract class BoardDatasource {
    abstract create( createBoardDTO: CreateBoardDTO ): Promise<BoardEntity>;
    abstract getAll( queries?: IBoardSearch ): Promise<BoardEntity[] | BoardEntityWithPagination>;
    abstract getById( id: BoardEntity['id'], queries?: IBoardSearch ): Promise<BoardEntity>;
    abstract updateById( updateBoardDTO: UpdateBoardDTO, queries?: IBoardSearch ): Promise<BoardEntity>;
    abstract deleteById( id: BoardEntity['id'] ): Promise<BoardEntity>;
    abstract getAllDeleted(): Promise<IBoardsDeleted>;
    abstract clean( id: BoardEntity['id'] ): Promise<BoardEntity>;
}