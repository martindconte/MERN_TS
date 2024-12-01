import { BoardModel, TransceiverModel, VendorModel } from '../../../data';
import { VendorDataSource, CreateVendorDTO, UpdateVendorDTO, VendorEntity, TransceiverEntity, BoardEntity, QueriesVendorDTO } from '../../../domain';
import { generateRandomCode, sortBy } from '../../../helpers';
import { IVendorsDeleted, VendorsDeletedType } from '../../../interface';
import { TransceiverDatasourceImpl } from './transceiver.datasource.impl';
import { BoardDatasourceImpl } from './board.datasource.impl';

export class VendorDatasourceImpl implements VendorDataSource {

    async create(createVendorDTO: CreateVendorDTO): Promise<VendorEntity> {
        const vendorDuplicate = await VendorModel.findOne({ vendorName: createVendorDTO.vendorName, isDeleted: false })
        if( vendorDuplicate ) throw `${ createVendorDTO.vendorName } is already registered`;
        const newVendor = await VendorModel.create( createVendorDTO );
        return VendorEntity.fromObject( newVendor );
    };

    async getAll(): Promise<VendorEntity[]> {
        const vendors = await VendorModel.find({ isDeleted: false })
        return sortBy( vendors.map( VendorEntity.fromObject ) , ['vendorName', 'country'] )
    };

    async getAllDeleted(): Promise<IVendorsDeleted> {
        const vendorsDeleted: VendorEntity[] = await VendorModel.find({ isDeleted: true })
        const ids = vendorsDeleted.map(( vendor: VendorEntity ) => vendor.id )
        const [transceiversWidthVendorDeleted, boardsWidthVendorDeleted] = await Promise.all([
            new TransceiverDatasourceImpl().getAll({ vendor: { $in: ids } }),
            BoardModel.find({ vendor:{ $in: ids }})
            // new BoardDatasourceImpl().getAll({ vendor:{ $in: ids }})
        ]);

        // console.log('transceiversWidthVendorDeleted desde IMPL ----> ********** \n', transceiversWidthVendorDeleted);
        // console.log('boardsWidthVendorDeleted ----> ********** \n', boardsWidthVendorDeleted);

        return {
            vendors: vendorsDeleted,
            boards: boardsWidthVendorDeleted.map( BoardEntity.fromObject ),
            // boards: boardsWidthVendorDeleted as BoardEntity[],
            transceivers: transceiversWidthVendorDeleted as TransceiverEntity[]
        };
    };

    async getById(id: string, queries?: QueriesVendorDTO ): Promise<VendorEntity> {
        const { isDeleted = false } = queries || {}
        const vendor = await VendorModel.findOne({ _id: id, isDeleted })
        if( !vendor ) throw 'Vendor not Found!'
        return VendorEntity.fromObject( vendor ) 
    };

    async getByIdDeletedVendor( id: VendorEntity['id'] ): Promise<VendorsDeletedType> {
        const vendor = await this.getById( id, { isDeleted: true } );
        const [transceiversWidthVendorDeleted, boardsWidthVendorDeleted] = await Promise.all([
            TransceiverModel.find({ vendor: id }),
            BoardModel.find({ vendor: id })
        ]);

        return {
            vendor: vendor,
            boards: boardsWidthVendorDeleted.map( BoardEntity.fromObject ),
            transceivers: transceiversWidthVendorDeleted.map( TransceiverEntity.fromObject ),
        };
    };

    async updateById(updateVendorDTO: UpdateVendorDTO, queries?: QueriesVendorDTO): Promise<VendorEntity> {

        const { isDeleted = false } = queries || {}

        await this.getById(updateVendorDTO.id, { isDeleted });

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
    };

    async deleteById(id: string): Promise<VendorEntity> {
        const vendor = await this.getById(id);
        const vendorDeleted = await VendorModel.findOneAndUpdate(
            { _id: id },
            { 
                vendorName: vendor.vendorName + '_DELETED_' + generateRandomCode( 3 ),
                isDeleted: true,
            },
            { new: true })
        if (!vendorDeleted) throw 'Vendor not deleted'
        return VendorEntity.fromObject(vendorDeleted)
    };

    async cleanVendor( id: VendorEntity['id'] ): Promise<VendorEntity>  {
        const { transceivers, boards } = await this.getByIdDeletedVendor( id );
        if( transceivers.length > 0 || boards.length > 0 ) throw 'Vendor not deleted. Vendor has associated transceivers, boards or subracks';
        const vendorCleaned = await VendorModel.findByIdAndDelete( id );
        if( vendorCleaned ) {
            return VendorEntity.fromObject( vendorCleaned )
        } else {
            throw 'Error - Delete failed'
        }
    }
}