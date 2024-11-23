import { BoardDocument, BoardModel } from '../../../data';
import { BoardDatasource, BoardEntity, CreateBoardDTO, UpdateBoardDTO } from '../../../domain';
import { BitsRatesEnum, BoardEntityWithPagination, IBoardsDeleted, IBoardSearch, Port } from '../../../interface';
import { generateRandomCode, sortBy } from '../../../helpers';
import { Types } from 'mongoose';
import util from 'util';

interface VendorPopulate {
  _id: Types.ObjectId;
  vendorName: string;
}

interface BoardPopulate extends Omit<BoardEntity, 'vendor' | 'ports'> {
  isDeleted: boolean;
  vendor: VendorPopulate;
  ports?: (Omit<Port, 'equipments'> & {
    equipments?: Array<{
      _id: Types.ObjectId;
      partNumber: string;
      vendor: VendorPopulate;
      modelName: string;
      description?: string;
      bitsRates?: BitsRatesEnum[];
    }>;
  })[];
}

export class BoardDatasourceImpl implements BoardDatasource {
  private docToEntity(document: BoardDocument): Omit<BoardEntity, 'isDeleted'> {
    const docPopulate = document.toObject() as BoardPopulate;
    const portsTransform =
      docPopulate.ports && docPopulate.ports?.length > 0
        ? docPopulate.ports?.map((port) => ({
            ...port,
            equipments: port.equipments?.map((eq) => {
              const { _id, ...data } = eq;
              return {
                ...data,
                id: _id.toString(),
                vendor: {
                  id: data.vendor._id.toString(),
                  vendorName: eq.vendor.vendorName,
                },
              };
            }),
          }))
        : [];

    return {
      ...docPopulate,
      vendor: docPopulate.vendor ? {
        id: docPopulate.vendor._id.toString(),
        vendorName: docPopulate.vendor.vendorName,
      }: {},
      ports: portsTransform,
    };
  }

  async create(createBoardDTO: CreateBoardDTO): Promise<BoardEntity> {
    const { boardName, partNumber } = createBoardDTO;

    const boardDuplicate = await BoardModel.findOne({
      $or: [{ boardName }, { partNumber }],
    });

    if (boardDuplicate) throw new Error(`The Board whit this Board Name or Part Number is already registered`);

    const newBoard = await BoardModel.create(createBoardDTO);
    await newBoard.populate([{ path: 'vendor', select: 'vendorName _id' }]);

    const transformedBoard = newBoard.toObject({ virtuals: true });
    return BoardEntity.fromObject(transformedBoard);
  }

  async getAll(queries?: IBoardSearch): Promise<BoardEntity[] | BoardEntityWithPagination> {
    const { searchParams = {}, otherQueries = {}, paginationData } = queries || {};
    if (paginationData) {
      const { page, limit } = paginationData;
      const [totalDocs, boards] = await Promise.all([
        BoardModel.countDocuments({ ...searchParams, ...otherQueries }),
        BoardModel.find({ ...searchParams, ...otherQueries })
          .populate([
            { path: 'vendor', select: 'vendorName' },
            {
              path: 'ports.equipments',
              select: 'partNumber modelName vendor description bitsRates',
              populate: {
                path: 'vendor',
                select: 'vendorName',
                model: 'Vendor',
              },
            },
          ])
          .limit(limit)
          .skip((page - 1) * limit)
          .sort({
            'vendor.vendorName': 1,
            boardName: 1,
            partNumber: 1,
            techonology: 1,
            status: 1,
          }),
        // .lean()
      ]);

      const boardEntity = boards.map( this.docToEntity );
      const totalPages = Math.ceil(totalDocs / limit);
      const baseUrl = `api/catalog/board?limit=${limit}&page=${page}&${new URLSearchParams().toString()}`;
      return {
        payload: boardEntity.map(BoardEntity.fromObject),
        pagination: {
          totalDocs,
          totalResults: boards.length,
          totalPages,
          prevPage: page > 1 ? `${baseUrl}&page=${page - 1}` : null,
          nextPage: page < totalPages ? `${baseUrl}&page=${page + 1}` : null,
          page,
          hasPrevPage: page > 1,
          hasNextPage: page < totalPages,
        },
      };
    }

    const boards = await BoardModel.find().populate('vendor', 'vendorName');
    return sortBy(boards.map(BoardEntity.fromObject), ['vendor.vendorName', 'type', 'partNumber', 'model']);
  }

