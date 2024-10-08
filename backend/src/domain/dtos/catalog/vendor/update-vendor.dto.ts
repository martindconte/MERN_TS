export class UpdateVendorDTO {

    private constructor(
        public readonly id: string,
        public readonly vendorName: string,
        public readonly observation?: number,
        public readonly country?: number,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}

    static create( vendor: { [key: string]: any } ): [ string?, UpdateVendorDTO?] {

        const { id, vendorName, observation, country, createdAt, updatedAt } = vendor

        if(!id) return ['Missing Id']
        if(!vendorName) return ['Missing Central Name']
        if( createdAt ) {
            const date = new Date( createdAt )
            if( date.toString() === 'Invalid Date' ) return ['createdAt must be a valid Date'] 
        }
        if( updatedAt ) {
            const date = new Date( updatedAt )
            if( date.toString() === 'Invalid Date' ) return ['updatedAt must be a valid Date'] 
        }

        return [ undefined, new UpdateVendorDTO(
            id,
            vendorName,
            observation,
            country,
            createdAt,
            updatedAt,
        )]
    }
}