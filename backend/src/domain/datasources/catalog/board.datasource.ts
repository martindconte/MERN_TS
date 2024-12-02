import { /* BoardEntityWithPagination */ IBoard, IBoardResponse, IBoardsDeleted, IBoardSearch, IBoardsResponse } from '../../../interface';
import { CreateBoardDTO, UpdateBoardDTO } from '../../dtos';
import { BoardEntity } from '../../entities';

export abstract class BoardDatasource {
    abstract create( createBoardDTO: CreateBoardDTO ): Promise<IBoardResponse>;
    abstract getAll( queries?: IBoardSearch ): Promise<IBoardsResponse>;
    abstract getById( id: BoardEntity['id'], queries?: IBoardSearch ): Promise<IBoard>;
    abstract updateById( updateBoardDTO: UpdateBoardDTO, queries?: IBoardSearch ): Promise<IBoardResponse>;
    abstract deleteById( id: BoardEntity['id'] ): Promise<IBoardResponse>;
    abstract getAllDeleted(): Promise<IBoardsDeleted>;
    abstract clean( id: BoardEntity['id'] ): Promise<IBoardResponse>;
    // abstract create( createBoardDTO: CreateBoardDTO ): Promise<BoardEntity>;
    // abstract getAll( queries?: IBoardSearch ): Promise<BoardEntity[] | BoardEntityWithPagination>;
    // abstract getById( id: BoardEntity['id'], queries?: IBoardSearch ): Promise<BoardEntity>;
    // abstract updateById( updateBoardDTO: UpdateBoardDTO, queries?: IBoardSearch ): Promise<BoardEntity>;
    // abstract deleteById( id: BoardEntity['id'] ): Promise<BoardEntity>;
    // abstract getAllDeleted(): Promise<IBoardsDeleted>;
    // abstract clean( id: BoardEntity['id'] ): Promise<BoardEntity>;
}