import { VendorEntity } from "../../../entities/catalog/vendor.entity";
import { VendorRepository } from "../../../repositories/catalog/vendor.repository";

export interface GetVendorUseCase {
    execute( id: string ): Promise<VendorEntity>
}

export class GetVendor implements GetVendorUseCase {
    constructor(
        private readonly repository: VendorRepository
    ) {}
    execute( id: string ): Promise<VendorEntity> {
        return this.repository.getById( id );
    }
}