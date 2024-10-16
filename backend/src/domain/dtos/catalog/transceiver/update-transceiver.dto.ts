import { BitRatesEnum, BitRatesValues, StatusEnum, TechnologyEnum } from '../../../../interface';
import { VendorEntity } from '../../../entities';

export class UpdateTransceiverDTO {
    constructor(
        public readonly id: string,
        public readonly partNumber: string,
        public readonly vendor: Partial<VendorEntity>,
        public readonly type?: string,
        public readonly model?: string,
        public readonly description?: string,
        public readonly observations?: string,
        public readonly technology?: TechnologyEnum,
        public readonly bitsRates?: BitRatesEnum[],
        // public readonly signals?: { id: string, type: string, subtype: string }[],
        public readonly status?: StatusEnum,
      ) {}

    static update(transceiver: { [key: string]: any }): [string?, UpdateTransceiverDTO?] {
        const { id, _id, partNumber, vendor, type, model, description, observations, technology, bitsRates, status } = transceiver
        // const { id, _id, partNumber, vendor, type, model, description, observations, technology, bitsRates, signals, status } = transceiver

        if( !id || _id ) throw ['Missinbg ID Transceiver'];
        if( !partNumber ) throw ['Missinbg Part Number Transceiver'];
        if( !vendor ) throw ['Missinbg Vendor'];
        if( bitsRates === '' && !Array.isArray(bitsRates) ) throw ['Bits Rates must be Array'];

        if( technology === '' || ( technology && !Object.values( TechnologyEnum ).includes( technology.toUpperCase() ) )) throw ['Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO'];
        if( bitsRates && bitsRates.length > 0 && !bitsRates.every((rate: any) => BitRatesValues.includes(rate)) ) throw ['Invalid bitsRate'];
        if( status && !Object.values(StatusEnum).includes(status) ) throw ['Invalid Status'];

        return [
            undefined,
            new UpdateTransceiverDTO( 
                id || _id,
                partNumber,
                vendor,
                type,
                model,
                description,
                observations,
                technology,
                bitsRates,
                // signals,
                status,
            )
        ]
    }
}