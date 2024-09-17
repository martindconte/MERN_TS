import { Request, Response } from "express";
import { CreateSubrackDTO, SearchSubrackDTO, SubrackRepository, SubrackUseCase, UpdateSubrackDTO } from "../../../domain";

export class SubrackController {

    constructor(
        private readonly subrackRepository: SubrackRepository
    ) { }

    createSubrack = (req: Request, res: Response) => {
        const [error, subrackDTO] = CreateSubrackDTO.create(req.body)
        if (error) return res.status(400).json({ error })

        new SubrackUseCase.CreateSubrack( this.subrackRepository )
            .execute( subrackDTO! )
            .then( subrack => res.json(subrack) )
            .catch( error => res.status(400).json({ error }) )
    }

    getAllSubracks = ( req: Request, res: Response ) => {
        const search = SearchSubrackDTO.create( req.query )
        new SubrackUseCase.GetSubracks( this.subrackRepository )
            .execute( search )
            .then( subracks => res.json(subracks) )
            .catch( error => res.status(400).json({ error }) )

    }

    getSubrackById = ( req: Request, res: Response ) => {
        const { subrackid } = req.params
        new SubrackUseCase.GetSubrack( this.subrackRepository )
            .execute( subrackid )
            .then( subrack => res.json(subrack) )
            .catch( error => res.status(400).json({ error }) )
    }

    updateSubrackById = ( req: Request, res: Response ) => {
        const { subrackid } = req.params
        const [ error, updateSubrackDTO ] = UpdateSubrackDTO.create({ ...req.body, subrackid })
        if (error) return res.status(400).json({ error })
        new SubrackUseCase.UpdateSubrack( this.subrackRepository )
            .execute( updateSubrackDTO! )
            .then( subrack => res.json(subrack) )
            .catch( error => res.status(400).json({ error }) );
    }

    deleteSubrackById = ( req: Request, res: Response ) => {
        const { subrackid } = req.params

        new SubrackUseCase.DeleteSubrack( this.subrackRepository )
            .execute( subrackid )
            .then( subrack => res.json(subrack) )
            .catch( error => res.status(400).json({ error }) );

    }


}
