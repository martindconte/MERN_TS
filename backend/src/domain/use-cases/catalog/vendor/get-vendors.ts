import { VendorEntity } from "../../../entities/catalog/vendor.entity";
import { VendorRepository } from "../../../repositories/catalog/vendor.repository";

export interface GetVendorsUseCase {
    execute(): Promise<VendorEntity[]>
}

export class GetVendors implements GetVendorsUseCase {
    constructor(
        private readonly repository: VendorRepository
    ) {}
    execute(): Promise<VendorEntity[]> {
        return this.repository.getAll();
    }
}