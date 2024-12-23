import { Request, Response } from 'express';
import { CreateCentralDTO, CentralUseCase, UpdateCentralDTO, CentralRepository, SearchCentralDTO } from '../../../domain'

export class CentralController {

    // DI
    constructor(
        private readonly centralRepository: CentralRepository
    ) { }

    createCentral = (req: Request, res: Response) => {
        const [error, centralDTO] = CreateCentralDTO.create(req.body)
        if (error) return res.status(400).json({
            status: 'error',
            msg: error
        })

        new CentralUseCase.CreateCentral(this.centralRepository)
            .execute( centralDTO! )
            .then(central => res.json({
                status: 'success',
                msg: 'The Central has been successfully created',
                payload: central
            }))
            .catch(error => res.status(400).json({
                status: 'error',
                msg: error
            }))
    }

    getAllCentrals = (req: Request, res: Response) => {
        const search = SearchCentralDTO.createQueries( req.query )
        new CentralUseCase.GetCentrals(this.centralRepository)
            .execute( search )
            .then(centrals => res.send( centrals ))
            .catch(error => res.status(400).json({
                status: 'error',
                msg: error.message
            }))
    }

    getCentralsById = (req: Request, res: Response) => {
        const { centralid } = req.params

        new CentralUseCase.GetCentral(this.centralRepository)
            .execute(centralid)
            .then(central => res.json(central))
            .catch(error => res.status(400).json({ error }))
    }

    updateCentral = (req: Request, res: Response) => {
        const { centralid } = req.params
        const [error, updateCentralDTO] = UpdateCentralDTO.update({ id: centralid, ...req.body })
        if (error) return res.status(400).json({ error })
        
        new CentralUseCase.UpdateCentral(this.centralRepository)
            .execute( updateCentralDTO! )
            .then(central => res.json({
                status: 'success',
                msg: 'The Central has been updated successfully',
                payload: central
            }))
            .catch(error => res.status(400).json({
                status: 'error',
                msg: error.message
            }))
    }

    deleteCentral = (req: Request, res: Response) => {
        const { centralid } = req.params

        new CentralUseCase.DeleteCentral(this.centralRepository)
            .execute(centralid)
            .then(central => res.json({
                status: 'success',
                msg: 'The Central has been deleted successfully',
                payload: central
            }))
            .catch(error => res.status(400).json({
                status: 'error',
                msg: error.message
            }))
    }
}