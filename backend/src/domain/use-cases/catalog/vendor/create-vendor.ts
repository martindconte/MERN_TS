import { CreateVendorDTO } from "../../../dtos";
import { VendorEntity } from "../../../entities/catalog/vendor.entity";
import { VendorRepository } from "../../../repositories/catalog/vendor.repository";

export interface CreateVendorUseCase {
    execute( dto: CreateVendorDTO ): Promise<VendorEntity>
}

export class CreateVendor implements CreateVendorUseCase {
    constructor(
        private readonly repository: VendorRepository
    ) {}
    execute( dto: CreateVendorDTO ): Promise<VendorEntity> {
        return this.repository.create( dto );
    }
}