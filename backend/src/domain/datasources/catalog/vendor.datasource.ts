import { CreateVendorDTO, UpdateVendorDTO } from "../../dtos"
import { VendorEntity } from "../../entities/catalog/vendor.entity"


export abstract class VendorDataSource {
    abstract create( createVendorDTO: CreateVendorDTO ): Promise<VendorEntity>
    abstract getAll(): Promise<VendorEntity[]>
    abstract getById( id: string ): Promise<VendorEntity>
    abstract updateById( updateVendorDTO: UpdateVendorDTO ): Promise<VendorEntity>
    abstract deleteById( id: string ): Promise<VendorEntity>

}