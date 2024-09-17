import { ISlots, SubrackOwner, SubrackStatus, TechnologySubrack } from "../../../entities/catalog/subrack.entity";

export class SearchSubrackDTO {
    constructor(
        public readonly id?: string,
        public readonly partNumber?: string,
        public readonly slots?: ISlots[],
        public readonly subrackFamily?: string,
        public readonly subrackType?: string,
        public readonly totalSlot?: number,
        public readonly vendor?: string,
        public readonly boards?: string[],
        public readonly description?: string,
        public readonly model?: string,
        public readonly observations?: string,
        public readonly owner?: SubrackOwner,
        public readonly status?: SubrackStatus,
        public readonly technology?: TechnologySubrack,
        public readonly limit?: number,
        public readonly page?: number,
    ) { }

    static create(queries: { [key: string]: any }): Partial<SearchSubrackDTO> {
        // Crea un objeto con las propiedades que están presentes en el query
        const searchParams: { [key: string]: any } = {};

        for (const key in queries) {
            if (key in new SearchSubrackDTO()) {
                switch (key) {
                    case 'totalSlot':
                        searchParams[key] = parseFloat(queries[key]);
                        break;
                    case 'limit':
                    case 'page':
                        searchParams[key] = parseFloat(queries[key])
                        break;
                    default:
                        const regex = new RegExp(queries[key], 'i');
                        searchParams[key] = { $regex: regex };
                        break;
                }
            }
        }

        return searchParams;
    }
}