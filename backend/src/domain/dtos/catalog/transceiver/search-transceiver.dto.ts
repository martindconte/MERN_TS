import { helpersDB } from '../../../../data';
import { BitsRatesEnum, IPageLimit, ITransceiver, ITransceiverSearch } from '../../../../interface';
import { TransceiverEntity } from '../../../entities';

export class SearchTransceiverDTO {
  private static validKeys = new Set<keyof ITransceiver>(Object.values(TransceiverEntity.getPublicKeysTransceiver) as Array<keyof ITransceiver>);

  private static otherValidKeys = new Set<string>(['']);

  private static processValue(key: keyof ITransceiver, value: any): any {
    const decodedValue = decodeURIComponent(value as string);
    switch (key) {
      case 'id':
      case 'vendor':
        return helpersDB.isMongoID(value) ? helpersDB.toObjectId(value) : value;
      case 'bitsRates':
        const bitsRatesArray = decodedValue.split(',');
        return { $all: bitsRatesArray.filter((rate: any) => Object.values(BitsRatesEnum).includes(rate)) };
      case 'isDeleted':
        return value === 'true' ? true : false;
      default:
        return typeof value === 'string' ? { $regex: new RegExp(value, 'i') } : value;
    }
  }

  static searchTransceivers(queryParams: Record<string, any>): ITransceiverSearch {
    const { page, limit, ...restQueries } = queryParams;
    const searchParams: Partial<ITransceiver> = {};
    let paginationData: IPageLimit | undefined;
    let othersQueries: { [key: string]: any } = {};

    for (const [key, value] of Object.entries(restQueries)) {
      if (this.validKeys.has(key as keyof ITransceiver)) {
        searchParams[key as keyof ITransceiver] = this.processValue(key as keyof ITransceiver, value);
      }
    }

    if (page && limit) {
      paginationData = {
        page: !isNaN(Number(page)) ? parseInt(page) : 1,
        limit: !isNaN(Number(limit)) ? parseInt(limit) : 10,
      };
    } else if (page !== undefined && page === undefined) {
      paginationData = {
        page: !isNaN(Number(page)) ? parseInt(page) : 1,
        limit: 10, // Valor predeterminado para limit
      };
    } else if (page === undefined && limit !== undefined) {
      paginationData = {
        page: 1,
        limit: !isNaN(Number(limit)) ? parseInt(limit) : 10,
      };
    } else if (!page && !limit) {
      paginationData = undefined;
    }

    return {
      otherQueries: Object.values(othersQueries).length > 0 ? othersQueries : undefined,
      paginationData: paginationData,
      searchParams: Object.values(searchParams).length > 0 ? searchParams : undefined,
    };
  }
}
// import { BitsRatesEnum, RoadmapEnum, TechnologyEnum } from '../../../../interface';
// import { helpersDB } from '../../../../data';
// import { SearchCentralDTO } from '../../central/seacrh-central.dto';

// export class SearchTransceiverDTO {
//     constructor(
//         public readonly id?: string,
//         public readonly partNumber?: string,
//         public readonly vendor?: string,
//         public readonly type?: string,
//         public readonly modelName?: string,
//         public readonly description?: string,
//         public readonly observations?: string,
//         public readonly technology?: TechnologyEnum,
//         public readonly bitsRates?: BitsRatesEnum[],
//         public readonly roadmap?: RoadmapEnum,
//         public readonly limit?: number,
//         public readonly page?: number,
//         public readonly isDeleted?: boolean | 'all',
//     ) {}

//     static createQueries(queries: Partial<Record<keyof SearchCentralDTO, any>>): Partial<SearchTransceiverDTO> {
//         const searchParams: { [key: string]: any } = { isDeleted: false };
//         const instanceKeys = new Set(Object.keys(new SearchTransceiverDTO()));

//         for (const key in queries) {
//             if (instanceKeys.has(key)) {
//                 const decodedValue = decodeURIComponent(queries[key as keyof SearchCentralDTO] as string);

//                 switch (key) {
//                     case 'id':
//                     case 'vendor':
//                         searchParams[key] = helpersDB.isMongoID(queries[key as keyof SearchCentralDTO])
//                             ? helpersDB.toObjectId(queries[key as keyof SearchCentralDTO])
//                             : queries[key as keyof SearchCentralDTO];
//                         break;
//                     case 'limit':
//                     case 'page':
//                         searchParams[key] = parseInt(decodedValue);
//                         break;
//                     case 'bitsRates':
//                         const bitsRatesArray = decodedValue.split(',');
//                         searchParams[key] = { $all: bitsRatesArray.filter((rate: any) => Object.values(BitsRatesEnum).includes(rate)) };
//                         break;
//                     case 'isDeleted':
//                         if (queries[key].toLowerCase() === 'all') {
//                             // Eliminar la clave si el valor es 'all'
//                             delete searchParams[key];
//                         } else {
//                             searchParams[key] = queries[key].toLowerCase() === 'true';
//                         }
//                         break;
//                         // searchParams[key] = queries[key].toLocaleLowerCase() === 'all' ? queries[key].toLocaleLowerCase() === 'all' : queries[key].toLocaleLowerCase() === 'true'
//                         // break;
//                     default:
//                         const regex = new RegExp(decodedValue, 'i');
//                         searchParams[key] = { $regex: regex };
//                         break;
//                 }
//             }
//         }
//         return searchParams;
//     }
// }
