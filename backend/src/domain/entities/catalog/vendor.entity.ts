import { CustomError } from '../../errors/custom.errors'

export class VendorEntity {
    
    constructor(
        public readonly id: string,
        public readonly vendorName: string,
        public readonly observation?: string,
        public readonly country?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) { }

    static fromObject(object: { [key: string]: any }) {

        const { id, _id, vendorName, country, observation, createdAt, updatedAt } = object

        if (!id && !_id) throw CustomError.badRequest('Missing VENDOR id')
        if (!vendorName) throw CustomError.badRequest('Missing Vendor Name')

        return new VendorEntity(
            id || _id,
            vendorName.toUpperCase(),
            observation,
            country.toUpperCase(),
            createdAt,
            updatedAt,
        )
    }
}
