import { CustomError } from "../../../domain"

export class VendorEntity {
    constructor(
        public readonly id: string,
        public readonly vendorName: string,
        public readonly observation?: number,
        public readonly country?: number,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) { }

    static fromObject(object: { [key: string]: any }) {

        const { id, _id, vendorName, country, observation, createdAt, updatedAt } = object

        if (!id && !id) throw CustomError.badRequest('Missinbg id')
        if (!vendorName) throw CustomError.badRequest('Missinbg Vendor Name')

        return new VendorEntity(
            id || _id,
            vendorName.toUpperCase(),
            country.toUpperCase(),
            observation,
            createdAt,
            updatedAt,
        )
    }
}
