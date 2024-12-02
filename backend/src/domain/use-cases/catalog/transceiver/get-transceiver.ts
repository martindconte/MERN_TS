import { ITransceiver, ITransceiverSearch } from '../../../../interface';
import { TransceiverRepository } from '../../../repositories';

interface GetTransceiverUseCase {
    execute(id: ITransceiver['id'], queries?: ITransceiverSearch): Promise<ITransceiver>
}

export class GetTransceiver implements GetTransceiverUseCase {
    constructor(
        private readonly repository: TransceiverRepository
    ){};
    
    execute(id: ITransceiver['id'], queries?: ITransceiverSearch): Promise<ITransceiver> {
        return this.repository.getById(id, queries)
    };
};
// import { SearchTransceiverDTO } from '../../../dtos';
// import { TransceiverEntity } from '../../../entities';
// import { TransceiverRepository } from '../../../repositories';

// interface GetTransceiverUseCase {
//     execute(id: TransceiverEntity['id'], queries?: SearchTransceiverDTO): Promise<TransceiverEntity>
// }

// export class GetTransceiver implements GetTransceiverUseCase {
//     constructor(
//         private readonly repository: TransceiverRepository
//     ){};
    
//     execute(id: TransceiverEntity['id'], queries?: SearchTransceiverDTO): Promise<TransceiverEntity> {
//         return this.repository.getById(id, queries)
//     };
// };