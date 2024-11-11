import { CentralOwnerEnum } from '../../../interface';
import { CentralEntity } from '../../entities';

export class SearchCentralDTO {
    constructor(
        public readonly id?: string,
        public readonly centralName?: string,
        public readonly codeName?: string,
        public readonly siteCode?: string,
        public readonly owner?: string,
        public readonly status?: string,
        public readonly provinceName?: string,
        public readonly districtName?: string,
        public readonly localityName?: string,
        public readonly address?: string,
        public readonly latitude?: string,
        public readonly longitude?: string,
        public readonly description?: string,
        public readonly observations?: string,
        public readonly createdAt?: string,
        public readonly updatedAt?: string,
        public readonly limit?: string,
        public readonly page?: string,
        public readonly isDeleted?: string,
    ){}

    static createQueries(queries: Partial<Record<keyof SearchCentralDTO, any>>): Partial<CentralEntity> {
        const searchParams: Partial<Record<keyof SearchCentralDTO, any>> = { isDeleted: false }
        for (const key in queries) {
            console.log(key in new SearchCentralDTO());
            if (key in new SearchCentralDTO()) {
                switch (key) {
                    case 'latitude':
                    case 'longitude':
                        if (!isNaN(queries[key])) searchParams[key] = parseFloat(queries[key]);
                        break;
                    case 'limit':
                    case 'page':
                        if (!isNaN(queries[key])) searchParams[key] = parseInt(queries[key]);
                        break;
                    case 'status':
                        queries[key] = queries[key];
                        break;
                    default:
                        const decodedValue = decodeURIComponent(queries[key as keyof SearchCentralDTO]);
                        const regex = new RegExp(decodedValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
                        searchParams[key as keyof SearchCentralDTO] = { $regex: regex };
                        break;
                }
            }
        }

        console.log(searchParams);

        return searchParams
    }
}