import { ITransceiversDeleted } from '../../../../interface';
import { TransceiverRepository } from '../../../repositories';

export interface GetDeletedTransceiversUseCase {
    execute(): Promise<ITransceiversDeleted>;
};

export class GetDeleteTransceivers implements GetDeletedTransceiversUseCase {
    constructor(
        private readonly respository: TransceiverRepository
    ){}
    execute(): Promise<ITransceiversDeleted> {
        return this.respository.getAllDeleted();
    }
};
// import { ITransceiversDeleted } from '../../../../interface';
// import { TransceiverRepository } from '../../../repositories';

// export interface GetDeletedTransceiversUseCase {
//     execute(): Promise<ITransceiversDeleted>;
// };

// export class GetDeleteTransceivers implements GetDeletedTransceiversUseCase {
//     constructor(
//         private readonly respository: TransceiverRepository
//     ){}
//     execute(): Promise<ITransceiversDeleted> {
//         return this.respository.getAllDeleted();
//     }
// };