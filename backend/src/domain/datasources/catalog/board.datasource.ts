import { IBoard, IBoardResponse, IBoardsDeleted, IBoardSearch, IBoardsResponse } from '../../../interface';
import { CreateBoardDTO, UpdateBoardDTO } from '../../dtos';

export abstract class BoardDatasource {
    abstract create( createBoardDTO: CreateBoardDTO ): Promise<IBoardResponse>;
    abstract getAll( queries?: IBoardSearch ): Promise<IBoardsResponse>;
    abstract getById( id: IBoard['id'], queries?: IBoardSearch ): Promise<IBoard>;
    abstract updateById( updateBoardDTO: UpdateBoardDTO, queries?: IBoardSearch ): Promise<IBoardResponse>;
    abstract deleteById( id: IBoard['id'] ): Promise<IBoardResponse>;
    abstract getAllDeleted(): Promise<IBoardsDeleted>;
    abstract clean( id: IBoard['id'] ): Promise<IBoardResponse>;
}