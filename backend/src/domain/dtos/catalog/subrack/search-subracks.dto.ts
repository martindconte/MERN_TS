import { helpersDB } from '../../../../data';
import { IPageLimit, ISubrack, ISubrackSearch, RoadmapEnum } from '../../../../interface';
import { SubrackEntity } from '../../../entities';

type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
  };
  
  export class SearchSubrackDTO {
    // Extraer dinámicamente las claves válidas de BoardEntity
    private static validKeys = new Set<keyof ISubrack>(Object.values(SubrackEntity.getPublicKeys) as Array<keyof ISubrack>);
  
    private static otherValidKeys = new Set<string>(['isDeleted']);
  
    private static processValue(key: keyof ISubrack, value: any): any {
      const decodedValue = decodeURIComponent(value as string);
        switch (key) {
        case 'id':
        case 'vendor':
          return helpersDB.isMongoID(value) ? helpersDB.toObjectId(value) : value;
        case 'slots':
          break;
        // case 'bitsRates':
        //   if (value === 'false') return undefined;
        //   const bitsRatesArray = decodedValue.split(',');
        //   return { $all: bitsRatesArray.filter((rate: any) => Object.values(BitsRatesEnum).includes(rate)) };
        case 'roadmap':
          return Object.values(RoadmapEnum).includes(value) ? value : '';
        case 'totalSlots':
        // case 'slotSize':
          return parseInt(value);
        default:
          return typeof value === 'string' ? { $regex: new RegExp(value, 'i') } : value;
      }
    }
  
    // Método para construir el objeto de búsqueda
    static searchSubrack(queryParams: Record<string, any>): ISubrackSearch {
      const { limit, page, ...rest } = queryParams;
      // const result: IBoardSearch = {};
      const searchParams: Mutable<Partial<ISubrack>> = {};
      let paginationData: IPageLimit | undefined = { page: 1, limit: 10 };
      let othersQueries: { [key: string]: any } = {};
  
      for (const [key, value] of Object.entries(rest)) {
        if (this.validKeys.has(key as keyof ISubrack)) {
          const processedValue = this.processValue(key as keyof ISubrack, value);
          if (processedValue) searchParams[key as keyof ISubrack] = this.processValue(key as keyof ISubrack, value);
          // searchParams[key as keyof BoardEntity] = this.processValue(key as keyof BoardEntity, value);
        }
      }
  
      for (const [key, value] of Object.entries(rest)) {
        if (this.otherValidKeys.has(key)) {
          switch (key) {
            case 'isDeleted':
              othersQueries[key] = value === 'true';
              break;
          }
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
  

// import { ISlots, SubrackOwner, SubrackStatus, TechnologySubrack } from "../../../../interface";

// export class SearchSubrackDTO {
//     constructor(
//         public readonly id?: string,
//         public readonly partNumber?: string,
//         public readonly slots?: ISlots[],
//         public readonly subrackFamily?: string,
//         public readonly subrackType?: string,
//         public readonly totalSlot?: number,
//         public readonly vendor?: string,
//         public readonly boards?: string[],
//         public readonly description?: string,
//         public readonly model?: string,
//         public readonly observations?: string,
//         public readonly owner?: SubrackOwner,
//         public readonly status?: SubrackStatus,
//         public readonly technology?: TechnologySubrack,
//         public readonly limit?: number,
//         public readonly page?: number,
//     ) {}

//     static create(queries: { [key: string]: any }): Partial<SearchSubrackDTO> {
//         // Crea un objeto con las propiedades que están presentes en el query
//         const searchParams: { [key: string]: any } = {};

//         for (const key in queries) {
//             if (key in new SearchSubrackDTO()) {
//                 switch (key) {
//                     case 'totalSlot':
//                         searchParams[key] = parseFloat(queries[key]);
//                         break;
//                     case 'limit':
//                     case 'page':
//                         searchParams[key] = parseFloat(queries[key])
//                         break;
//                     default:
//                         const regex = new RegExp(queries[key], 'i');
//                         searchParams[key] = { $regex: regex };
//                         break;
//                 }
//             }
//         }

//         return searchParams;
//     }
// }
