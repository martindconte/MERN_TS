export class CreateVendorDTO {

    private constructor(
        public readonly vendorName: string,
        public readonly observation?: string,
        public readonly country?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}

    static create( vendor: { [key: string]: any } ): [ string?, CreateVendorDTO?] {

        const { vendorName, observation, country, createdAt, updatedAt } = vendor

        if(!vendorName) return ['Missing Central Name']
        if( createdAt ) {
            const date = new Date( createdAt )
            if( date.toString() === 'Invalid Date' ) return ['createdAt must be a valid Date'] 
        }
        if( updatedAt ) {
            const date = new Date( updatedAt )
            if( date.toString() === 'Invalid Date' ) return ['updatedAt must be a valid Date'] 
        }

        return [ undefined, new CreateVendorDTO(
            vendorName,
            observation,
            country,
            createdAt,
            updatedAt,
        )]
    }
}