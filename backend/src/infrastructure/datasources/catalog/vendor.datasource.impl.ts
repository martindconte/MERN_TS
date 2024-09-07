import { VendorModel } from '../../../data';
import { VendorDataSource, CreateVendorDTO, UpdateVendorDTO, VendorEntity } from '../../../domain';
import { sortBy } from '../../../helpers';

export class VendorDatasourceImpl extends VendorDataSource {

    async create(createVendorDTO: CreateVendorDTO): Promise<VendorEntity> {
        const vendorDuplicate = await VendorModel.findOne({ vendorName: createVendorDTO.vendorName })
        if( vendorDuplicate ) throw `${ createVendorDTO.vendorName } is already registered`
        const newVendor = await VendorModel.create( createVendorDTO );
        return VendorEntity.fromObject( newVendor );
    }

    async getAll(): Promise<VendorEntity[]> {
        const vendors = await VendorModel.find()
        return sortBy( vendors.map( VendorEntity.fromObject ) , ['vendorName', 'country'] )
    }

    async getById(id: string): Promise<VendorEntity> {
        const vendor = await VendorModel.findOne({ _id: id })
        if( !vendor ) throw 'Vendor not Found!'
        return VendorEntity.fromObject( vendor ) 
    }

    async updateById(updateVendorDTO: UpdateVendorDTO): Promise<VendorEntity> {
        await this.getById(updateVendorDTO.id);

        const duplicateVendor = await VendorModel.findOne({
            vendorName: updateVendorDTO.vendorName,
            _id: { $ne: updateVendorDTO.id }
        });

        if (duplicateVendor) throw `Vendor ${updateVendorDTO.vendorName} is already registered.`;

        const vendorUpdate = await VendorModel.findByIdAndUpdate(
            updateVendorDTO.id,
            { ...updateVendorDTO },
            { new: true }
        );
        if (!vendorUpdate) throw "Error - Update failed";
        return VendorEntity.fromObject(vendorUpdate);
    }
    
    async deleteById(id: string): Promise<VendorEntity> {
        await this.getById(id);
        const vendorDelete = await VendorModel.findByIdAndDelete(id);
        if (!vendorDelete) throw 'Vendor not deleted'
        return VendorEntity.fromObject(vendorDelete)
    }

}