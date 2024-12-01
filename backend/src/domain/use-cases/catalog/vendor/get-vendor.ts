import { IVendor } from '../../../../interface';
import { QueriesVendorDTO } from '../../../dtos';
// import { VendorEntity } from '../../../entities';
import { VendorRepository } from '../../../repositories';

export interface GetVendorUseCase {
    execute( id: string, queries?: QueriesVendorDTO ): Promise<IVendor>
}

export class GetVendor implements GetVendorUseCase {
    constructor(
        private readonly repository: VendorRepository
    ) {}
    execute( id: string, queries?: QueriesVendorDTO ): Promise<IVendor> {
        return this.repository.getById( id, queries );
    }
}
// export interface GetVendorUseCase {
//     execute( id: string, queries?: QueriesVendorDTO ): Promise<VendorEntity>
// }

// export class GetVendor implements GetVendorUseCase {
//     constructor(
//         private readonly repository: VendorRepository
//     ) {}
//     execute( id: string, queries?: QueriesVendorDTO ): Promise<VendorEntity> {
//         return this.repository.getById( id, queries );
//     }
// }