  async getById(id: BoardEntity['id'], queries?: IBoardSearch): Promise<BoardEntity> {
    const { otherQueries } = queries || {};
    const { isDeleted = false } = otherQueries || {};
    const board = await BoardModel.findOne({ _id: id, isDeleted });
    if (!board) throw new Error('Board not Found!');
    await board.populate([
      { path: 'vendor', select: 'vendorName' },
      {
        path: 'ports.equipments',
        select: 'partNumber modelName vendor description bitsRates',
        populate: { path: 'vendor', select: 'vendorName', model: 'Vendor' },
      },
    ]);

    // console.log('getById ----------------->', util.inspect(board, { showHidden: false, depth: null, colors: true }));
    const boardEntity = this.docToEntity(board);
    // console.log('getById BoardEnitty toDoc----------------->', util.inspect(boardEntity, { showHidden: false, depth: null, colors: true }));
    // console.log('getById Entity antes  ----------------->', util.inspect(BoardEntity.fromObject(boardEntity), { showHidden: false, depth: null, colors: true }));
    return BoardEntity.fromObject(boardEntity);
  }

  async updateById(updateBoardDTO: UpdateBoardDTO, queries?: IBoardSearch): Promise<BoardEntity> {
    const { otherQueries } = queries || {};
    const { isDeleted = false } = otherQueries || {};

    await this.getById(updateBoardDTO.id, { otherQueries: { isDeleted } });

    try {
      const boardDuplicated = await BoardModel.findOne({
        $and: [{ _id: { $ne: updateBoardDTO.id } }, { partNumber: updateBoardDTO.partNumber }, { boardName: updateBoardDTO.boardName }],
      });

      if (boardDuplicated)
        throw new Error(
          `The Transceiver whit this Part Number ${updateBoardDTO.partNumber} or Board Name ${updateBoardDTO.boardName}already registered`
        );

      const boardUpdate = await BoardModel.findByIdAndUpdate(updateBoardDTO.id, { ...updateBoardDTO }, { new: true }).populate([
        { path: 'vendor', select: 'vendorName' },
        {
          path: 'ports.equipments',
          select: 'partNumber modelName vendor description bitsRates',
          populate: { path: 'vendor', select: 'vendorName', model: 'Vendor' },
        },
      ]);
      const boardEntity = this.docToEntity(boardUpdate!);
      return BoardEntity.fromObject(boardEntity);
    } catch (error) {
      console.error(error);
      throw new Error(`Error updating board: ${error}`);
    };
  };

  async deleteById(id: BoardEntity['id']): Promise<BoardEntity> {
    const boardToDelete = await this.getById( id )
    const randomCode = generateRandomCode(3);
    const boardDeleted = await BoardModel.findOneAndUpdate(
      { _id: id },
      {
          partNumber: boardToDelete.partNumber + '_DELETED_' + randomCode,
          boardName: boardToDelete.boardName + '_DELETED_' + randomCode,
          isDeleted: true,
      },
      { new: true }
    ).populate([
      { path: 'vendor', select: 'vendorName' },
      {
        path: 'ports.equipments',
        select: 'partNumber modelName vendor description bitsRates',
        populate: {
          path: 'vendor',
          select: 'vendorName',
          model: 'Vendor',
        },
      },
    ])

    if( !boardDeleted ) throw new Error('Board not deleted');

    const boardEntity = this.docToEntity( boardDeleted )
    return BoardEntity.fromObject( boardEntity )
  }

  getAllDeleted(): Promise<IBoardsDeleted> {
    throw new Error('Method not implemented.');
  }
  clean(id: BoardEntity['id']): Promise<BoardEntity> {
    throw new Error('Method not implemented.');
  }
}

// private transformIds<T>(doc: T): T {
//     if (Array.isArray(doc)) {
//         return doc.map(item => this.transformIds(item)) as unknown as T;
//     } else if (doc && typeof doc === 'object') {
//         const transformedDoc = { ...doc } as any;

//         if (transformedDoc._id) {
//             transformedDoc.id = transformedDoc._id.toString();
//             delete transformedDoc._id;
//         }

//         Object.keys(transformedDoc).forEach(key => {
//             if (typeof transformedDoc[key] === 'object') {
//                 transformedDoc[key] = this.transformIds(transformedDoc[key]);
//             }
//         });

//         return transformedDoc;
//     }

//     return doc;
// }
// import { BoardDocument, BoardModel } from '../../../data';
// import util from 'util'
// import { BoardDatasource, BoardEntity, CreateBoardDTO, UpdateBoardDTO } from '../../../domain';
// import { BoardEntityWithPagination, IBoardsDeleted, IBoardSearch, Port } from '../../../interface';
// import { sortBy } from '../../../helpers';
// import { Types } from 'mongoose';

// interface PopulateVendor {
//     _id: Types.ObjectId;
//     vendorName: string;
// }

// interface PopulateEquipments {
//     partNumber : string;
//     modelName : string;
//     vendor: PopulateVendor;
//     description : string;
//     bitsRates: string;
// }

