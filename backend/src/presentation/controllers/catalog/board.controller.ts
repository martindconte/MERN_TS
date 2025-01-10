import { Request, Response } from 'express';
import { BoardRepository, BoardUseCase, CreateBoardDTO, SearchBoardDTO, UpdateBoardDTO } from '../../../domain';

export class BoardController {
  constructor(private readonly boardRepository: BoardRepository) { }

  create = (req: Request, res: Response) => {
    const [error, boardDTO] = CreateBoardDTO.create(req.body);
    if (error) return res.status(400).json({ error });
    new BoardUseCase.CreateBoard(this.boardRepository)
      .execute(boardDTO!)
      .then((board) => {
        const { id, partNumber, boardName, vendor, description } = board;
        res.json({
          status: 'success',
          msg: 'The Board has been registred successfully',
          payload: { id, partNumber, boardName, vendor, description },
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message || error,
        })
      );
  };

  getAll = (req: Request, res: Response) => {
    const search = SearchBoardDTO.searchBoard(req.query);
    new BoardUseCase.GetBoards(this.boardRepository)
      .execute(search)
      .then((boards) => res.json(boards))
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message,
        })
      );
  };

  getById = (req: Request, res: Response) => {
    const { boardid } = req.params;
    const search = SearchBoardDTO.searchBoard(req.query)
    new BoardUseCase.GetBoard(this.boardRepository)
      .execute(boardid, search)
      .then((board) => res.json(board))
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message || error,
        })
      );
  };

  updateById = (req: Request, res: Response) => {
    // const { boardid } = req.params;
    const search = SearchBoardDTO.searchBoard(req.query);
    const [error, updateBoardDTO] = UpdateBoardDTO.update(req.body);
    if (error) return res.status(400).json({ error });
    new BoardUseCase.UpdateBoard(this.boardRepository)
      .execute(updateBoardDTO!, search)
      .then((board) => {
        const { id, boardName, partNumber, vendor, description } = board;
        res.json({
          msg: 'Board Information has been updated successfully',
          payload: { id, boardName, partNumber, vendor, description },
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message,
        })
      );
  };

  deleteById = (req: Request, res: Response) => {
    const { boardid } = req.params;
    new BoardUseCase.DeleteBoard(this.boardRepository)
      .execute(boardid)
      .then((board) =>
        res.json({
          msg: 'The Board has been deleted, but your data is SAFE. You can restore it at any time',
          payload: board,
        })
      )
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message || error,
        })
      );
  };

  getAllDeleted = (req: Request, res: Response) => {
    new BoardUseCase.GetDeletedBoards(this.boardRepository)
      .execute()
      .then(board => res.json(board))
      .catch(error => res.status(400).json({
        status: 'error',
        msg: error.message
      }));
  };

  cleanById = (req: Request, res: Response) => {
    const { boardid } = req.params;
    new BoardUseCase.CleanBoard( this.boardRepository )
      .execute( boardid )
      .then((board) =>
        res.json({
          msg: 'The Board has been permanently deleted. This action cannot be undone',
          payload: board,
        })
      )
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message || error,
        })
      );
  }
}
