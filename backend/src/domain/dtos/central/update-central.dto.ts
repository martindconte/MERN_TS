import { CentralOwner } from "../../../interface"

export class UpdateCentralDTO {

    private constructor(
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

    static update(central: { [key: string]: any }): [string?, UpdateCentralDTO?] {

        const { id, centralName, codeName, siteCode, owner, status, provinceName, districtName, localityName, address, latitude, longitude, description, observations, createdAt, updatedAt } = central

        if (!id) return ['Missing id']
        if (!centralName) return ['Missing Central Name']
        if (!codeName) return ['Missing Code Name']
        if (!siteCode) return ['Missing Site Code']
        if (!owner) return ['Missing Owner']
        if (status === undefined || status === null || typeof status !== 'boolean') return ['status must be boolean and is required']
        if( typeof latitude !== 'number' || typeof longitude !== 'number' ) return ['Latitude and Longitude must be a number']


        return [undefined, new UpdateCentralDTO(
            id,
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
        )]

    }

}