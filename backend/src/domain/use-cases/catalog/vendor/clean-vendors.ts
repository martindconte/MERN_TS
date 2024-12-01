import { IVendor } from '../../../../interface';
import { VendorEntity } from '../../../entities';
import { VendorRepository } from '../../../repositories';

export interface CleanVendorUseCase {
    execute( id: IVendor['id'] ): Promise<IVendor>;
};

export class CleanVendor implements CleanVendorUseCase {
    constructor(
        private readonly respository: VendorRepository
    ){}
    execute( id: IVendor['id'] ): Promise<IVendor> {
        return this.respository.cleanVendor( id );
    }
};
// export interface CleanVendorUseCase {
//     execute( id: VendorEntity['id'] ): Promise<VendorEntity>;
// };

// export class CleanVendor implements CleanVendorUseCase {
//     constructor(
//         private readonly respository: VendorRepository
//     ){}
//     execute( id: VendorEntity['id'] ): Promise<VendorEntity> {
//         return this.respository.cleanVendor( id );
//     }
// };