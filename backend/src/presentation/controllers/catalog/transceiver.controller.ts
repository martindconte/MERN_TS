import { Request, Response } from 'express';
import { CreateTransceiverDTO, SearchTransceiverDTO, TransceiverRepository, TransceiverUseCase, UpdateTransceiverDTO } from '../../../domain';

export class TransceiverController {

    constructor(
        private readonly transceiverRepository: TransceiverRepository
    ) { };

    create = (req: Request, res: Response) => {
        const [error, transceiverDTO] = CreateTransceiverDTO.create(req.body)
        if (error) return res.status(400).json({ error })
        new TransceiverUseCase.CreateTransceiver(this.transceiverRepository)
            .execute(transceiverDTO!)
            .then(transceiver => res.json({
                status: 'success',
                msg: 'The Tranceiver has been successfully created',
                payload: transceiver
            }))
            .catch(error => res.status(400).json({
                status: 'error',
                msg: error.message
            }));
    };

    getAll = (req: Request, res: Response) => {
        const search = SearchTransceiverDTO.createQueries(req.query);
        new TransceiverUseCase.GetTransceivers(this.transceiverRepository)
            .execute( search )
            .then(transceiver => res.json( transceiver ))
            .catch(error => res.status(400).json({
                status: 'error',
                msg: error.message
            }));
    };

    getAllDeleted = (req: Request, res: Response) => {
        new TransceiverUseCase.GetDeleteTransceivers(this.transceiverRepository)
            .execute()
            .then(transceiver => res.json( transceiver ))
            .catch(error => res.status(400).json({
                status: 'error',
                msg: error.message
            }));
    };

    getById = (req: Request, res: Response) => {
        const { transceiverid } = req.params
        const queries = SearchTransceiverDTO.createQueries(req.query)
        new TransceiverUseCase.GetTransceiver(this.transceiverRepository)
            .execute(transceiverid, queries)
            .then(transceiver => res.json(transceiver))
            .catch(error => res.json(error))
    };

    updateById = (req: Request, res: Response) => {
        const { transceiverid } = req.params;
        const queries = SearchTransceiverDTO.createQueries(req.query)
        console.log('updateQueries ------->', queries);
        const [error, updateTransceiverDTO] = UpdateTransceiverDTO.update({ ...req.body, id: transceiverid });
        if (error) return res.status(400).json({ error });
        new TransceiverUseCase.UpdateTransceiver(this.transceiverRepository)
            .execute(updateTransceiverDTO!, queries)
            .then(tansceiver => res.json({
                msg: 'Transceiver Information has been updated successfully',
                payload: tansceiver,
            }))
            .catch(error => res.status(400).json({
                status: 'error',
                msg: error.message,
            }));
    };

    deleteById = (req: Request, res: Response) => {
        const { transceiverid } = req.params
        new TransceiverUseCase.DeleteTransceiver(this.transceiverRepository)
            .execute(transceiverid)
            .then(transceiver => res.json({
                msg: 'The Subrack has been deteled!',
                payload: transceiver
            }))
            .catch(error => res.status(400).json({
                status: 'error',
                msg: error.message,
            }))
    };

    clean = (req: Request, res: Response) => {
        const { transceiverid } = req.params
        new TransceiverUseCase.CleanTransceiver(this.transceiverRepository)
            .execute(transceiverid)
            .then( transceiver => res.json({
                msg: 'The Transceiver has been permanently deleted. This action cannot be undone',
                payload: transceiver
            }))
            .catch(error => res.status(400).json({
                status: 'error',
                msg: error
            }))
    };
};


