import { CreateVendorDTO, UpdateVendorDTO, VendorDataSource, VendorEntity, VendorRepository } from '../../../domain';

export class VendorRepositoryImpl implements VendorRepository {

    constructor(
        private readonly datasource: VendorDataSource
    ) {}

    create(createVendorDTO: CreateVendorDTO): Promise<VendorEntity> {
        return this.datasource.create( createVendorDTO )
    }
    getAll(): Promise<VendorEntity[]> {
        return this.datasource.getAll()
    }
    getById(id: string): Promise<VendorEntity> {
        return this.datasource.getById( id )
    }
    updateById(updateVendorDTO: UpdateVendorDTO): Promise<VendorEntity> {
        return this.datasource.updateById( updateVendorDTO )
    }
    deleteById(id: string): Promise<VendorEntity> {
        return this.datasource.deleteById( id )
    }

}