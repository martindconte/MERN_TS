import { VendorEntity } from "../../../entities/catalog/vendor.entity";
import { VendorRepository } from "../../../repositories/catalog/vendor.repository";

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