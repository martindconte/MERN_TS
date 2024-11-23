import { helpersDB } from '../../../../data';
import { BitsRatesEnum, IBoardSearch, IPagination, RoadmapEnum } from '../../../../interface';
import { BoardEntity } from '../../../entities';

type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

export class SearchBoardDTO {
    // Extraer dinámicamente las claves válidas de BoardEntity
    private static validKeys = new Set<keyof BoardEntity>(
        Object.values(BoardEntity.getPublicKeys) as Array<keyof BoardEntity>
    );

    private static otherValidKeys = new Set<string>(
        ['isDeleted']
    ) 

    // Método auxiliar para procesar valores según la clave
    private static processValue(key: keyof BoardEntity, value: any): any {

        const decodedValue = decodeURIComponent(value as string);
        
        switch (key) {
            case 'id':
            case 'vendor':
                return helpersDB.isMongoID(value) ? helpersDB.toObjectId(value) : value;
            case 'ports':
                break;
            case 'bitsRates':
                const bitsRatesArray = decodedValue.split(',');
                return { $all: bitsRatesArray.filter((rate: any) => Object.values(BitsRatesEnum).includes(rate)) };
            case 'roadmap':
                return Object.values( RoadmapEnum ).includes( value )
                    ? value
                    : '';
            case 'bandwidthMax':
            case 'slotSize':
                return parseInt( value )
            default:
                return typeof value === 'string' ? { $regex: new RegExp(value, 'i') } : value;
        };
    };

        // Método para construir el objeto de búsqueda
        static searchBoard(queryParams: Record<string, any>): IBoardSearch {

            const { limit, page, ...rest } = queryParams
            const result: IBoardSearch = {
                searchParams: {},
            };

            const searchParams: Mutable<Partial<BoardEntity>> = {};
            // const searchParams: Mutable<Partial<BoardEntity>> = undefined;
            let paginationData: IPagination | undefined = undefined;
            let othersQueries: {[key: string]: any} = {}

            for (const [key, value] of Object.entries(rest)) {
                if ( this.validKeys.has(key as keyof BoardEntity) && value !== 'false' ) {
                    searchParams[key as keyof BoardEntity] = this.processValue(key as keyof BoardEntity, value);
                }
            };

            for (const [key, value] of Object.entries(rest)) {
                if ( this.otherValidKeys.has(key) ) {
                    switch (key) {
                        case 'isDeleted':
                            othersQueries[key] = value === 'true'
                            break;
                    }
                }
            };

            if( limit || page ) {
                // Verifica si 'page' es un número válido y lo asigna
                if (page !== undefined && !isNaN(Number(page))) {
                    paginationData = { page: 1, limit: 10 };
                    paginationData.page = Number(page);
                };

                // Verifica si 'limit' es un número válido y lo asigna
                if (limit !== undefined && !isNaN(Number(limit))) {
                    paginationData = { page: 1, limit: 10 };
                    paginationData.limit = Number(limit);
                };
            };

            if( Object.values( searchParams ).length > 0 ) result.searchParams = searchParams;
            if( limit || page ) result.paginationData = paginationData
            if( Object.values( othersQueries ).length > 0 ) result.otherQueries = othersQueries

            return {
                searchParams: Object.values( searchParams ).length > 0 ? searchParams : undefined,
                paginationData: limit || page ? paginationData : undefined,
                otherQueries: Object.values( othersQueries ).length > 0 ? othersQueries : undefined,
            }
        };
}

// import { helpersDB } from '../../../../data';
// import { BitsRatesEnum, BoardStatusEnum, BoardTechnologyEnum, Port } from '../../../../interface';
// import { BoardEntity } from '../../../entities';

// type BoardKeys = keyof BoardEntity

// type Mutable<T> = {
//     -readonly [K in keyof T]: T[K];
// };

// interface SearchPortQuery {
//     port?: number;
//     physical?: string | { $regex?: RegExp };
//     NMS?: string | { $regex?: RegExp };
//     equipment?: Record<string, string[]>; // Reemplaza `any` por Record<string, string[]>
//     logicalFacilities?: Record<string, string[]>;
//     fullName?: string | { $regex?: RegExp };
// }

// export class SearchBoardDTO {
//     constructor(
//         public readonly search: Partial<BoardEntity>
//     ) {}

//     static createQueries(queries: SearchBoardDTO ): Mutable<Partial<SearchBoardDTO>> {

