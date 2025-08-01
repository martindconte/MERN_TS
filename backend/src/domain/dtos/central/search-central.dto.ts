import { helpersDB } from '../../../data';
import { ICentral, ICentralSearch } from '../../../interface';
import { CentralEntity } from '../../entities';

export class SearchCentralDTO {
  private static validKeys = new Set<keyof ICentral>(Object.values(CentralEntity.getPublicKeysCentral) as Array<keyof ICentral>);

  // private static otherValidKeys = new Set<string>(['']);

  private static processValue(key: keyof ICentral, value: any): any {
    // const decodedValue = decodeURIComponent(value as string);
    switch (key) {
      case 'id':
        return helpersDB.isMongoID(value) ? helpersDB.toObjectId(value) : value;
      case 'latitude':
      case 'longitude':
        return !isNaN(value) ? parseFloat(value) : value;
      // case 'owner':
      //   return Object.values(CentralEntity.getPublicKeysCentral).includes(value) ? value : '';
      case 'status':
      case 'isDeleted':
        return value === 'true' ? true : false;
      case 'createdAt':
      case 'updatedAt':
        return !isNaN(Date.parse(value)) ? new Date(value) : value;
      default:
        return typeof value === 'string' ? { $regex: new RegExp(decodeURIComponent(value), 'i') } : value;

      // case 'bitsRates':
      //   const bitsRatesArray = decodedValue.split(',');
      //   return { $all: bitsRatesArray.filter((rate: any) => Object.values(BitsRatesEnum).includes(rate)) };
      // case 'isDeleted':
      //   return value === 'true' ? true : false;
      // default:
      //   return typeof value === 'string' ? { $regex: new RegExp(value, 'i') } : value;
    }
  }

  static searchCentral(queryParams: Record<string, any>): ICentralSearch {
    const { page, limit, ...restQueries } = queryParams;
    const searchParams: Partial<ICentral> = {};
    let paginationData: { page: number; limit: number } | undefined;
    let othersQueries: { [key: string]: any } = {};

    for (const [key, value] of Object.entries(restQueries)) {
      if (this.validKeys.has(key as keyof ICentral)) {
        searchParams[key as keyof ICentral] = this.processValue(key as keyof ICentral, value);
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
// import { CentralOwnerEnum } from '../../../interface';
// import { CentralEntity } from '../../entities';

// export class SearchCentralDTO {
//   constructor(
//     public readonly id?: string,
//     public readonly centralName?: string,
//     public readonly codeName?: string,
//     public readonly siteCode?: string,
//     public readonly owner?: string,
//     public readonly status?: string,
//     public readonly provinceName?: string,
//     public readonly districtName?: string,
//     public readonly localityName?: string,
//     public readonly address?: string,
//     public readonly latitude?: string,
//     public readonly longitude?: string,
//     public readonly description?: string,
//     public readonly observations?: string,
//     public readonly createdAt?: string,
//     public readonly updatedAt?: string,
//     public readonly limit?: string,
//     public readonly page?: string,
//     public readonly isDeleted?: string
//   ) {}

//   static createQueries(queries: Partial<Record<keyof SearchCentralDTO, any>>): Partial<CentralEntity> {
//     const searchParams: Partial<Record<keyof SearchCentralDTO, any>> = { isDeleted: false };
//     for (const key in queries) {
//       console.log(key in new SearchCentralDTO());
//       if (key in new SearchCentralDTO()) {
//         switch (key) {
//           case 'latitude':
//           case 'longitude':
//             if (!isNaN(queries[key])) searchParams[key] = parseFloat(queries[key]);
//             break;
//           case 'limit':
//           case 'page':
//             if (!isNaN(queries[key])) searchParams[key] = parseInt(queries[key]);
//             break;
//           case 'status':
//             queries[key] = queries[key];
//             break;
//           default:
//             const decodedValue = decodeURIComponent(queries[key as keyof SearchCentralDTO]);
//             const regex = new RegExp(decodedValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
//             searchParams[key as keyof SearchCentralDTO] = { $regex: regex };
//             break;
//         }
//       }
//     }
//     return searchParams;
//   }
// }
