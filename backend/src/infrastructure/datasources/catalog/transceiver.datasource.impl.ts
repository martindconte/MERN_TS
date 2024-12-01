import { BoardModel, SubrackModel, TransceiverModel } from '../../../data';
import { BoardEntity, CreateTransceiverDTO, QueriesDTO, SearchTransceiverDTO, SubrackEntity, TransceiverDatasource, TransceiverEntity, UpdateTransceiverDTO } from '../../../domain';
import { generateRandomCode, sortBy } from '../../../helpers';
import { ITransceiverDeleted, ITransceiversDeleted, TransceiverEntityWithPagination } from '../../../interface';
// import { SubrackDatasourceImpl } from './subrack.datasource.impl';

export class TransceiverDatasourceImpl implements TransceiverDatasource {

    async create(createTransceiverDTO: CreateTransceiverDTO): Promise<TransceiverEntity> {

        const transceiverDuplicate = await TransceiverModel.findOne({
            $or: [
                { partNumber: createTransceiverDTO.partNumber },
                {
                    $and: [
                        { model: { $exists: true } },
                        { model: { $ne: '' } },
                        { model: createTransceiverDTO.modelName }
                    ],
                },
            ],
        });

        if (transceiverDuplicate) throw new Error(`The Transceiver whit this Part Number or Model is already registered`);

        const newTransceiver = await TransceiverModel.create(createTransceiverDTO)
        await newTransceiver.populate([
            { path: 'vendor', select: 'vendorName' },
            // { path: 'signals', select: 'type subType' }
        ]);
        return TransceiverEntity.fromObject(newTransceiver);
    }

