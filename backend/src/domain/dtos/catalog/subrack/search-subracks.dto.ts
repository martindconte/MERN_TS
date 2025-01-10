import { helpersDB } from '../../../../data';
import { IOtherQueries, IPageLimit, ISubrack, ISubrackSearch, QueryParamsSubrackEnum, RoadmapEnum } from '../../../../interface';
import { SubrackEntity } from '../../../entities';

type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

export class SearchSubrackDTO {
  // Extraer dinámicamente las claves válidas de BoardEntity
  private static validKeys = new Set<keyof ISubrack>(Object.values(SubrackEntity.getPublicKeys) as Array<keyof ISubrack>);

  // private static otherValidKeys = new Set<string>(['isDeleted', 'subrack-boards-ports']);
  private static otherValidKeys: Record<QueryParamsSubrackEnum, keyof IOtherQueries> = {
    [QueryParamsSubrackEnum.isDeleted] : 'isDeleted',
    [QueryParamsSubrackEnum.subrackBoardsPorts]: 'subrackBoardsPorts',
  };

  private static processValue(key: keyof ISubrack, value: any): any {
    // const decodedValue = decodeURIComponent(value as string);
    switch (key) {
      case 'id':
      case 'vendor':
        return helpersDB.isMongoID(value) ? helpersDB.toObjectId(value) : value;
      case 'slots':
        break;
      case 'roadmap':
        return Object.values(RoadmapEnum).includes(value) ? value : '';
      case 'totalSlots':
        return parseInt(value);
      default:
        return typeof value === 'string' ? { $regex: new RegExp(value, 'i') } : value;
    }
  }

  // Método para construir el objeto de búsqueda
  static searchSubrack(queryParams: Record<string, any>): ISubrackSearch {
    const { limit, page, ...rest } = queryParams;
    const searchParams: Mutable<Partial<ISubrack>> = {};
    let paginationData: IPageLimit | undefined = { page: 1, limit: 10 };
    let othersQueries: { [key: string]: any } = {};

    // Evaluo si el query tiene las claves válidas para el tipo de Subrack
    for (const [key, value] of Object.entries(rest)) {
      if (this.validKeys.has(key as keyof ISubrack)) {
        const processedValue = this.processValue(key as keyof ISubrack, value);
        if (processedValue) searchParams[key as keyof ISubrack] = this.processValue(key as keyof ISubrack, value);
        // searchParams[key as keyof BoardEntity] = this.processValue(key as keyof BoardEntity, value);
      }
    }

    // Evaluo si el query tiene las claves válidas para otherValidKeys (Si viene por queryParam algun valor de busqueda)
    for (const [key, value] of Object.entries(rest)) {
      if (key in this.otherValidKeys) {
        switch (key) {
          case 'isDeleted':
            othersQueries[key] = value === 'true';
            break;
          case 'subrack-boards-ports':
            othersQueries['subrackBoardsPorts'] = value === 'true';
            break;
        }
      }
    }
    // for (const [key, value] of Object.entries(rest)) {
    //   if (this.otherValidKeys.has(key)) {
    //     switch (key) {
    //       case 'isDeleted':
    //         othersQueries[key] = value === 'true';
    //         break;
    //       case 'subrack-boards-ports':
    //         othersQueries[key] = value === 'true';
    //         break;
    //     }
    //   }
    // }

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
