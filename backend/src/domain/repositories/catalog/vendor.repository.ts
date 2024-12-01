import { IVendor, IVendorsDeleted } from '../../../interface';
import { CreateVendorDTO, QueriesVendorDTO, UpdateVendorDTO } from '../../dtos'
// import { VendorEntity } from '../../entities';

export abstract class VendorRepository {
    abstract create( createVendorDTO: CreateVendorDTO ): Promise<IVendor>;
    abstract getAll(): Promise<IVendor[]>;
    abstract getById( id: IVendor['id'], queries?: QueriesVendorDTO ): Promise<IVendor>;
    abstract updateById( updateVendorDTO: UpdateVendorDTO, queries?: QueriesVendorDTO ): Promise<IVendor>;
    abstract deleteById( id: IVendor['id'] ): Promise<IVendor>;
    abstract getAllDeleted(): Promise<IVendorsDeleted>;
    abstract cleanVendor( id: IVendor['id'] ): Promise<IVendor>;
    // abstract cleanVendor( id: VendorEntity['id'] ): Promise<VendorEntity>;
    // abstract create( createVendorDTO: CreateVendorDTO ): Promise<VendorEntity>;
    // abstract getAll(): Promise<VendorEntity[]>;
    // abstract getAllDeleted(): Promise<IVendorsDeleted>;
    // abstract getById( id: VendorEntity['id'], queries?: QueriesVendorDTO ): Promise<VendorEntity>;
    // abstract updateById( updateVendorDTO: UpdateVendorDTO, queries?: QueriesVendorDTO ): Promise<VendorEntity>;
    // abstract deleteById( id: VendorEntity['id'] ): Promise<VendorEntity>;
};