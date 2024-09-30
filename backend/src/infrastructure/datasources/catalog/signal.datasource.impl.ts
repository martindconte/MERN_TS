import { SignalkModel } from '../../../data';

import { SignalDataSource, CreateSignalDTO, SignalEntity, UpdateSignalDTO } from '../../../domain';
import { sortBy } from '../../../helpers';

export class SignalDatasourceImpl implements SignalDataSource {

    async create(createSignalDTO: CreateSignalDTO): Promise<SignalEntity> {
        const typeAndSubTypeExist = await SignalkModel.findOne({
            type: createSignalDTO.type,
            subType: createSignalDTO.subType
        })
        if( typeAndSubTypeExist ) throw new Error(`Signal ${createSignalDTO.type} ${createSignalDTO.subType} is already registered`)
        const newSignal = await SignalkModel.create( createSignalDTO )
        return SignalEntity.fromObject( newSignal )

        // if( !typeAndSubTypeExist ) {
        //     const newSignal = await SignalkModel.create( createSignalDTO )
        //     return SignalEntity.fromObject( newSignal )
        // }

        // const conditions = createSignalDTO.bandwidth?.map(( bw ) => ({
        //     type: createSignalDTO.type,
        //     subType: createSignalDTO.subType,
        //     bandwidth: {
        //         $elemMatch: {
        //             amount: Number(bw.amount),
        //             unit: bw.unit.toUpperCase()
        //         }
        //     }
        // }))

        // console.log({conditions});

        // const signalDuplicate = await SignalkModel.findOne({
        //     $or: conditions
        // }).lean()
        
        // console.log('aqui................');

        // console.log('signalDuplicate', signalDuplicate);

        // if (signalDuplicate) {
        //     const bwRepeat = createSignalDTO.bandwidth?.filter(bw => 
        //         signalDuplicate.bandwidth.some(bwRepeat => 
        //             bwRepeat.amount === bw.amount && 
        //             bwRepeat.unit.toUpperCase() === bw.unit.toUpperCase()
        //         )
        //     );
    
        //     throw new Error(`Signal ${createSignalDTO.type} ${createSignalDTO.subType} is already registered with the following bandwidths: ${JSON.stringify(bwRepeat)}`);
        // }

        // const newSignal = await SignalkModel.create( createSignalDTO )
        //     return SignalEntity.fromObject( newSignal )
    }

    async getAll(): Promise<SignalEntity[]> {
        const signals = await SignalkModel.find()
        return sortBy( signals.map( SignalEntity.fromObject ) , ['type', 'subType'] )
    }

    async getById(id: string): Promise<SignalEntity> {
        const signal = await SignalkModel.findOne({ _id: id })
        if( !signal ) throw 'Signal not Found'
        return SignalEntity.fromObject( signal )
    }

    async updateById(updateSignalDTO: UpdateSignalDTO): Promise<SignalEntity> {
        throw new Error('Method not implemented.');
        // primero verifico si esta creado el Tipo y SubTipo
        // const typeAndSubTypeExist = await SignalkModel.findOne({
        //     type: createSignalDTO.type,
        //     subType: createSignalDTO.subType
        // })
        
        // if( typeAndSubTypeExist && createSignalDTO.bandwidth?.length === 0 ) throw new Error(`Signal ${createSignalDTO.type} ${createSignalDTO.subType} is already registered`)

        // if( !typeAndSubTypeExist ) {
        //     const newSignal = await SignalkModel.create( createSignalDTO )
        //     return SignalEntity.fromObject( newSignal )
        // }

        // const conditions = createSignalDTO.bandwidth?.map(( bw ) => ({
        //     type: createSignalDTO.type,
        //     subType: createSignalDTO.subType,
        //     bandwidth: {
        //         $elemMatch: {
        //             amount: Number(bw.amount),
        //             unit: bw.unit.toUpperCase()
        //         }
        //     }
        // }))

        // console.log({conditions});

        // const signalDuplicate = await SignalkModel.findOne({
        //     $or: conditions
        // }).lean()
        
        // console.log('aqui................');

        // console.log('signalDuplicate', signalDuplicate);

        // if (signalDuplicate) {
        //     const bwRepeat = createSignalDTO.bandwidth?.filter(bw => 
        //         signalDuplicate.bandwidth.some(bwRepeat => 
        //             bwRepeat.amount === bw.amount && 
        //             bwRepeat.unit.toUpperCase() === bw.unit.toUpperCase()
        //         )
        //     );
    
        //     throw new Error(`Signal ${createSignalDTO.type} ${createSignalDTO.subType} is already registered with the following bandwidths: ${JSON.stringify(bwRepeat)}`);
        // }

        // const newSignal = await SignalkModel.create( createSignalDTO )
        //     return SignalEntity.fromObject( newSignal )
    }

    deleteById(id: string): Promise<SignalEntity> {
        throw new Error('Method not implemented.');
    }


    // async create(createVendorDTO: CreateVendorDTO): Promise<VendorEntity> {
    //     const vendorDuplicate = await VendorModel.findOne({ vendorName: createVendorDTO.vendorName })
    //     if( vendorDuplicate ) throw `${ createVendorDTO.vendorName } is already registered`
    //     const newVendor = await VendorModel.create( createVendorDTO );
    //     return VendorEntity.fromObject( newVendor );
    // }

    // async getAll(): Promise<VendorEntity[]> {
    //     const vendors = await VendorModel.find()
    //     return sortBy( vendors.map( VendorEntity.fromObject ) , ['vendorName', 'country'] )
    // }

    // async getById(id: string): Promise<VendorEntity> {
    //     const vendor = await VendorModel.findOne({ _id: id })
    //     if( !vendor ) throw 'Vendor not Found!'
    //     return VendorEntity.fromObject( vendor ) 
    // }

    // async updateById(updateVendorDTO: UpdateVendorDTO): Promise<VendorEntity> {
    //     await this.getById(updateVendorDTO.id);

    //     const duplicateVendor = await VendorModel.findOne({
    //         vendorName: updateVendorDTO.vendorName,
    //         _id: { $ne: updateVendorDTO.id }
    //     });

    //     if (duplicateVendor) throw `Vendor ${updateVendorDTO.vendorName} is already registered.`;

    //     const vendorUpdate = await VendorModel.findByIdAndUpdate(
    //         updateVendorDTO.id,
    //         { ...updateVendorDTO },
    //         { new: true }
    //     );
    //     if (!vendorUpdate) throw "Error - Update failed";
    //     return VendorEntity.fromObject(vendorUpdate);
    // }
    
    // async deleteById(id: string): Promise<VendorEntity> {
    //     await this.getById(id);
    //     const vendorDelete = await VendorModel.findByIdAndDelete(id);
    //     if (!vendorDelete) throw 'Vendor not deleted'
    //     return VendorEntity.fromObject(vendorDelete)
    // }

}