//         const searchParams: Mutable<Partial<SearchBoardDTO>> = {}
//         for (const key in queries) {
//                 const decodedValue = decodeURIComponent( queries[key] );
//                 switch (key) {
//                     case 'id':
//                     case 'vendor':
//                         searchParams[key] = helpersDB.isMongoID(queries[key]) ? helpersDB.toObjectId(queries[key]) : queries[key];
//                         break;
//                     case 'bitsRates':
//                         const bitsRatesArray = decodedValue.split(',')
//                         searchParams[key] = { $all: bitsRatesArray.filter((rate: any) => Object.values(BitsRatesEnum).includes(rate))};
//                         break;
//                     case 'limit':
//                     case 'page':
//                         searchParams[key] = parseInt(decodedValue);
//                         break;
//                     case 'ports':
//                         // searchParams[key] = this.buildPortQuery( queries[key] )
//                         break;
//                     case 'isDeleted':
//                         searchParams[key] = decodedValue === 'true'
//                     default:
//                         const regex = new RegExp(decodedValue, 'i');
//                         searchParams[key] = { $regex: regex };
//                         break;
//                 }
//         }

//         return searchParams
//     }
// }
// import { helpersDB } from '../../../../data';
// import { BitsRatesEnum, BoardStatusEnum, BoardTechnologyEnum, Port } from '../../../../interface';
// import { BoardEntity } from '../../../entities';

// interface SearchPortQuery {
//     port?: number;
//     physical?: string | { $regex?: RegExp };
//     NMS?: string | { $regex?: RegExp };
//     equipment?: Record<string, string[]>; // Reemplaza `any` por Record<string, string[]>
//     logicalFacilities?: Record<string, string[]>;
//     fullName?: string | { $regex?: RegExp };
// }

// export class SearchBoardDTO {
//     // constructor(
//     //     // public readonly id?: string,
//     //     // public readonly boardName?: string,
//     //     // public readonly partNumber?: string,
//     //     // public readonly vendor?: string,
//     //     // public readonly signals?: string[],
//     //     // public readonly description?: string,
//     //     // public readonly observations?: string,
//     //     // public readonly ports?: SearchPortQuery[],
//     //     // public readonly slotSize?: number,
//     //     // public readonly technology?: BoardTechnologyEnum,
//     //     // public readonly status?: BoardStatusEnum,
//     //     // public readonly createdAt?: string,
//     //     // public readonly updatedAt?: string,
//     //     // public readonly limit?: number,
//     //     // public readonly page?: number,
//     //     public readonly search: Partial<BoardEntity>

//     // ) {}

//     private static buildPortQuery(portsQuery: SearchPortQuery) {

//         const portsFilters: Partial<SearchPortQuery> = {};

//         for (const portKeys in portsQuery) {
//             const value = portsQuery[portKeys as keyof SearchPortQuery];
//             if (value !== undefined) {

//                 const decodedValue = decodeURIComponent(value as string);
                
//                 switch (portKeys) {
//                     case 'port':
//                         portsFilters[portKeys] = parseInt(value.toString());
//                         break;

//                     case 'equipment':
//                         const equipmentDecoded = decodedValue.split(',');
//                         portsFilters[portKeys] = { $all: [...equipmentDecoded] };
//                         break;

//                     // case 'logicalFacilities':
//                     //? NO NECESARIO... PARA QUE BUSCAR POR ODUs????
//                     //     const logicalFacilitiesFilters: SearchPortQuery['logicalFacilities'] = {}
//                     //     for (const logicalFacilitiesKey in portsQuery[portKeys]) {
//                     //         const value = portsQuery[logicalFacilitiesKey as keyof SearchPortQuery];
//                     //     }
//                     //     break;

//                     case 'physical':
//                     case 'NMS':
//                     case 'fullName':
//                         const regexValue = new RegExp(decodedValue, 'i');
//                         portsFilters[portKeys] = { $regex: regexValue };
//                         break;

//                 }
//             }
//         }

//         return portsFilters
//     }

//     static createQueries(queries: { [key: string]: string }) {

//         const searchParams: { [key: string]: any } = {}
//         for (const key in queries) {
//             if (key in new SearchBoardDTO()) {
//                 const decodedValue = decodeURIComponent( queries[key] );
//                 switch (key) {
//                     case 'id':
//                     case 'vendor':
//                         searchParams[key] = helpersDB.isMongoID(queries[key]) ? helpersDB.toObjectId(queries[key]) : queries[key];
//                         break;
//                     case 'bitsRates':
//                         const bitsRatesArray = decodedValue.split(',')
//                         searchParams[key] = { $all: bitsRatesArray.filter((rate: any) => Object.values(BitsRatesEnum).includes(rate))};
//                         break;
//                     case 'limit':
//                     case 'page':
//                         searchParams[key] = parseInt(decodedValue);
//                         break;
//                     case 'ports':
//                         // searchParams[key] = this.buildPortQuery( queries[key] )
//                         break;
//                     case 'isDeleted':
//                         searchParams[key] = decodedValue === 'true'
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