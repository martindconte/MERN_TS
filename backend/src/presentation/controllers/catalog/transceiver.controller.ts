import { Request, Response } from 'express';
import { CreateTransceiverDTO, SearchTransceiverDTO, TransceiverRepository, TransceiverUseCase, UpdateTransceiverDTO } from '../../../domain';

export class TransceiverController {
    
    constructor(
        private readonly transceiverRepository: TransceiverRepository
    ) {}

    create = ( req: Request, res: Response ) => {
        const [ error, transceiverDTO ] = CreateTransceiverDTO.create( req.body )
        if( error ) return res.status(400).json({ error })
        new TransceiverUseCase.CreateTransceiver( this.transceiverRepository )
            .execute( transceiverDTO! )
            .then( transceiver => res.json({
                status: 'success',
                msg: 'The Tranceiver has been successfully created',
                payload: transceiver
            }))
            .catch(error => res.status(400).json({
                status: 'error',
                msg: error.message
            }));
    };

    getAll = ( req: Request, res: Response ) => {
        console.log('req.query', req.query);
        const search = SearchTransceiverDTO.createQueries( req.query );
        new TransceiverUseCase.GetTransceivers( this.transceiverRepository )
            .execute( search )
            .then( subracks => res.json( subracks ))
            .catch(error => res.status(400).json({
                status: 'error',
                msg: error.message
            }));
    };

    getById = ( req: Request, res: Response ) => {
        const { transceiverid } = req.params
        new TransceiverUseCase.GetTransceiver( this.transceiverRepository )
            .execute( transceiverid )
            .then( transceiver => res.json(transceiver) )
            .catch( error => res.json( error ) )
    };

    updateById = ( req: Request, res: Response ) => {
        const { transceiverid } = req.params;
        const [ error, updateTransceiverDTO ] = UpdateTransceiverDTO.update({ ...req.body, id: transceiverid });
        if ( error ) return res.status(400).json({ error });
        new TransceiverUseCase.UpdateTransceiver( this.transceiverRepository )
            .execute( updateTransceiverDTO! )
            .then(tansceiver => res.json({
                msg: 'Transceiver Information has been updated successfully',
                payload: tansceiver,
            }))
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error.message,
            }));
    };

    deleteById = ( req: Request, res: Response ) => {
        const { transceiverid } = req.params
        new TransceiverUseCase.DeleteTransceiver( this.transceiverRepository )
            .execute( transceiverid )
            .then( transceiver => res.json({
                msg: 'The Subrack has been deteled!',
                payload: transceiver
            }) )
            .catch( error => res.status(400).json({
                status: 'error',
                msg: error.message,
            }))
    };
}