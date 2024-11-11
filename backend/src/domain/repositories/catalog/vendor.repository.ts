import { IVendorsDeleted } from '../../../interface';
import { CreateVendorDTO, QueriesVendorDTO, UpdateVendorDTO } from '../../dtos'
import { VendorEntity } from '../../entities';

export abstract class VendorRepository {
    abstract cleanVendor( id: VendorEntity['id'] ): Promise<VendorEntity>;
    abstract create( createVendorDTO: CreateVendorDTO ): Promise<VendorEntity>;
    abstract getAll(): Promise<VendorEntity[]>;
    abstract getAllDeleted(): Promise<IVendorsDeleted>;
    abstract getById( id: VendorEntity['id'], queries?: QueriesVendorDTO ): Promise<VendorEntity>;
    abstract updateById( updateVendorDTO: UpdateVendorDTO, queries?: QueriesVendorDTO ): Promise<VendorEntity>;
    abstract deleteById( id: VendorEntity['id'] ): Promise<VendorEntity>;
};