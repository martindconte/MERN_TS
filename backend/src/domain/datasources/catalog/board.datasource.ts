import { BoardEntityWithPagination } from '../../../interface';
import { CreateBoardDTO, QueriesDTO, UpdateBoardDTO } from '../../dtos';
import { BoardEntity } from '../../entities';

export abstract class BoardDatasource {
    abstract create( createBoardDTO: CreateBoardDTO ): Promise<BoardEntity>;
    abstract getAll( queries?: QueriesDTO ): Promise<BoardEntity[] | BoardEntityWithPagination>;
    abstract getById( id: BoardEntity['id'] ): Promise<BoardEntity>;
    abstract updateById( updateTransceiverDTO: UpdateBoardDTO ): Promise<BoardEntity>;
    abstract deleteById( id: BoardEntity['id'] ): Promise<BoardEntity>;
}