import { UpdateVendorDTO } from '../../../dtos';
import { VendorEntity } from '../../../entities';
import { VendorRepository } from '../../../repositories';

export interface UpdateCentralUseCase {
    execute( dto: UpdateVendorDTO ): Promise<VendorEntity>
}

export class UpdateCentral implements UpdateCentralUseCase {
    constructor(
        private readonly repository: VendorRepository
    ) {}
    execute( dto: UpdateVendorDTO ): Promise<VendorEntity> {
        return this.repository.updateById( dto );
    }
}