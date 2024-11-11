import { CentralModel } from '../../../data';
import { CentralDatasource, CreateCentralDTO, CentralEntity, QueriesDTO, UpdateCentralDTO } from '../../../domain';
import { CentralEntityWithPagination } from '../../../interface';
import { generateRandomCode, sortBy } from '../../../helpers';

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

        const [pagination, filters = {}] = QueriesDTO.pagination( queries );

        if ( pagination ) {
            const { page, limit } = pagination;
            const [totalDocs, centrals] = await Promise.all([
                CentralModel.countDocuments( filters ),
                CentralModel.find( filters )
                    .limit( limit )
                    .skip( (page - 1) * limit )
                    .sort({ codeName: 1, centralName: 1 })
            ]);

            const totalPages = Math.ceil(totalDocs / limit);
            const baseUrl = `api/central?limit=${ limit }&${new URLSearchParams( filters ).toString()}`;

            return {
                payload: centrals.map(CentralEntity.fromObject),
                pagination: {
                    totalDocs,
                    totalResults: centrals.length,
                    totalPages,
                    prevPage: page > 1 ? `${baseUrl}&page=${page - 1}` : null,
                    nextPage: page < totalPages ? `${baseUrl}&page=${page + 1}` : null,
                    page,
                    hasPrevPage: page > 1,
                    hasNextPage: page < totalPages,
                }
            };
        };

        const centrals = await CentralModel.find( filters );
        return sortBy(centrals.map(CentralEntity.fromObject), ['codeName', 'centralName']);
    }

    async getById(id: string): Promise<CentralEntity> {
        const central = await CentralModel.findOne({ _id: id, isDeleted: false });
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
        const central = await this.getById(id);
        const auxCode = generateRandomCode( 3 );
        const centralDelete = await CentralModel.findOneAndUpdate(
            { _id: id },
            {
                codeName: central.codeName + '_DELETE_' + auxCode,
                siteCode: central.siteCode + '_DELETE_' + auxCode, 
                isDeleted: true,
            }, { new: true })
        if( !centralDelete ) throw "Central Not Found!";
        return CentralEntity.fromObject(centralDelete);
    }
}
