import { BoardDatasource, BoardRepository, CreateBoardDTO, UpdateBoardDTO } from '../../../domain';
import { IBoard, IBoardResponse, IBoardsDeleted, IBoardSearch, IBoardsResponse } from '../../../interface';

export class BoardRepositoyImpl implements BoardRepository {
  constructor(private readonly datasource: BoardDatasource) {}
  create(createBoardDTO: CreateBoardDTO): Promise<IBoardResponse> {
    return this.datasource.create(createBoardDTO);
  }
  getAll(queries?: IBoardSearch): Promise<IBoardsResponse> {
    return this.datasource.getAll(queries);
  }
  getById(id: IBoard['id'], queries?: IBoardSearch): Promise<IBoard> {
    return this.datasource.getById(id, queries);
  }
  updateById(updateBoardDTO: UpdateBoardDTO, queries?: IBoardSearch): Promise<IBoardResponse> {
    return this.datasource.updateById(updateBoardDTO, queries);
  }
  deleteById(id: IBoard['id']): Promise<IBoardResponse> {
    return this.datasource.deleteById(id);
  }
  getAllDeleted(): Promise<IBoardsDeleted> {
    return this.datasource.getAllDeleted();
  }
  clean(id: IBoard['id']): Promise<IBoardResponse> {
    return this.datasource.clean(id);
  }
}
