import { BitsRatesEnum, RoadmapEnum, TechnologyEnum } from '../../../../interface';
import { VendorEntity } from '../../../entities';

export class UpdateTransceiverDTO {
    constructor(
        public readonly id: string,
        public readonly partNumber: string,
        public readonly vendor: Pick<VendorEntity, 'id' | 'vendorName'>,
        public readonly isDeleted: boolean,
        public readonly type?: string,
        public readonly modelName?: string,
        public readonly description?: string,
        public readonly observations?: string,
        public readonly technology?: TechnologyEnum,
        public readonly bitsRates?: BitsRatesEnum[],
        public readonly roadmap?: RoadmapEnum,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
      ) {}

    static update( transceiver: UpdateTransceiverDTO ): [ string?, UpdateTransceiverDTO?] {
        
        const { id, partNumber, vendor, type, modelName, description, observations, technology, bitsRates, roadmap, isDeleted = false, createdAt, updatedAt } = transceiver;
        
        if( !id) throw ['Missinbg ID Transceiver'];
        if( !partNumber ) throw ['Missinbg Part Number Transceiver'];
        if( !vendor ) throw ['Missinbg Vendor'];
        if( bitsRates === undefined || !Array.isArray(bitsRates) ) throw ['Bits Rates must be Array'];
        if( technology === undefined || ( technology && !Object.values( TechnologyEnum ).includes( technology ) )) throw ['Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO'];
        if( bitsRates && Array.isArray(bitsRates) && bitsRates.length > 0 && !bitsRates.every((rate: any) => Object.values(BitsRatesEnum).includes(rate))) throw ['Invalid bitsRate'];        if( roadmap && !Object.values( RoadmapEnum ).includes(roadmap ) ) throw ['Invalid Status'];

        return [
            undefined,
            new UpdateTransceiverDTO( 
                id,
                partNumber.includes('_DELETED_') ? partNumber.replace('_DELETED_', '') : partNumber,
                vendor,
                isDeleted,
                type,
                modelName?.includes('_DELETED_') ? modelName.replace('_DELETED_', '') : modelName,
                description,
                observations,
                technology,
                bitsRates,
                roadmap,
                createdAt,
                updatedAt,
            )
        ]
    }
}