export class QueriesVendorDTO {
    constructor(
        public readonly isDeleted?: boolean,
    ) { }

    static create(queries: { [key: string]: any }): Partial<QueriesVendorDTO> {

        const { isDeleted } = queries;

        return {
            isDeleted: isDeleted?.toLocaleLowerCase() === 'true'
        };
    }
}