    async getAll(queries?: QueriesDTO): Promise<TransceiverEntity[] | TransceiverEntityWithPagination> {

        const [pagination, filters = {}] = QueriesDTO.pagination(queries);
        if (pagination) {
            const { page, limit } = pagination;
            const [totalDocs, transceivers] = await Promise.all([
                TransceiverModel.countDocuments(filters || {}),
                TransceiverModel.find(filters)
                    .populate([
                        { path: 'vendor', select: 'vendorName' }
                    ])
                    .limit(limit)
                    .skip((page - 1) * limit)

                // TransceiverModel.aggregate([
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
            const baseUrl = `api/catalog/transceiver?limit=${limit}&${new URLSearchParams(filters).toString()}`;
            return {
                payload: transceivers.map(TransceiverEntity.fromObject),
                pagination: {
                    totalDocs,
                    totalResults: transceivers.length,
                    totalPages,
                    prevPage: page > 1 ? `${baseUrl}&page=${page - 1}` : null,
                    nextPage: page < totalPages ? `${baseUrl}&page=${page + 1}` : null,
                    page,
                    hasPrevPage: page > 1,
                    hasNextPage: page < totalPages,
                }
            };
        };


        const transceivers = await TransceiverModel.find(filters || {}).populate('vendor', 'vendorName')
        return sortBy(transceivers.map(TransceiverEntity.fromObject), ['vendor.vendorName', 'type', 'partNumber', 'model']);
    };

    async getAllDeleted(): Promise<ITransceiversDeleted> {
        const transceiversDeleted = await TransceiverModel.find({ isDeleted: true })
            .populate({ path: 'vendor', select: 'vendorName' })
            .sort({ 'vendor.vendorName': 1, type: 1, partNumber: 1, modelName: 1 })
            .lean();
        const ids = transceiversDeleted.map((transceiver) => transceiver._id);
        const boardsWidthTransceiverDeleted = await BoardModel.find({ ports: { $elemMatch: { equipments: { $in: ids } } } })
            .select('-ports -bitsRates')
            .populate([
                { path: 'vendor', select: 'vendorName' },
                // {
                //     path: 'ports.equipments',
                //     select: 'partNumber modelName vendor description bitsRates',
                //     populate: { path: 'vendor', select: 'vendorName', model: 'Vendor' },
                // },
            ])
            .sort({ 'vendor.vendorName': 1, type: 1, partNumber: 1, modelName: 1 })
        // const [boards, subracks] = await Promise.all([
        //     BoardModel.find({ ports: { $elemMatch: { equipments: { $in: ids } } } }).populate([
        //         { path: 'vendor', select: 'vendorName' },
        //         {
        //             path: 'ports.equipments',
        //             select: 'partNumber modelName vendor description bitsRates',
        //             populate: { path: 'vendor', select: 'vendorName', model: 'Vendor' },
        //         },
        //     ]),
        //     // new BoardDatasourceImpl().getAll({ ports: { $elemMatch: { equipment: { $in: ids }}}}),
        //     new SubrackDatasourceImpl().getAll({ vendor: { $in: ids } })
        // ]);

        // const boardPlain = boards.map(board => board.toObject())
        const boardsToObject = boardsWidthTransceiverDeleted.map( board => board.toObject() )

        // console.log('Desde getAllDeleted Transceivers', { boards }, { subracks });

        return {
            boards: boardsToObject.map( BoardEntity.fromObject ),
            transceivers: transceiversDeleted.map( TransceiverEntity.fromObject )
        }
        // return {
        //     transceivers: sortBy(transceiversDeleted.map(TransceiverEntity.fromObject), ['vendor.vendorName', 'type', 'partNumber', 'model']),
        //     boards: sortBy(boardPlain.map(BoardEntity.fromObject), ['vendor.vendorName', 'partNumber', 'boardName']),
        //     // boards: sortBy(boards as BoardEntity[], ['vendor.vendorName', 'partNumber', 'boardName']),
        //     subracks: subracks as SubrackEntity[],
        // }
    }
    // async getAllDeleted(): Promise<ITransceiversDeleted> {
    //     const transceiversDeleted = await TransceiverModel.find({ isDeleted: true }).populate([{ path: 'vendor', select: 'vendorName' }]);
    //     const ids = transceiversDeleted.map((transceiver) => transceiver.id);
    //     const [boards, subracks] = await Promise.all([
    //         BoardModel.find({ ports: { $elemMatch: { equipments: { $in: ids } } } }).populate([
    //             { path: 'vendor', select: 'vendorName' },
    //             {
    //                 path: 'ports.equipments',
    //                 select: 'partNumber modelName vendor description bitsRates',
    //                 populate: { path: 'vendor', select: 'vendorName', model: 'Vendor' },
    //             },
    //         ]),
    //         // new BoardDatasourceImpl().getAll({ ports: { $elemMatch: { equipment: { $in: ids }}}}),
    //         new SubrackDatasourceImpl().getAll({ vendor: { $in: ids } })
    //     ]);

    //     const boardPlain = boards.map(board => board.toObject())

    //     console.log('Desde getAllDeleted Transceivers', { transceiversDeleted });
    //     console.log('Desde getAllDeleted Transceivers', { boards }, { subracks });

    //     return {
    //         transceivers: sortBy(transceiversDeleted.map(TransceiverEntity.fromObject), ['vendor.vendorName', 'type', 'partNumber', 'model']),
    //         boards: sortBy(boardPlain.map(BoardEntity.fromObject), ['vendor.vendorName', 'partNumber', 'boardName']),
    //         // boards: sortBy(boards as BoardEntity[], ['vendor.vendorName', 'partNumber', 'boardName']),
    //         subracks: subracks as SubrackEntity[],
    //     }
    // }

    async getById(id: TransceiverEntity["id"], queries?: SearchTransceiverDTO): Promise<TransceiverEntity> {
        const { isDeleted = false } = queries || {};
        const transceiver = await TransceiverModel.findOne({ _id: id, isDeleted });
        if (!transceiver) throw new Error(`Transceiver not found!`);
        await transceiver.populate([
            { path: 'vendor', select: 'vendorName' },
        ]);
        return TransceiverEntity.fromObject(transceiver);
    }

    //todo: NO SE REQUIERE SUBRACKS... NO SE INSTALAN TRANSCEIVERS EN SUBRACKS. OPTIMIZAR EL RETORNO (NO SE REQUIERE EL OBJETO TRANSCEIVER COMPLETO NI BOARD COMPLETO)
    async getByIdDeleted(id: TransceiverEntity['id']): Promise<ITransceiverDeleted> {
        const transceiver = await this.getById(id, { isDeleted: true });
        const [boards, subracks] = await Promise.all([
            BoardModel.find({ 'ports.equipments': id }),
            // BoardModel.find({ ports: { $elemMatch: { equipment: id } } }),
            SubrackModel.find({ vendor: id }),
        ])

        return {
            transceiver: transceiver,
            boards: boards.map(BoardEntity.fromObject),
            // subracks: subracks.map(SubrackEntity.fromObject)
        }
    }

    async updateById(updateTransceiverDTO: UpdateTransceiverDTO, queries?: SearchTransceiverDTO): Promise<TransceiverEntity> {

        const { isDeleted = false } = queries || {};

        await this.getById(updateTransceiverDTO.id, { isDeleted })
        // const transceiver = await TransceiverModel.findOne({ _id: updateTransceiverDTO.id, isDeleted });

        // if( !transceiver ) throw new Error(`Transceiver not Found!`);

        const trasceiverDuplicated = await TransceiverModel.findOne({
            $and: [
                { _id: { $ne: updateTransceiverDTO.id } },
                { partNumber: updateTransceiverDTO.partNumber }
            ]
        });

        if (trasceiverDuplicated) throw new Error(`The Transceiver whit this Part Number ${updateTransceiverDTO.partNumber} already registered`);

        const transceiverUpdated = await TransceiverModel.findByIdAndUpdate(
            updateTransceiverDTO.id,
            { ...updateTransceiverDTO },
            { new: true },
        ).populate({ path: 'vendor', select: 'vendorName' });

        if (!transceiverUpdated) throw new Error('Error - Update Transceiver failed');
        return TransceiverEntity.fromObject(transceiverUpdated);
    }

    async deleteById(id: TransceiverEntity["id"]): Promise<TransceiverEntity> {
        const transceiver = await this.getById(id)
        const randomCode = generateRandomCode(3);
        const transceiverDelete = await TransceiverModel.findOneAndUpdate(
            { _id: id },
            {
                partNumber: transceiver.partNumber + '_DELETED_' + randomCode,
                modalName: transceiver.modelName + '_DELETED_' + randomCode,
                isDeleted: true,
            },
            { new: true }
        ).populate({ path: 'vendor', select: 'vendorName' })

        // const transceiver = await TransceiverModel.findOne({ _id: id })
        // if (!transceiver) throw new Error('Transceiver Not Found!')
        // const transceiverDelete = await TransceiverModel.findByIdAndDelete(id).populate({ path: 'vendor', select: 'vendorName' });
        if (!transceiverDelete) throw new Error('Subrack not deleted');
        return TransceiverEntity.fromObject(transceiverDelete);
    }

    async clean(id: TransceiverEntity['id']): Promise<TransceiverEntity> {
        const { boards } = await this.getByIdDeleted(id);
        if (boards.length > 0) throw 'Transceiver not deleted. The transceiver has associated bords';
        const transceiverDeleted = await TransceiverModel.findByIdAndDelete(id).populate([{ path: 'vendor', select: 'vendorName' }]);
        if (transceiverDeleted) {
            return TransceiverEntity.fromObject(transceiverDeleted);
        } else {
            throw 'Error - Delete failed';
        };
    };
    // async clean(id: TransceiverEntity['id']): Promise<TransceiverEntity> {
    //     const { boards, subracks, transceiver } = await this.getByIdDeleted(id);
    //     if (boards.length > 0 || subracks.length > 0) throw 'Transceiver not deleted. The transceiver has associated bords or subracks';
    //     const transceiverDeleted = await TransceiverModel.findByIdAndDelete(id).populate([{ path: 'vendor', select: 'vendorName' }]);
    //     if (transceiverDeleted) {
    //         return TransceiverEntity.fromObject(transceiverDeleted);
    //     } else {
    //         throw 'Error - Delete failed';
    //     };
    // };

};