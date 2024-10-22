import { Request, Response } from 'express';
import { CreateSignalDTO, SignalRepository, SignalUseCase, UpdateSignalDTO } from '../../../domain';

export class SignalController {

    constructor(
        private readonly signalRepository: SignalRepository
    ) {}

    createSignal = ( req: Request, res: Response ) => {
        const [ error, signalDTO ] = CreateSignalDTO.create( req.body )
        if( error ) return res.status(400).json({ error })
        
        new SignalUseCase.CreateSignal( this.signalRepository )
            .execute( signalDTO! )
            .then( vendor => res.json({
                status: 'success',
                msg: 'The Vendor has been registred successfully',
                payload: vendor
            }))
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error.message
            }) )
    }

    getAllSignals = ( req: Request, res: Response ) => {
        new SignalUseCase.GetSignals( this.signalRepository )
            .execute()
            .then( signals => res.json( signals ) )
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error.message
            }) )
    }

    getSignalById = ( req: Request, res: Response ) => {
        const { vendorid } = req.params
        new SignalUseCase.GetSignal( this.signalRepository )
            .execute( vendorid )
            .then( signal => res.json( signal ) )
            .catch( error => res.status(400).json({ error }) )
    }

    updateSignal = ( req: Request, res: Response ) => {
        const { signalid } = req.params
        const [ error, updateSignalDTO ] = UpdateSignalDTO.create({ id: signalid, ...req.body })
        if( error ) return res.status(400).json({ error })
        
        new SignalUseCase.UpdateSignal( this.signalRepository )
            .execute( updateSignalDTO! )
            .then( signal => res.json({
                msg: 'Signal Information has been updated successfully',
                payload: signal
            }))
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error
            }))
    }

    deleteSignal = ( req: Request, res: Response ) => {
        const { signalid } = req.params

        new SignalUseCase.DeleteSignal( this.signalRepository )
            .execute( signalid )
            .then( signal => res.json({
                msg: 'The Signal has been deleted successfully',
                payload: signal
            }))
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error
            }))
    }
}