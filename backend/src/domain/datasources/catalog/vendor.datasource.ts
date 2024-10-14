import { CreateVendorDTO, UpdateVendorDTO } from '../../dtos'
import { VendorEntity } from '../../entities';

export abstract class VendorDataSource {
    abstract create( createVendorDTO: CreateVendorDTO ): Promise<VendorEntity>
    abstract getAll(): Promise<VendorEntity[]>
    abstract getById( id: VendorEntity['id'] ): Promise<VendorEntity>
    abstract updateById( updateVendorDTO: UpdateVendorDTO ): Promise<VendorEntity>
    abstract deleteById( id: VendorEntity['id'] ): Promise<VendorEntity>
}