import { BoardModel } from '../../../data';
import util from 'util'
import { BoardDatasource, BoardEntity, CreateBoardDTO, QueriesDTO, UpdateBoardDTO } from '../../../domain';
import { BoardEntityWithPagination } from '../../../interface';
import { sortBy } from '../../../helpers';

export class BoardDatasourceImpl implements BoardDatasource {
    async create(createBoardDTO: CreateBoardDTO): Promise<BoardEntity> {

        const { boardName, partNumber, signals } = createBoardDTO

        const boardDuplicate = await BoardModel.findOne({
            $or: [ { boardName }, { partNumber } ]
        })

        if ( boardDuplicate ) throw new Error(`The Board whit this Board Name or Part Number is already registered`);
        
        const newBoard = await BoardModel.create( createBoardDTO )
        // console.log(util.inspect(newBoard, { showHidden: false, depth: null, colors: true }));
        await newBoard.populate([
            { path: 'vendor', select: 'vendorName' },
            { path: 'ports.equipment', select: 'partNumber model vendorName description' },
            { path: 'signals', select: 'type subType bandwidth' }
        ]);

            return BoardEntity.fromObject( newBoard )

    }

    async getAll(queries?: QueriesDTO): Promise<BoardEntity[] | BoardEntityWithPagination> {

        const [pagination, filters = {}] = QueriesDTO.pagination(queries)
        if (pagination) {
            const { page, limit } = pagination
            const [totalDocs, boards] = await Promise.all([
                BoardModel.countDocuments(filters || {}),
                BoardModel.find( filters )
                    .populate([
                        { path: 'vendor', select: 'vendorName' },
                        { path: 'ports.equipment' }
                    ])
                    .limit( limit )
                    .skip( (page - 1) * limit )
                    .sort({ 'vendor.vendorName': 1, boardName: 1, partNumber: 1, techonology: 1, status: 1 })
                // BoardModel.aggregate([
                //     { $match: filters },
                //     {
                //         $lookup: {
                //             from: 'vendors',
                //             localField: 'vendor',
                //             foreignField: '_id',
                //             as: 'vendor'
                //         },
                //     },
                //     {
                //         $unwind: '$vendor'
                //     },
                //     {
                //         $lookup: {
                //             from: 'equipment',
                //             localField: 'ports.equipment',
                //             foreignField: '_id',
                //             as: 'ports.equipments'
                //         }
                //     },
                //     // {
                //     //     $unwind: '$ports.equipments'
                //     // },
                //     {
                //         $sort: {
                //             'vendor.vendorName': 1, // Ordenar por vendorName
                //             type: 1,
                //             partNumber: 1,
                //             model: 1
                //         }
                //     },
                //     {
                //         $skip: (page - 1) * limit // Paginación
                //     },
                //     {
                //         $limit: limit // Limitar la cantidad de resultados
                //     }
                // ])

            ]);
            
            const totalPages = Math.ceil(totalDocs / limit);
            const baseUrl = `api/catalog/board?limit=${limit}&${new URLSearchParams(filters).toString()}`;
            return {
                payload: boards.map(BoardEntity.fromObject),
                pagination: {
                    totalDocs,
                    totalResults: boards.length,
                    totalPages,
                    prevPage: page > 1 ? `${baseUrl}&page=${page - 1}` : null,
                    nextPage: page < totalPages ? `${baseUrl}&page=${page + 1}` : null,
                    page,
                    hasPrevPage: page > 1,
                    hasNextPage: page < totalPages,
                }
            };
        }

        const boards = await BoardModel.find(filters || {}).populate('vendor', 'vendorName')
        return sortBy( boards.map(BoardEntity.fromObject), [ 'vendor.vendorName', 'type', 'partNumber', 'model' ] );
    }

    async getById(id: BoardEntity["id"]): Promise<BoardEntity> {
        const board = await BoardModel.findOne({ _id: id })
        if( !board ) throw new Error('Board not Found!')
        await board.populate([
            { path: 'vendor', select: 'vendorName' },
            { path: 'ports.equipment', select: 'partNumber model vendorName description' },
            { path: 'signals', select: 'type subType bandwidth' }
        ])
        return BoardEntity.fromObject( board )

    }

    
    updateById(updateTransceiverDTO: UpdateBoardDTO): Promise<BoardEntity> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: BoardEntity["id"]): Promise<BoardEntity> {
        throw new Error("Method not implemented.");
    }
}