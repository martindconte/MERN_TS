export class UpdateVendorDTO {

    private constructor(
        public readonly id: string,
        public readonly vendorName: string,
        private readonly isDeleted: boolean = false,
        public readonly observation?: string,
        public readonly country?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}

    get getIsDeleted() {
        return this.isDeleted
    }

    static create( vendor: UpdateVendorDTO ): [ string?, UpdateVendorDTO?] {
    // static create( vendor: Partial<Record<keyof UpdateVendorDTO, any>> ): [ string?, UpdateVendorDTO?] {
        
        const { id, vendorName, observation, country, createdAt, updatedAt, isDeleted = false } = vendor

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
            vendorName.includes('_DELETED_') ? vendorName.replace('_DELETED_', '') : vendorName,
            isDeleted,
            observation,
            country,
            createdAt,
            updatedAt,
        )]
    }
}