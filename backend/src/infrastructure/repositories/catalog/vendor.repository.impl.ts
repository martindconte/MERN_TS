import { CreateVendorDTO, QueriesVendorDTO, UpdateVendorDTO, VendorDataSource, VendorEntity, VendorRepository } from '../../../domain';
import { IVendorsDeleted } from '../../../interface';

export class VendorRepositoryImpl implements VendorRepository {

    constructor(
        private readonly datasource: VendorDataSource
    ) {}
    create(createVendorDTO: CreateVendorDTO): Promise<VendorEntity> {
        return this.datasource.create( createVendorDTO )
    };
    getAll(): Promise<VendorEntity[]> {
        return this.datasource.getAll()
    };
    getAllDeleted(): Promise<IVendorsDeleted> {
        return this.datasource.getAllDeleted()
    };
    getById(id: VendorEntity['id'], queries?: QueriesVendorDTO): Promise<VendorEntity> {
        return this.datasource.getById( id, queries )
    };
    updateById(updateVendorDTO: UpdateVendorDTO, queries?: QueriesVendorDTO): Promise<VendorEntity> {
        return this.datasource.updateById( updateVendorDTO, queries )
    };
    deleteById(id: VendorEntity['id']): Promise<VendorEntity> {
        return this.datasource.deleteById( id )
    };
    cleanVendor( id: VendorEntity['id'] ): Promise<VendorEntity> {
        return this.datasource.cleanVendor( id )
    }

}