import { BitsRatesEnum, StatusEnum, TechnologyEnum } from '../../../../interface';

export class CreateTransceiverDTO {
    constructor(
        public readonly partNumber: string,
        public readonly vendor: string,
        public readonly type?: string,
        public readonly model?: string,
        public readonly description?: string,
        public readonly observations?: string,
        public readonly technology?: TechnologyEnum,
        public readonly bitsRates?: BitsRatesEnum[],
        public readonly status?: StatusEnum,
    ) { }

    static create(transceiver: { [key: string]: any }): [string?, CreateTransceiverDTO?] {
        const { partNumber, vendor, type, model, description, observations, technology, bitsRates, status } = transceiver

        console.log(bitsRates);
        console.log(bitsRates.every((rate: any) => Object.values(BitsRatesEnum).includes(rate)));
        
        if( !partNumber ) throw ['Missing Part Number'];
        if( !vendor ) throw ['Missinbg Vendor'];
        if( technology && !Object.values(TechnologyEnum ).includes( technology.toUpperCase()) ) throw ['Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO'];
        if( !Array.isArray(bitsRates) ) throw ['Invalid bitsRate']
        if( bitsRates && Array.isArray(bitsRates) && bitsRates.length > 0 && !bitsRates.every((rate: any) => Object.values(BitsRatesEnum).includes(rate)) ) throw ['Invalid bitsRate'];
        if( status && !Object.values(StatusEnum).includes(status) ) throw ['Invalid Status'];

        return [
            undefined,
            new CreateTransceiverDTO( 
                partNumber,
                vendor,
                type,
                model,
                description,
                observations,
                technology,
                bitsRates,
                status,
            )
        ]
    }
}