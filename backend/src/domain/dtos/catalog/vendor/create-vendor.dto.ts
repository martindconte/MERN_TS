export class CreateVendorDTO {
    private constructor(
        public readonly vendorName: string,
        private readonly isDeleted: boolean = false, // propiedad privada y no modificable
        public readonly observation?: string,
        public readonly country?: string,
    ) {}

    static create(vendor: Partial<Record<keyof CreateVendorDTO, any>>): [string?, CreateVendorDTO?] {
        const { vendorName, observation, country } = vendor;

        if (!vendorName || vendorName.includes('_DELETED_')) return ['Missing Vendor Name and cannot contain _DELETED_'];

        // Retornar la instancia solo si todo es válido
        return [undefined, new CreateVendorDTO(
            vendorName,
            false, // isDeleted siempre es falso
            observation,
            country,
        )];
    }
}