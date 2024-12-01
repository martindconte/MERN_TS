import { IBoardsDeleted } from '../../../../interface';
import { BoardRepository } from '../../../repositories';

export interface GetDeletedBoardsUseCase {
    execute(): Promise<IBoardsDeleted>;
};

export class GetDeletedBoards implements GetDeletedBoardsUseCase {
    constructor(
        private readonly respository: BoardRepository
    ){}
    execute(): Promise<IBoardsDeleted> {
        return this.respository.getAllDeleted();
    }
};