import { BitsRatesEnum, RoadmapEnum, TechnologyEnum } from '../../../../interface';
import { helpersDB } from '../../../../data';
import { SearchCentralDTO } from '../../central/seacrh-central.dto';

export class SearchTransceiverDTO {
    constructor(
        public readonly id?: string,
        public readonly partNumber?: string,
        public readonly vendor?: string,
        public readonly type?: string,
        public readonly modelName?: string,
        public readonly description?: string,
        public readonly observations?: string,
        public readonly technology?: TechnologyEnum,
        public readonly bitsRates?: BitsRatesEnum[],
        public readonly roadmap?: RoadmapEnum,
        public readonly limit?: number,
        public readonly page?: number,
        public readonly isDeleted?: boolean | 'all',
    ) {}

    static createQueries(queries: Partial<Record<keyof SearchCentralDTO, any>>): Partial<SearchTransceiverDTO> {
        console.log('desde aqui...........', queries);
        const searchParams: { [key: string]: any } = { isDeleted: false };
        const instanceKeys = new Set(Object.keys(new SearchTransceiverDTO()));

        for (const key in queries) {
            if (instanceKeys.has(key)) {
                const decodedValue = decodeURIComponent(queries[key as keyof SearchCentralDTO] as string);
                
                switch (key) {
                    case 'id':
                    case 'vendor':
                        searchParams[key] = helpersDB.isMongoID(queries[key as keyof SearchCentralDTO]) 
                            ? helpersDB.toObjectId(queries[key as keyof SearchCentralDTO]) 
                            : queries[key as keyof SearchCentralDTO];
                        break;
                    case 'limit':
                    case 'page':
                        searchParams[key] = parseInt(decodedValue);
                        break;
                    case 'bitsRates':
                        const bitsRatesArray = decodedValue.split(',');
                        searchParams[key] = { $all: bitsRatesArray.filter((rate: any) => Object.values(BitsRatesEnum).includes(rate)) };
                        break;
                    case 'isDeleted':
                        if (queries[key].toLowerCase() === 'all') {
                            // Eliminar la clave si el valor es 'all'
                            delete searchParams[key];
                        } else {
                            searchParams[key] = queries[key].toLowerCase() === 'true';
                        }
                        break;
                        // searchParams[key] = queries[key].toLocaleLowerCase() === 'all' ? queries[key].toLocaleLowerCase() === 'all' : queries[key].toLocaleLowerCase() === 'true' 
                        // break;
                    default:
                        const regex = new RegExp(decodedValue, 'i');
                        searchParams[key] = { $regex: regex };
                        break;
                }
            }
        }

        console.log('desde SearchDTO -------------->', searchParams);

        return searchParams;
    }
}


// import { BitsRatesEnum, StatusEnum, TechnologyEnum } from '../../../../interface';
// import { helpersDB } from '../../../../data';

// export class SearchTransceiverDTO {
//     constructor(
//         public readonly id?: string,
//         public readonly partNumber?: string,
//         public readonly vendor?: string,
//         public readonly type?: string,
//         public readonly model?: string,
//         public readonly description?: string,
//         public readonly observations?: string,
//         public readonly technology?: TechnologyEnum,
//         public readonly bitsRates?: BitsRatesEnum[],
//         public readonly status?: StatusEnum,
//         public readonly limit?: number,
//         public readonly page?: number,
//     ) {}

//     static createQueries( queries: { [key: string]: any } ): Partial<SearchTransceiverDTO> {

//         const searchParams: { [key: string]: any } = {}

//         for( const key in queries ) {
//             if( key in new SearchTransceiverDTO() ) {
//                 const decodedValue = decodeURIComponent(queries[key]);
//                 switch (key) {
//                     case 'id':
//                     case 'vendor':
//                         searchParams[key] = helpersDB.isMongoID( queries[key] ) ? helpersDB.toObjectId( queries[key] ) : queries[key];
//                         break;
//                     case 'limit':
//                     case 'page':
//                         searchParams[key] = parseInt( decodedValue );
//                         break;
//                     case 'bitsRates':
//                         const bitsRatesArray = decodedValue.split(',')
//                         searchParams[key] = { $all: bitsRatesArray.filter((rate: any) => Object.values(BitsRatesEnum).includes(rate))};
//                         break;
//                     // case 'signals':
//                     //     break;
//                     default:
//                         const regex = new RegExp(decodedValue, 'i');
//                         searchParams[key] = { $regex: regex };
//                         break;
//                 }
//             }
//         }

//         return searchParams
//     }
// }