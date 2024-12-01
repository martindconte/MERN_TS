import { IVendor } from '../../../../interface';
// import { VendorEntity } from '../../../entities';
import { VendorRepository } from '../../../repositories';

export interface GetVendorsUseCase {
    execute(): Promise<IVendor[]>
}

export class GetVendors implements GetVendorsUseCase {
    constructor(
        private readonly repository: VendorRepository
    ) {}
    execute(): Promise<IVendor[]> {
        return this.repository.getAll();
    }
}

// export interface GetVendorsUseCase {
//     execute(): Promise<VendorEntity[]>
// }

// export class GetVendors implements GetVendorsUseCase {
//     constructor(
//         private readonly repository: VendorRepository
//     ) {}
//     execute(): Promise<VendorEntity[]> {
//         return this.repository.getAll();
//     }
// }