import util from 'util';
import { SubrackModel } from '../../../data';
import { CreateSubrackDTO, SubrackDatasource, SubrackEntity, UpdateSubrackDTO } from '../../../domain';
import { ISubrackResponse, ISubrackSearch, ISubracksResponse, ISubrack, ISubracksDeleted, ISubrackToClean } from '../../../interface';
import { generateRandomCode } from '../../../helpers';
import path from 'path';

export class SubrackDatasourceImpl implements SubrackDatasource {
  async create(createSubrackDTO: CreateSubrackDTO): Promise<ISubrackResponse> {
    const { partNumber, subrackFamily, subrackType } = createSubrackDTO;
    const subrackDuplicate = await SubrackModel.findOne({
      $or: [
        // 2. Documento con el mismo partNumber
        { partNumber },
        // 3. Misma combinación de subrackType y subrackFamily
        {
          subrackType,
          subrackFamily,
        },
        // 4. Si modelName no existe o es igual a partNumber
        {
          $or: [
            { modelName: { $exists: false } }, // modelName no existe
            { modelName: partNumber }, // modelName igual a partNumber
          ],
        },
      ],
    });
    if (subrackDuplicate) throw `The Subrack whit this Part Number or Model is already registered`;
    const newSubrack = await SubrackModel.create(createSubrackDTO);
    await newSubrack.populate('vendor', 'vendorName'); // Realiza la población
    return SubrackEntity.fromObject(newSubrack.toObject());
  }

  async getAll(queries: ISubrackSearch): Promise<ISubracksResponse> {
    const { otherQueries = { isDeleted: false }, paginationData, searchParams = {} } = queries;
    if (paginationData) {
      const { limit, page } = paginationData;
      const [totalDocs, subracks] = await Promise.all([
        SubrackModel.countDocuments({ ...searchParams, ...otherQueries }),
        SubrackModel.find({ ...searchParams, ...otherQueries })
          .select('-slots')
          .populate({ path: 'vendor', select: 'vendorName' })
          .limit(limit)
          .skip((page - 1) * limit)
          .sort({
            vendor: 1,
            boardName: 1,
            partNumber: 1,
            techonology: 1,
            status: 1,
          })
          .lean(),
      ]);
      const totalPages = Math.ceil(totalDocs / limit);
      const baseUrl = `api/catalog/subrack?limit=${limit}`;
      return {
        payload: subracks.map(SubrackEntity.fromObject),
        pagination: {
          totalDocs,
          totalResults: subracks.length,
          totalPages,
          prevPage: page > 1 ? `${baseUrl}&page=${page - 1}` : null,
          nextPage: page < totalPages ? `${baseUrl}&page=${page + 1}` : null,
          page,
          hasPrevPage: page > 1,
          hasNextPage: page < totalPages,
        },
      };
    }
    const subracks = await SubrackModel.find({ ...searchParams, ...otherQueries })
      .populate('vendor', 'vendorName')
      .select('-slots')
      .populate({ path: 'vendor', select: 'vendorName' })
      .sort({
        vendor: 1,
        boardName: 1,
        partNumber: 1,
        techonology: 1,
        status: 1,
      })
      .lean();

    return {
      payload: subracks.map(SubrackEntity.fromObject),
    };
  }

  async getById(id: ISubrack['id'], queries?: ISubrackSearch): Promise<ISubrack> {
    const { otherQueries } = queries || {};
    const { isDeleted = false, subrackBoardsPorts = false } = otherQueries || {};
    const subrack = await SubrackModel.findOne({ _id: id, isDeleted }).populate([
      { path: 'vendor', select: 'vendorName' },
      {
        path: 'slots.boards', // Popular boards dentro de slots
        select: `boardName partNumber description slotSize isDeleted ${subrackBoardsPorts ? 'ports' : ''} `, // Campos de board. Solo populo los ports si `subrackBoardsPorts` es true
        populate: [
          { path: 'vendor', select: 'vendorName' },
          ...(subrackBoardsPorts // si `subrackBoardsPorts` es true, popular los ports de cada board
            ? [
                {
                  path: 'ports.equipments', // Popular los equipments dentro de ports
                  select: 'partNumber modelName description type vendor bitsRates', // Selecciona solo los campos necesarios
                  populate: { path: 'vendor', select: 'vendorName' }, // Popular el vendor de cada equipment
                },
              ]
            : []),
        ],
      },
    ]);
    if (!subrack) throw new Error('Subrack not Found!');
    return SubrackEntity.fromObject(subrack.toObject());
  }

  async getByIdDeleted(id: ISubrack['id']): Promise<ISubrackToClean> {
    const subrack = await this.getById(id, { otherQueries: { isDeleted: true } });
    const networkElements: [] = []; //TODO: Pendiente modulo de network elements

    return {
      subrack,
      networkElements, //todo: pendiente de desarrolar modulo de subracks
    };
  }

