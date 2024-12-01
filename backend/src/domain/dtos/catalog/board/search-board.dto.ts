import { helpersDB } from '../../../../data';
import { BitsRatesEnum, IBoard, IBoardSearch, IPageLimit, IPagination, RoadmapEnum } from '../../../../interface';
import { BoardEntity } from '../../../entities';

type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

export class SearchBoardDTO {
    // Extraer dinámicamente las claves válidas de BoardEntity
    private static validKeys = new Set<keyof IBoard>(
        Object.values(BoardEntity.getPublicKeys) as Array<keyof IBoard>
    );

    private static otherValidKeys = new Set<string>(
        ['isDeleted']
    ) 

    // Método auxiliar para procesar valores según la clave
    private static processValue(key: keyof IBoard, value: any): any {

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
            const result: IBoardSearch = {};
            const searchParams: Mutable<Partial<BoardEntity>> = {};
            // const searchParams: Mutable<Partial<BoardEntity>> = undefined;
            let paginationData: IPageLimit | undefined = { page: 1, limit: 10 };
            // let paginationData: IPagination | undefined = undefined;
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

            if( page && limit ) {
                paginationData = {
                    page: !isNaN(Number(page)) ? parseInt(page) : 1,
                    limit: !isNaN(Number(limit)) ? parseInt(limit) : 10
                }
            } else if ( page !== undefined && page === undefined ) {
                paginationData = {
                    page: !isNaN(Number(page)) ? parseInt(page) : 1,
                    limit: 10, // Valor predeterminado para limit
                  };
            } else if ( page === undefined && limit !== undefined ) {
                paginationData = {
                    page: 1,
                    limit: !isNaN(Number(limit)) ? parseInt(limit) : 10
                }
            } else if ( !page && !limit ) {
                paginationData = undefined
            }

            // if( page || limit ) {
            //     // Verifica si 'page' es un número válido y lo asigna
            //     if (page !== undefined && !isNaN(Number(page))) {
            //         paginationData = { page: parseInt( page ) , limit: 10 };
            //         paginationData['page'] = Number(page);
            //     };
                
            //     if( limit || page ) {
            //     // Verifica si 'limit' es un número válido y lo asigna
            //     if (limit !== undefined && !isNaN(Number(limit))) {
            //         paginationData = { page, limit: 10 };
            //         paginationData.limit = Number(limit);
            //     };
            // };


            // if( Object.values( searchParams ).length > 0 ) result.searchParams = searchParams;
            // if( limit || page ) result.paginationData = paginationData
            // if( Object.values( othersQueries ).length > 0 ) result.otherQueries = othersQueries

            return {
                otherQueries: Object.values( othersQueries ).length > 0 ? othersQueries : undefined,
                paginationData: paginationData,
                searchParams: Object.values( searchParams ).length > 0 ? searchParams : undefined
            }
            // return {
            //     searchParams: Object.values( searchParams ).length > 0 ? searchParams : undefined,
            //     paginationData: limit || page ? paginationData : undefined,
            //     otherQueries: Object.values( othersQueries ).length > 0 ? othersQueries : undefined,
            // }
        };
    }
// }
// import { helpersDB } from '../../../../data';
// import { BitsRatesEnum, IBoardSearch, IPageLimit, IPagination, RoadmapEnum } from '../../../../interface';
// import { BoardEntity } from '../../../entities';

// type Mutable<T> = {
//     -readonly [K in keyof T]: T[K];
// };

// export class SearchBoardDTO {
//     // Extraer dinámicamente las claves válidas de BoardEntity
//     private static validKeys = new Set<keyof BoardEntity>(
//         Object.values(BoardEntity.getPublicKeys) as Array<keyof BoardEntity>
//     );

//     private static otherValidKeys = new Set<string>(
//         ['isDeleted']
//     ) 

//     // Método auxiliar para procesar valores según la clave
//     private static processValue(key: keyof BoardEntity, value: any): any {

//         const decodedValue = decodeURIComponent(value as string);
        
//         switch (key) {
//             case 'id':
//             case 'vendor':
//                 return helpersDB.isMongoID(value) ? helpersDB.toObjectId(value) : value;
//             case 'ports':
//                 break;
//             case 'bitsRates':
//                 const bitsRatesArray = decodedValue.split(',');
//                 return { $all: bitsRatesArray.filter((rate: any) => Object.values(BitsRatesEnum).includes(rate)) };
//             case 'roadmap':
//                 return Object.values( RoadmapEnum ).includes( value )
//                     ? value
//                     : '';
//             case 'bandwidthMax':
//             case 'slotSize':
//                 return parseInt( value )
//             default:
//                 return typeof value === 'string' ? { $regex: new RegExp(value, 'i') } : value;
//         };
//     };

//         // Método para construir el objeto de búsqueda
//         static searchBoard(queryParams: Record<string, any>): IBoardSearch {

//             const { limit, page, ...rest } = queryParams
//             const result: IBoardSearch = { searchParams: {}, };

//             const searchParams: Mutable<Partial<BoardEntity>> = {};
//             // const searchParams: Mutable<Partial<BoardEntity>> = undefined;
//             let paginationData: IPageLimit | undefined = undefined;
//             // let paginationData: IPagination | undefined = undefined;
//             let othersQueries: {[key: string]: any} = {}

//             for (const [key, value] of Object.entries(rest)) {
//                 if ( this.validKeys.has(key as keyof BoardEntity) && value !== 'false' ) {
//                     searchParams[key as keyof BoardEntity] = this.processValue(key as keyof BoardEntity, value);
//                 }
//             };

//             for (const [key, value] of Object.entries(rest)) {
//                 if ( this.otherValidKeys.has(key) ) {
//                     switch (key) {
//                         case 'isDeleted':
//                             othersQueries[key] = value === 'true'
//                             break;
//                     }
//                 }
//             };

//             if( page || limit ) {
//                 // Verifica si 'page' es un número válido y lo asigna
//                 if (page !== undefined && !isNaN(Number(page))) {
//                     paginationData = { page: parseInt( page ) , limit: 10 };
//                     paginationData.page = Number(page);
//                 };
//             };

//             if( limit || page ) {
//             // Verifica si 'limit' es un número válido y lo asigna
//             if (limit !== undefined && !isNaN(Number(limit))) {
//                 paginationData = { page, limit: 10 };
//                 paginationData.limit = Number(limit);
//             };

//             if( Object.values( searchParams ).length > 0 ) result.searchParams = searchParams;
//             if( limit || page ) result.paginationData = paginationData
//             if( Object.values( othersQueries ).length > 0 ) result.otherQueries = othersQueries

//             return result
//             // return {
//             //     searchParams: Object.values( searchParams ).length > 0 ? searchParams : undefined,
//             //     paginationData: limit || page ? paginationData : undefined,
//             //     otherQueries: Object.values( othersQueries ).length > 0 ? othersQueries : undefined,
//             // }
//         };
//     }
// }