import { Request, Response } from 'express';
import { BoardRepository, BoardUseCase, CreateBoardDTO } from '../../../domain';

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

    }
    getById = ( req: Request, res: Response ) => {

    }
    updateById = ( req: Request, res: Response ) => {

    }
    deleteById = ( req: Request, res: Response ) => {

    }
}