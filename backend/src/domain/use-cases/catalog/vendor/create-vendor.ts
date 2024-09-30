import { CreateVendorDTO } from '../../../dtos';
import { VendorEntity } from '../../../entities';
import { VendorRepository } from '../../../repositories';

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