import { IVendor, IVendorsDeleted } from '../../../interface';
import { CreateVendorDTO, QueriesVendorDTO, UpdateVendorDTO } from '../../dtos'

export abstract class VendorDataSource {
    abstract create( createVendorDTO: CreateVendorDTO ): Promise<IVendor>;
    abstract getAll(): Promise<IVendor[]>;
    abstract getById( id: IVendor['id'], queries?: QueriesVendorDTO ): Promise<IVendor>;
    abstract updateById( updateVendorDTO: UpdateVendorDTO, queries?: QueriesVendorDTO ): Promise<IVendor>;
    abstract deleteById( id: IVendor['id'] ): Promise<IVendor>;
    abstract getAllDeleted(): Promise<IVendorsDeleted>;
    abstract cleanVendor( id: IVendor['id'] ): Promise<IVendor>;
}