  async updateById(updateSubrackDTO: UpdateSubrackDTO, queries?: ISubrackSearch): Promise<ISubrackResponse> {
    const { id, modelName, subrackType, subrackFamily, partNumber } = updateSubrackDTO;
    const { otherQueries } = queries || {};
    const { isDeleted = false } = otherQueries || {};

    await this.getById(id, { otherQueries: { isDeleted } });

    const subrackDuplicate = await SubrackModel.findOne({
      $and: [
        // 1. Evito que la resolucion sea el mismo documento que pretendo modificar (excluyo de la busqueda el documento que deseo modificar)
        { _id: { $ne: id } },
        {
          $or: [
            // 2. Documento con el mismo partNumber
            { partNumber },
            // 3. Misma combinación de subrackType y subrackFamily
            {
              subrackType,
              subrackFamily,
            },
            // 4. Si modelName no existe o es igual a partNumber
            {
              $or: [
                { modelName: { $exists: false } }, // modelName no existe
                { modelName: partNumber }, // modelName igual a partNumber
              ],
            },
          ],
        },
      ],
    });

    if (subrackDuplicate)
      throw new Error(`The Subrack whit this Part Number ${partNumber} // Model: ${modelName} or ${subrackType} ${subrackFamily} already registered`);

    const subrackUpdate = await SubrackModel.findByIdAndUpdate(id, { ...updateSubrackDTO }, { new: true })
      .select('-slots')
      .lean()
      .populate([{ path: 'vendor', select: 'vendorName' }]);

    if (!subrackUpdate) throw new Error('Error to update Subrack!');

    return SubrackEntity.fromObject(subrackUpdate);
  }

  async deleteById(id: ISubrack['id']): Promise<ISubrackResponse> {
    const { partNumber } = await this.getById(id);
    const randomCode = generateRandomCode(3);
    const subrackSoftDeleted = await SubrackModel.findOneAndUpdate(
      { _id: id },
      {
        partNumber: partNumber + '_DELETED_' + randomCode,
        isDeleted: true,
      }
    )
      .select('-slots')
      .lean()
      .populate({ path: 'vendor', select: 'vendorName' });
    if (!subrackSoftDeleted) throw new Error('Board not deleted');
    return SubrackEntity.fromObject(subrackSoftDeleted);
  }

  async getAllDeleted(): Promise<ISubracksDeleted> {
    const subracksDeleted = await SubrackModel.find({ isDeleted: true }).select('-slots').lean().populate({ path: 'vendor', select: 'vendorName' });
    // const ids = subracksDeleted.map( baord => baord.id );
    // const [ subracks, networksElements ] = await Promise.all([
    //   SubrackModel.find() //todo: Pendiente de realizar subracks
    // ]);

    return {
      subracks: subracksDeleted.map(SubrackEntity.fromObject),
      networkElement: [], // todo: PENDIENTE DE REALIZAR SUBRACKS
    };
  }

  async clean(id: ISubrack['id']): Promise<ISubrackResponse> {
    const { subrack, networkElements } = await this.getByIdDeleted(id);
    if (subrack && networkElements.length > 0) throw 'Subrack not deleted. The Subrack has associated NetworkElements';
    const subrackCleaned = await SubrackModel.findByIdAndDelete(id)
      .populate([{ path: 'vendor', select: 'vendorName' }])
      .lean()
      .select('-slots');
    if (subrackCleaned) {
      return SubrackEntity.fromObject(subrackCleaned);
    } else {
      throw 'Error - Delete failed';
    }
  }
}
// import { CreateSubrackDTO, QueriesDTO, SubrackDatasource, SubrackEntity, UpdateSubrackDTO } from '../../../domain';
// import { sortBy } from '../../../helpers';
// import { ISubrack, ISubrackResponse, ISubracksDeleted, SubrackEntityWithPagination } from '../../../interface';

// export class SubrackDatasourceImpl implements SubrackDatasource {
//     getAllDeleted(): Promise<ISubracksDeleted> {
//         throw new Error('Method not implemented.');
//     }
//     clean(id: ISubrack['id']): Promise<ISubrackResponse> {
//         throw new Error('Method not implemented.');
//     }

//     async create(createSubrackDTO: CreateSubrackDTO): Promise<SubrackEntity> {

//         const subrackDuplicate = await SubrackModel.findOne({
//             $or: [
//                 { partNumber: createSubrackDTO.partNumber },
//                 {
//                     $and: [
//                         { modelName: { $exists: true } },
//                         { modelName: { $ne: "" } },
//                         { modelName: createSubrackDTO.modelName }
//                     ]
//                 }
//             ]
//         })

//         if (subrackDuplicate) throw `The Subrack whit this Part Number or Model is already registered`

