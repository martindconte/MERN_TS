import { helpersDB } from '../../../../data';
import { BitsRatesEnum, BoardStatusEnum, BoardTechnologyEnum, Port } from '../../../../interface';

interface SearchPortQuery {
    port?: number;
    physical?: string | { $regex?: RegExp };
    NMS?: string | { $regex?: RegExp };
    equipment?: Record<string, string[]>; // Reemplaza `any` por Record<string, string[]>
    logicalFacilities?: Record<string, string[]>;
    fullName?: string | { $regex?: RegExp };
}

export class SearchBoardDTO {
    constructor(
        public readonly id?: string,
        public readonly boardName?: string,
        public readonly partNumber?: string,
        public readonly vendor?: string,
        public readonly signals?: string[],
        public readonly description?: string,
        public readonly observations?: string,
        public readonly ports?: SearchPortQuery[],
        public readonly slotSize?: number,
        public readonly technology?: BoardTechnologyEnum,
        public readonly status?: BoardStatusEnum,
        public readonly createdAt?: string,
        public readonly updatedAt?: string,
    ) {}

    private static buildPortQuery(portsQuery: SearchPortQuery) {

        const portsFilters: Partial<SearchPortQuery> = {};

        for (const portKeys in portsQuery) {
            const value = portsQuery[portKeys as keyof SearchPortQuery];
            if (value !== undefined) {

                const decodedValue = decodeURIComponent(value as string);
                
                switch (portKeys) {
                    case 'port':
                        portsFilters[portKeys] = parseInt(value.toString());
                        break;

                    case 'equipment':
                        const equipmentDecoded = decodedValue.split(',');
                        portsFilters[portKeys] = { $all: [...equipmentDecoded] };
                        break;

                    // case 'logicalFacilities':
                    //? NO NECESARIO... PARA QUE BUSCAR POR ODUs????
                    //     const logicalFacilitiesFilters: SearchPortQuery['logicalFacilities'] = {}
                    //     for (const logicalFacilitiesKey in portsQuery[portKeys]) {
                    //         const value = portsQuery[logicalFacilitiesKey as keyof SearchPortQuery];
                    //     }
                    //     break;

                    case 'physical':
                    case 'NMS':
                    case 'fullName':
                        const regexValue = new RegExp(decodedValue, 'i');
                        portsFilters[portKeys] = { $regex: regexValue };
                        break;

                }
            }
        }

        return portsFilters
    }

    static createQueries(queries: { [key: string]: any }): Partial<SearchBoardDTO> {

        const searchParams: { [key: string]: any } = {}

        for (const key in queries) {
            if (key in new SearchBoardDTO()) {
                const decodedValue = decodeURIComponent( queries[key] );
                switch (key) {
                    case 'id':
                    case 'vendor':
                        searchParams[key] = helpersDB.isMongoID(queries[key]) ? helpersDB.toObjectId(queries[key]) : queries[key];
                        break;
                    case 'signals':
                        const bitsRatesArray = decodedValue.split(',')
                        searchParams[key] = { $all: bitsRatesArray.filter((rate: any) => Object.values(BitsRatesEnum).includes(rate))};
                        break;
                    case 'limit':
                    case 'page':
                        searchParams[key] = parseInt(decodedValue);
                        break;
                    case 'ports':
                        searchParams[key] = this.buildPortQuery( queries[key] )
                    default:
                        const regex = new RegExp(decodedValue, 'i');
                        searchParams[key] = { $regex: regex };
                        break;
                }
            }
        }

        return searchParams
    }
}