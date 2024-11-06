import { Request, Response } from 'express';
import { BoardRepository, BoardUseCase, CreateBoardDTO, SearchBoardDTO } from '../../../domain';

export class BoardController {
    constructor(
        private readonly boardRepository: BoardRepository
    ) {}

    create = ( req: Request, res: Response ) => {
        const [ error, boardDTO ] = CreateBoardDTO.create( req.body )
        if( error ) return res.status(400).json({ error })
        new BoardUseCase.CreateBoard( this.boardRepository )
            .execute( boardDTO! )
            .then( board => res.json({
                status: 'success',
                msg: 'The Board has been registred successfully',
                payload: board
            }))
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error.message
            }) )
    }
    getAll = ( req: Request, res: Response ) => {
        const search = SearchBoardDTO.createQueries( req.query )
        new BoardUseCase.GetBoards( this.boardRepository )
        .execute( search )
        .then( boards => res.json( boards ))
        .catch(error => res.status(400).json({
            status: 'error',
            msg: error.message
        }));
    }
    getById = ( req: Request, res: Response ) => {
        const { boardid } = req.params;
        new BoardUseCase.GetBoard( this.boardRepository )
            .execute( boardid )
            .then( board => res.json({
                status: 'success',
                msg: 'The Board has been registred successfully',
                payload: board
            }))
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error.message
            }));

    }
    updateById = ( req: Request, res: Response ) => {

    }
    deleteById = ( req: Request, res: Response ) => {

    }
}