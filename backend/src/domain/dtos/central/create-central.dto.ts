import { CentralOwner } from "../../../interface";

export class CreateCentralDTO {

    private constructor(
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
        // public readonly createdAt?: Date,
        // public readonly updatedAt?: Date,
      ) {}

    static create( central: { [key: string]: any } ): [ string?, CreateCentralDTO?] {

        const {
            centralName,
            codeName,
            siteCode,
            owner = 'TASA',
            status = true,
            provinceName,
            districtName,
            localityName,
            address,
            latitude,
            longitude,
            description,
            observations,
            // createdAt,
            // updatedAt,
        } = central;

        let statusBoolean = status;
        
        if( !centralName ) return ['Missing Central Name'];
        if( !codeName ) return ['Missing Code Name'];
        if( !siteCode ) return ['Missing Site Code'];
        if( !owner ) return ['Missing Owner'];
        if( typeof status !== 'boolean' ) {
            statusBoolean = ( status === 'true' )
        };
        if( typeof latitude !== 'number' || typeof longitude !== 'number' ) return ['Latitude and Longitude must be a number']
        
        return [ undefined, new CreateCentralDTO(
            centralName,
            codeName,
            siteCode,
            owner,
            statusBoolean,
            provinceName,
            districtName,
            localityName,
            address,
            latitude,
            longitude,
            description,
            observations,
            // createdAt,
            // updatedAt,
        )]

    }

}