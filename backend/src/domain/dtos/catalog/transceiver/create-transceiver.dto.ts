import { BitsRatesEnum, RoadmapEnum, TechnologyEnum } from '../../../../interface';

export class CreateTransceiverDTO {
    constructor(
        public readonly partNumber: string,
        public readonly vendor: string,
        private readonly isDeleted: boolean = false,
        public readonly type?: string,
        public readonly modelName?: string,
        public readonly description?: string,
        public readonly observations?: string,
        public readonly technology?: TechnologyEnum,
        public readonly bitsRates?: BitsRatesEnum[],
        public readonly roadmap?: RoadmapEnum,
    ) { }

    static create(transceiver: CreateTransceiverDTO): [string?, CreateTransceiverDTO?] {
        const { partNumber, vendor, type, modelName, description, observations, technology, bitsRates, roadmap } = transceiver

        if( !partNumber ) throw ['Missing Part Number'];
        if( !vendor ) throw ['Missinbg Vendor'];
        if( technology && !Object.values( TechnologyEnum ).includes( technology ) ) throw ['Invalid Techonology value!. Must be DWDM, SDH, RX, CWDM, IP, GENERICO'];
        if( !Array.isArray(bitsRates) ) throw ['Invalid bitsRate']
        if( bitsRates && Array.isArray(bitsRates) && bitsRates.length > 0 && !bitsRates.every((rate: any) => Object.values(BitsRatesEnum).includes(rate)) ) throw ['Invalid bitsRate'];
        if( roadmap && !Object.values( RoadmapEnum ).includes( roadmap ) ) throw ['Invalid Status'];

        return [
            undefined,
            new CreateTransceiverDTO( 
                partNumber,
                vendor,
                false,
                type,
                modelName,
                description,
                observations,
                technology,
                bitsRates,
                roadmap,
            )
        ]
    }
}