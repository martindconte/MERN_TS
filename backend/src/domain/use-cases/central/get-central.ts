import { ICentral, ICentralResponse } from '../../../interface';
import { CentralRepository } from '../../repositories';

export interface GetCentralUseCase {
    execute( id: string ): Promise<ICentralResponse>
}

export class GetCentral implements GetCentralUseCase {
    constructor(
        private readonly repository: CentralRepository
    ) {}
    execute( id: ICentral['id'] ): Promise<ICentralResponse> {
        return this.repository.getById( id );
    }
}
// import { CentralEntity } from '../../entities';
// import { CentralRepository } from '../../repositories';

// export interface GetCentralUseCase {
//     execute( id: string ): Promise<CentralEntity>
// }

// export class GetCentral implements GetCentralUseCase {
//     constructor(
//         private readonly repository: CentralRepository
//     ) {}
//     execute( id: string ): Promise<CentralEntity> {
//         return this.repository.getById( id );
//     }
// }