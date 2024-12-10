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