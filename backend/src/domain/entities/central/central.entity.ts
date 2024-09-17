import { CustomError } from "../../../domain"

export enum CentralOwner {
        tasa = 'TASA',
        mvs = 'MVS',
        other = 'OTHER',
}

export class CentralEntity {
        constructor(
                public readonly id: string,
                public readonly centralName: string,
                public readonly codeName: string,
                public readonly siteCode: string,
                public readonly owner: CentralOwner,
                public readonly status: boolean,
                public readonly provinceName?: string,
                public readonly districtName?: string,
                public readonly localityName?: string,
                public readonly address?: string,
                public readonly latitude?: number,
                public readonly longitude?: number,
                public readonly description?: string,
                public readonly observations?: string,
                public readonly createdAt?: Date,
                public readonly updatedAt?: Date,
        ) { }

        static fromObject(object: { [key: string]: any }) {

                const { id,
                        _id,
                        centralName,
                        codeName,
                        siteCode,
                        owner,
                        status,
                        provinceName,
                        districtName,
                        localityName,
                        address,
                        latitude,
                        longitude,
                        description,
                        observations,
                        createdAt,
                        updatedAt,
                } = object

                if (!id && !id) throw CustomError.badRequest('Missinbg id')
                if (!centralName) throw CustomError.badRequest('Missinbg Central Name')
                if (!codeName) throw CustomError.badRequest('Missinbg Code Name')
                if (!siteCode) throw CustomError.badRequest('Missinbg Site Code')
                if (!owner) throw CustomError.badRequest('Missinbg Owner')
                if (status === undefined || status === null || typeof status !== 'boolean') throw CustomError.badRequest('Missinbg status')
                if( typeof latitude !== 'number' || typeof longitude !== 'number' ) throw CustomError.badRequest('Latitude and Longitude must be a number')

                return new CentralEntity(
                        id || _id,
                        centralName,
                        codeName.toUpperCase(),
                        siteCode.toUpperCase(),
                        owner.toUpperCase(),
                        status,
                        provinceName,
                        districtName,
                        localityName,
                        address,
                        latitude,
                        longitude,
                        description,
                        observations,
                        createdAt,
                        updatedAt,
                )
        }
}
