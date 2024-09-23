import { SubrackModel } from "../../../data";
import { CreateSubrackDTO, QueriesDTO, SubrackDatasource, SubrackEntity, SubrackEntityWithPagination, UpdateSubrackDTO } from "../../../domain";
import { sortBy } from "../../../helpers";

export class SubrackDatasourceImpl implements SubrackDatasource {

    async create(createSubrackDTO: CreateSubrackDTO): Promise<SubrackEntity> {

        const subrackDuplicate = await SubrackModel.findOne({
            $or: [
                { partNumber: createSubrackDTO.partNumber },
                {
                    $and: [
                        { model: { $exists: true } },
                        { model: { $ne: "" } },
                        { model: createSubrackDTO.model }
                    ]
                }
            ]
        })

        if (subrackDuplicate) throw `The Subrack whit this Part Number or Model is already registered`

        const newSubrack = await SubrackModel.create(createSubrackDTO);
        await newSubrack.populate('vendor', 'vendorName'); // Realiza la población
        return SubrackEntity.fromObject(newSubrack);

    }

    async getAll(queries: QueriesDTO): Promise<SubrackEntity[] | SubrackEntityWithPagination> {
        // throw new Error("Method not implemented.");

        const [pagination, filters = {}] = QueriesDTO.pagination(queries)

        if( pagination ) {
            const { page, limit } = pagination;
        const [totalDocs, subracks] = await Promise.all([
            SubrackModel.countDocuments(filters || {}),
            SubrackModel.aggregate([
                {
                    $match: filters || {}
                },
                {
                    $lookup: {
                        from: 'vendors', // Nombre de la colección de vendors
                        localField: 'vendor',
                        foreignField: '_id',
                        as: 'vendor'
                    }
                },
                {
                    $unwind: '$vendor' // Desanidar el array de vendors
                },
                {
                    $sort: {
                        'vendor.vendorName': 1, // Ordenar por vendorName
                        subrackFamily: 1,
                        subrackType: 1
                    }
                },
                {
                    $skip: (page - 1) * limit // Paginación
                },
                {
                    $limit: limit // Limitar la cantidad de resultados
                }
            ]),
        ]);

            const totalPages = Math.ceil(totalDocs / limit);
            const baseUrl = `api/catalog/subrack?limit=${limit}&${new URLSearchParams(filters).toString()}`;

            return {
                payload: subracks.map(SubrackEntity.fromObject),
                pagination: {
                    totalDocs,
                    totalPages,
                    prevPage: page > 1 ? `${baseUrl}&page=${page - 1}` : null,
                    nextPage: page < totalPages ? `${baseUrl}&page=${page + 1}` : null,
                    page,
                    hasPrevPage: page > 1,
                    hasNextPage: page < totalPages,
                }
            };
        }
        
        const subracks = await SubrackModel.find(filters || {})
            .populate('vendor', 'vendorName')

        return sortBy( subracks.map(SubrackEntity.fromObject), [ 'vendor.vendorName', 'subrackFamily', 'subrackType' ] );

    }

    async getById(id: string): Promise<SubrackEntity> {
        const subrack = await SubrackModel.findOne({ _id: id })
        if (!subrack) throw 'Subrack Not Found!'
        await subrack.populate('vendor', 'vendorName'); // Realiza la población
        return SubrackEntity.fromObject(subrack);
    }

    async updateById(updateSubrackDTO: UpdateSubrackDTO): Promise<SubrackEntity> {
        await SubrackModel.findOne({ _id: updateSubrackDTO.id })

        const subrackDuplicate = await SubrackModel.findOne({
            $or: [
              {
                $and: [
                  { _id: { $ne: updateSubrackDTO.id } },
                  { model: updateSubrackDTO.model },
                  { $or: [
                    { subrackType: updateSubrackDTO.subrackType, subrackFamily: updateSubrackDTO.subrackFamily },
                    {
                      model: { $exists: true },
                      subrackType: { $ne: updateSubrackDTO.subrackType },
                      subrackFamily: { $ne: updateSubrackDTO.subrackFamily }
                    }
                  ] }
                ]
              },
              {
                $and: [
                  { model: { $exists: false } },
                  { subrackType: updateSubrackDTO.subrackType },
                  { subrackFamily: updateSubrackDTO.subrackFamily }
                ]
              }
            ]
          });

        if( subrackDuplicate ) throw `Check the information! A subrack is already registered for the TYPE: ${updateSubrackDTO.subrackType} / FAMILY: ${updateSubrackDTO.subrackFamily} or the PN ${updateSubrackDTO.partNumber} / Model are already registered`
        const SubrackUpdate = await SubrackModel.findByIdAndUpdate(
            updateSubrackDTO.id,
            { ...updateSubrackDTO },
            { new: true }
        );
        if (!SubrackUpdate) throw "Error - Update Subrack failed";
        return SubrackEntity.fromObject(SubrackUpdate);
        
    }

    async deleteById(id: string): Promise<SubrackEntity> {
        const subrack = await SubrackModel.findOne({ _id: id })
        if (!subrack) throw 'Subrack Not Found!'
        const subrackDelete = await SubrackModel.findByIdAndDelete(id);
        if (!subrackDelete) throw 'Subrack not deleted';
        return SubrackEntity.fromObject(subrackDelete);
    }

}