//         const newSubrack = await SubrackModel.create(createSubrackDTO);
//         await newSubrack.populate('vendor', 'vendorName'); // Realiza la población
//         return SubrackEntity.fromObject(newSubrack);
//     }

//     async getAll(queries: QueriesDTO): Promise<SubrackEntity[] | SubrackEntityWithPagination> {
//         // throw new Error("Method not implemented.");

//         const [pagination, filters = {}] = QueriesDTO.pagination(queries)

//         if (pagination) {
//             const { page, limit } = pagination;
//             const [totalDocs, subracks] = await Promise.all([
//                 SubrackModel.countDocuments(filters || {}),
//                 SubrackModel.aggregate([
//                     {
//                         $match: filters || {}
//                     },
//                     {
//                         $lookup: {
//                             from: 'vendors', // Nombre de la colección de vendors
//                             localField: 'vendor',
//                             foreignField: '_id',
//                             as: 'vendor'
//                         }
//                     },
//                     {
//                         $unwind: '$vendor' // Desanidar el array de vendors
//                     },
//                     {
//                         $sort: {
//                             'vendor.vendorName': 1, // Ordenar por vendorName
//                             subrackFamily: 1,
//                             subrackType: 1
//                         }
//                     },
//                     {
//                         $skip: (page - 1) * limit // Paginación
//                     },
//                     {
//                         $limit: limit // Limitar la cantidad de resultados
//                     }
//                 ]),
//             ]);

//             const totalPages = Math.ceil(totalDocs / limit);
//             const baseUrl = `api/catalog/subrack?limit=${limit}&${new URLSearchParams(filters).toString()}`;

//             return {
//                 payload: subracks.map(SubrackEntity.fromObject),
//                 pagination: {
//                     totalDocs,
//                     totalPages,
//                     prevPage: page > 1 ? `${baseUrl}&page=${page - 1}` : null,
//                     nextPage: page < totalPages ? `${baseUrl}&page=${page + 1}` : null,
//                     page,
//                     hasPrevPage: page > 1,
//                     hasNextPage: page < totalPages,
//                 }
//             };
//         }

//         const subracks = await SubrackModel.find(filters || {})
//             .populate('vendor', 'vendorName')

//         return sortBy(subracks.map(SubrackEntity.fromObject), ['vendor.vendorName', 'subrackFamily', 'subrackType']);

//     }

//     async getById(id: string): Promise<SubrackEntity> {
//         const subrack = await SubrackModel.findOne({ _id: id })
//         if (!subrack) throw 'Subrack Not Found!'
//         await subrack.populate('vendor', 'vendorName'); // Realiza la población
//         return SubrackEntity.fromObject(subrack);
//     }

//     async updateById(updateSubrackDTO: UpdateSubrackDTO): Promise<SubrackEntity> {
//         await SubrackModel.findOne({ _id: updateSubrackDTO.id })

//         const subrackDuplicate = await SubrackModel.findOne({
//             $or: [
//                 {
//                     $and: [
//                         { _id: { $ne: updateSubrackDTO.id } },
//                         { modelName: updateSubrackDTO.model },
//                         {
//                             $or: [
//                                 { subrackType: updateSubrackDTO.subrackType, subrackFamily: updateSubrackDTO.subrackFamily },
//                                 {
//                                     modelName: { $exists: true },
//                                     subrackType: { $ne: updateSubrackDTO.subrackType },
//                                     subrackFamily: { $ne: updateSubrackDTO.subrackFamily }
//                                 }
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     $and: [
//                         { modelName: { $exists: false } },
//                         { subrackType: updateSubrackDTO.subrackType },
//                         { subrackFamily: updateSubrackDTO.subrackFamily }
//                     ]
//                 }
//             ]
//         });

//         if (subrackDuplicate) throw `Check the information! A subrack is already registered for the TYPE: ${updateSubrackDTO.subrackType} / FAMILY: ${updateSubrackDTO.subrackFamily} or the PN ${updateSubrackDTO.partNumber} / Model are already registered`
//         const SubrackUpdate = await SubrackModel.findByIdAndUpdate(
//             updateSubrackDTO.id,
//             { ...updateSubrackDTO },
//             { new: true }
//         );
//         if (!SubrackUpdate) throw "Error - Update Subrack failed";
//         return SubrackEntity.fromObject(SubrackUpdate);

//     }

//     async deleteById(id: string): Promise<SubrackEntity> {
//         const subrack = await SubrackModel.findOne({ _id: id })
//         if (!subrack) throw 'Subrack Not Found!'
//         const subrackDelete = await SubrackModel.findByIdAndDelete(id);
//         if (!subrackDelete) throw 'Subrack not deleted';
//         return SubrackEntity.fromObject(subrackDelete);
//     }

// }
