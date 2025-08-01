import { ICentral, ICentralResponse } from '../../../interface';
import { CentralEntity } from '../../entities';
import { CentralRepository } from '../../repositories';

export interface DeleteCentralUseCase {
    execute( id: ICentral['id'] ): Promise<ICentralResponse>
}

export class DeleteCentral implements DeleteCentralUseCase {
    constructor(
        private readonly repository: CentralRepository
    ) {}
    execute( id: ICentral['id'] ): Promise<ICentralResponse> {
        return this.repository.delete( id );
    }
}
// import { CentralEntity } from '../../entities';
// import { CentralRepository } from '../../repositories';

// export interface DeleteCentralUseCase {
//     execute( id: string ): Promise<CentralEntity>
// }

// export class DeleteCentral implements DeleteCentralUseCase {
//     constructor(
//         private readonly repository: CentralRepository
//     ) {}
//     execute( id: string ): Promise<CentralEntity> {
//         return this.repository.delete( id );
//     }
// }