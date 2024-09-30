import { VendorEntity } from '../../../entities';
import { VendorRepository } from '../../../repositories';

export interface DeleteVendorUseCase {
    execute( id: string ): Promise<VendorEntity>
}

export class DeleteVendor implements DeleteVendorUseCase {
    constructor(
        private readonly repository: VendorRepository
    ) {}
    execute( id: string ): Promise<VendorEntity> {
        return this.repository.deleteById( id );
    }
}