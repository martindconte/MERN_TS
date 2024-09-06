import { CentralModel } from "../../../data";
import {
    CentralDatasource,
    CentralEntity,
    CentralEntityWithPagination,
    CreateCentralDTO,
    QueriesDTO,
    UpdateCentralDTO,
} from "../../../domain";
import { parseSubFilter, sortBy } from "../../../helpers";

export class CentralDatasourceImpl implements CentralDatasource {

    async create(createCentralDTO: CreateCentralDTO): Promise<CentralEntity> {
        
        const duplicateCentral = await CentralModel.findOne({
            $or: [
                { codeName: createCentralDTO.codeName },
                { siteCode: createCentralDTO.siteCode }
            ]
        });
        if (duplicateCentral) throw `The central: ${createCentralDTO.codeName.toUpperCase()} or Site Code ${createCentralDTO.siteCode.toUpperCase()} is already registered`
        
        const newCentral = await CentralModel.create(createCentralDTO);
        return CentralEntity.fromObject(newCentral);
    }

    async getAll(queries?: QueriesDTO): Promise<CentralEntity[] | CentralEntityWithPagination> {

        const [pagination, filters = {}] = QueriesDTO.pagination(queries);

        const query: { [key: string]: any } = {}

        if (Object.keys(filters).length > 0) {
            for (const key in filters) {
                if (filters[key]) {
                    switch (key) {
                        case 'latitude':
                        case 'longitude':
                            if (!isNaN(filters[key])) query[key] = parseFloat(filters[key]);
                            break;
                        case 'status':
                            query[key] = filters[key];
                            break;
                        case 'and': // Soportar $and
                            query['$and'] = filters[key].map((subFilter: any) => parseSubFilter(subFilter));
                            break;

                        case 'or': // Soportar $or
                            query['$or'] = filters[key].map((subFilter: any) => parseSubFilter(subFilter));
                            break;
                        default:
                            const regex = new RegExp(filters[key], 'i');
                            query[key] = { $regex: regex };
                            break;
                    }
                }
            }
        }

        if (pagination) {
            const { page, limit } = pagination;
            const [totalDocs, centrals] = await Promise.all([
                CentralModel.countDocuments(),
                CentralModel.find(query || {})
                    .skip(page - 1)
                    .limit(limit)
                    .sort({ codeName: 1, centralName: 1 })
            ]);

            const totalPages = Math.ceil(totalDocs / limit);
            const baseUrl = `api/central?limit=${limit}&${new URLSearchParams(filters).toString()}`;

            return {
                payload: centrals.map(CentralEntity.fromObject),
                totalDocs,
                totalPages,
                prevPage: page > 1 ? `${baseUrl}&page=${page - 1}` : null,
                nextPage: page < totalPages ? `${baseUrl}&page=${page + 1}` : null,
                page,
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages,
            };
        }
        
        const centrals = await CentralModel.find(query || {});
        return sortBy( centrals.map(CentralEntity.fromObject), [ 'codeName', 'centralName' ] );
    }

    async getById(id: string): Promise<CentralEntity> {
        const central = await CentralModel.findOne({ _id: id });
        if (!central) throw "Central Not Found!";
        return CentralEntity.fromObject(central);
    }

    async updateById(updateCentralDTO: UpdateCentralDTO): Promise<CentralEntity> {
        await this.getById(updateCentralDTO.id);

        const duplicateCentral = await CentralModel.findOne({
            $or: [
                { codeName: updateCentralDTO.codeName, _id: { $ne: updateCentralDTO.id } },
                { siteCode: updateCentralDTO.siteCode, _id: { $ne: updateCentralDTO.id } }
            ]
        });
        if (duplicateCentral) throw `Central with codeName ${updateCentralDTO.codeName} or siteCode ${updateCentralDTO.siteCode} is already registered.`;

        const centralUpdate = await CentralModel.findByIdAndUpdate(
            updateCentralDTO.id,
            { ...updateCentralDTO },
            { new: true }
        );
        if (!centralUpdate) throw "Error - Update failed";
        return CentralEntity.fromObject(centralUpdate);
    }

    async delete(id: string): Promise<CentralEntity> {
        await this.getById(id);
        const centralDelete = await CentralModel.findByIdAndDelete(id);
        if (!centralDelete) throw 'Central not deleted'
        return CentralEntity.fromObject(centralDelete)

    }
}
