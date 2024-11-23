import { IBoardsDeleted } from '../../../../interface';
import { TransceiverRepository } from '../../../repositories';

export interface GetDeletedBoardsUseCase {
    execute(): Promise<IBoardsDeleted>;
};

export class GetDeleteTransceivers implements GetDeletedBoardsUseCase {
    constructor(
        private readonly respository: TransceiverRepository
    ){}
    execute(): Promise<IBoardsDeleted> {
        return this.respository.getAllDeleted();
    }
};