// type PopulateDocument = Omit<BoardDocument, 'vendor'> & { vendor: PopulateVendor | Types.ObjectId }
// // type PopulateDocument = Omit<BoardDocument, 'vendor' | 'ports'> & {
// //     vendor: PopulateVendor
// //     ports: Omit<Port, 'equipments'> & { equipments: PopulateEquipments }
// // }
// export class BoardDatasourceImpl implements BoardDatasource {

//     // private transformIds = (doc: {[ key: string ]: any }) => {
//     //     const transformedDoc = doc.toObject();

//     //         // Transformar cada port y sus equipments
//     //         if (transformedDoc.ports) {
//     //             transformedDoc.ports.forEach((port: any) => {
//     //             if (port.equipments) {
//     //                 port.equipments.forEach((equipment: any) => {
//     //                 // Verificar si el _id del equipment existe y agregar el campo id
//     //                 if (equipment._id) {
//     //                     equipment.id = equipment._id.toString(); // Convertir ObjectId a string
//     //                 }

//     //                 // Verificar si el vendor tiene un _id y agregar el campo id
//     //                 if (equipment.vendor && equipment.vendor._id) {
//     //                     equipment.vendor.id = equipment.vendor._id.toString(); // Convertir ObjectId a string
//     //                 }
//     //                 });
//     //             }
//     //             });
//     //         }
//     //         return transformedDoc;
//     //   };

//     // private transformIds(document: BoardDocument): TransformedBoard {
//     //     const transformed: TransformedBoard = {
//     //       ...document.toObject(), // Convierte el documento a un objeto plano
//     //       id: document._id // Asigna `id` basado en `_id`
//     //     //   id: document._id.toString(), // Asigna `id` basado en `_id`
//     //     };

//     //     delete (transformed as any)._id; // Elimina el `_id` del objeto
//     //     delete transformed.isDeleted; // Opcional: elimina campos no deseados

//     //     // Transforma los subdocumentos si es necesario
//     //     if (transformed.vendor && typeof transformed.vendor === 'object') {
//     //       transformed.vendor = {
//     //         ...(transformed.vendor as any),
//     //         id: (transformed.vendor as any)._id.toString(),
//     //       };
//     //       delete (transformed.vendor as any)._id;
//     //     }

//     //     if (Array.isArray(transformed.ports)) {
//     //       transformed.ports = transformed.ports.map((port) => ({
//     //         ...port,
//     //         equipments: port.equipments.map((equipment) => ({
//     //           ...equipment,
//     //           id: equipment._id.toString(),
//     //           vendor: equipment.vendor ? {
//     //             ...equipment.vendor,
//     //             id: equipment.vendor._id.toString(),
//     //           } : null,
//     //         })),
//     //       }));
//     //     }

//     //     return transformed;
//     //   }
//     private transformIds(document: PopulateDocument): Omit<BoardEntity, 'isDeleted'> {
//         const docObj = document.toObject({ virtuals: true })
//         console.log('desde IMPL docObj -------------->', util.inspect(docObj, { showHidden: false, depth: null, colors: true }));
//         const dataTransform: Omit<BoardEntity, 'isDeleted'> = {
//             ...document,
//             id: document._id.toString(),
//             vendor: typeof document.vendor === 'object' && '_id' in document.vendor
//                 ? { id: document.vendor._id.toString(), vendorName: (document.vendor as PopulateVendor).vendorName }
//                 : { id: (document.vendor as Types.ObjectId).toString(), vendorName: '' },
//             ports: document.ports?.map(port => ({
//                 ...port,
//                 equipments: port.equipments.map(equipment => equipment.toString()),
//             })),
//         };

//         return dataTransform;
//     }

//     async create(createBoardDTO: CreateBoardDTO): Promise<BoardEntity> {

//         const { boardName, partNumber } = createBoardDTO

//         const boardDuplicate = await BoardModel.findOne({
//             $or: [{ boardName }, { partNumber }]
//         })

//         if (boardDuplicate) throw new Error(`The Board whit this Board Name or Part Number is already registered`);

//         const newBoard = await BoardModel.create(createBoardDTO)
//         await newBoard.populate([{ path: 'vendor', select: 'vendorName _id' }]);

//         // console.log('desde IMPL newBoard -------------->', util.inspect(newBoard, { showHidden: false, depth: null, colors: true }));

//         // const transformedBoard = newBoard.toObject({ virtuals: true });
//         // const transformedBoard = this.transformIds( newBoard );
//         // const transformedBoard = this.transformIds( newBoard.toObject({ virtuals: true }) );

