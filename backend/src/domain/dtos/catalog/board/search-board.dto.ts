import { helpersDB } from '../../../../data';
import { BitsRatesEnum, IBoard, IBoardSearch, IPageLimit, RoadmapEnum } from '../../../../interface';
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
            // const result: IBoardSearch = {};
            const searchParams: Mutable<Partial<BoardEntity>> = {};
            let paginationData: IPageLimit | undefined = { page: 1, limit: 10 };
            let othersQueries: {[key: string]: any} = {}

            for (const [key, value] of Object.entries(rest)) {
                if ( this.validKeys.has(key as keyof BoardEntity) ) {
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

            return {
                otherQueries: Object.values( othersQueries ).length > 0 ? othersQueries : undefined,
                paginationData: paginationData,
                searchParams: Object.values( searchParams ).length > 0 ? searchParams : undefined
            }
        };
    }