import { BitRatesEnum, BitRatesValues, StatusEnum, TechnologyEnum } from '../../../../interface';
import { helpersDB } from '../../../../data';

export class SearchTransceiverDTO {
    constructor(
        public readonly id?: string,
        public readonly partNumber?: string,
        public readonly vendor?: string,
        public readonly type?: string,
        public readonly model?: string,
        public readonly description?: string,
        public readonly observations?: string,
        public readonly technology?: TechnologyEnum,
        public readonly bitsRates?: BitRatesEnum[],
        public readonly signals?: string[],
        public readonly status?: StatusEnum,
        public readonly limit?: number,
        public readonly page?: number,
    ) {}

    static createQueries( queries: { [key: string]: any } ): Partial<SearchTransceiverDTO> {

        const searchParams: { [key: string]: any } = {}

        for( const key in queries ) {
            if( key in new SearchTransceiverDTO() ) {
                switch (key) {
                    case 'id':
                    case 'vendor':
                        searchParams[key] = helpersDB.isMongoID( queries[key] ) ? helpersDB.toObjectId( queries[key] ) : queries[key];
                        break;
                    case 'limit':
                    case 'page':
                        searchParams[key] = parseInt( queries[key] );
                        break;
                    case 'bitsRates':
                        const bitsRatesArray = Array.isArray(queries[key]) ? queries[key] : [ queries[key] ];
                        searchParams[key] = { $all: bitsRatesArray.filter((rate: any) => Object.values(BitRatesValues).includes(rate))};
                        break;
                    case 'signals':
                        break;
                    default:
                        const regex = new RegExp(queries[key], 'i');
                        searchParams[key] = { $regex: regex };
                        break;
                }
            }
        }
        return searchParams
    }
}