//         // if (transformedBoard.ports) {
//         //     transformedBoard.ports.forEach((port: any) => {
//         //         if (port.equipments) {
//         //             port.equipments.forEach((equipment: any) => {
//         //                 equipment.id = equipment._id;
//         //                 delete equipment._id;

//         //                 // Transformar vendor dentro de equipment
//         //                 if (equipment.vendor) {
//         //                     equipment.vendor.id = equipment.vendor._id;
//         //                     delete equipment.vendor._id;
//         //                 }
//         //             });
//         //         }
//         //     });
//         // }
//         const transformedBoard = newBoard.toObject({ virtuals: true });
//         // const transformedBoard = this.transformIds( newBoard );

//         console.log('desde IMPL transformedBoard -------------->', util.inspect(transformedBoard, { showHidden: false, depth: null, colors: true }));

//         return BoardEntity.fromObject(transformedBoard)
//         // return BoardEntity.fromObject(transformedBoard)
//     }

//     async getAll(queries?: IBoardSearch): Promise<BoardEntity[] | BoardEntityWithPagination> {
//         console.log('getAll queries ------------>', queries);
//         const { searchParams = {}, otherQueries = {}, paginationData } = queries || {};

//         // const [pagination, filters = {}] = QueriesDTO.pagination(queries)
//         if (paginationData) {
//             const { page, limit } = paginationData
//             const [totalDocs, boards] = await Promise.all([
//                 BoardModel.countDocuments({ ...searchParams, ...otherQueries }),
//                 BoardModel.find({ ...searchParams, ...otherQueries })
//                     // .populate([
//                     //     { path: 'vendor', select: 'vendorName' },
//                     //     { path: 'ports.equipment', select: 'partNumber modelName vendor description bitsRates' }
//                     // ])
//                     .limit(limit)
//                     .skip((page - 1) * limit)
//                     .sort({ 'vendor.vendorName': 1, boardName: 1, partNumber: 1, techonology: 1, status: 1 })
//             ]);

//             console.log('desde IMPL BOARDS -------------->', util.inspect(boards, { showHidden: false, depth: null, colors: true }));

//             const totalPages = Math.ceil(totalDocs / limit);
//             const baseUrl = `api/catalog/board?limit=${limit}&page=${page}&${new URLSearchParams().toString()}`;
//             return {
//                 payload: boards.map(BoardEntity.fromObject),
//                 pagination: {
//                     totalDocs,
//                     totalResults: boards.length,
//                     totalPages,
//                     prevPage: page > 1 ? `${baseUrl}&page=${page - 1}` : null,
//                     nextPage: page < totalPages ? `${baseUrl}&page=${page + 1}` : null,
//                     page,
//                     hasPrevPage: page > 1,
//                     hasNextPage: page < totalPages,
//                 }
//             };
//         }

//         const boards = await BoardModel.find().populate('vendor', 'vendorName')
//         return sortBy(boards.map(BoardEntity.fromObject), ['vendor.vendorName', 'type', 'partNumber', 'model']);
//     };

//     async getById(id: BoardEntity["id"]): Promise<BoardEntity> {
//         const board = await BoardModel.findOne({ _id: id })
//         if (!board) throw new Error('Board not Found!')
//         await board.populate([
//             { path: 'vendor', select: 'vendorName' },
//             { path: 'ports.equipment', select: 'partNumber model vendorName description' },
//             { path: 'signals', select: 'type subType bandwidth' }
//         ])
//         return BoardEntity.fromObject(board)

//     }

//     updateById(updateTransceiverDTO: UpdateBoardDTO): Promise<BoardEntity> {
//         throw new Error("Method not implemented.");
//     }
//     deleteById(id: BoardEntity["id"]): Promise<BoardEntity> {
//         throw new Error("Method not implemented.");
//     }

//     getAllDeleted(): Promise<IBoardsDeleted> {
//         throw new Error('Method not implemented.');
//     }
//     clean(id: BoardEntity['id']): Promise<BoardEntity> {
//         throw new Error('Method not implemented.');
//     }
// }

//     // private transformIds<T>(doc: T): T {
//     //     if (Array.isArray(doc)) {
//     //         return doc.map(item => this.transformIds(item)) as unknown as T;
//     //     } else if (doc && typeof doc === 'object') {
//     //         const transformedDoc = { ...doc } as any;

//     //         if (transformedDoc._id) {
//     //             transformedDoc.id = transformedDoc._id.toString();
//     //             delete transformedDoc._id;
//     //         }

//     //         Object.keys(transformedDoc).forEach(key => {
//     //             if (typeof transformedDoc[key] === 'object') {
//     //                 transformedDoc[key] = this.transformIds(transformedDoc[key]);
//     //             }
//     //         });

//     //         return transformedDoc;
//     //     }

//     //     return doc;
//     // }
