import { QueriesVendorDTO, UpdateVendorDTO } from '../../../dtos';
import { VendorEntity } from '../../../entities';
import { VendorRepository } from '../../../repositories';

export interface UpdateCentralUseCase {
    execute( dto: UpdateVendorDTO, queries?: QueriesVendorDTO ): Promise<VendorEntity>
}

export class UpdateCentral implements UpdateCentralUseCase {
    constructor(
        private readonly repository: VendorRepository
    ) {}
    execute( dto: UpdateVendorDTO, queries?: QueriesVendorDTO ): Promise<VendorEntity> {
        return this.repository.updateById( dto, queries );
    }
}