import { TransceiverModel } from '../../../data';
import { CreateTransceiverDTO, QueriesDTO, TransceiverDatasource, TransceiverEntity, UpdateTransceiverDTO } from '../../../domain';
import { sortBy } from '../../../helpers';
import { TransceiverEntityWithPagination } from '../../../interface';

export class TransceiverDatasourceImpl implements TransceiverDatasource {

    async create(createTransceiverDTO: CreateTransceiverDTO): Promise<TransceiverEntity> {

        const transceiverDuplicate = await TransceiverModel.findOne({
            $or: [
                { partNumber: createTransceiverDTO.partNumber },
                {
                    $and: [
                        { model: { $exists: true } },
                        { model: { $ne: '' } },
                        { model: createTransceiverDTO.model }
                    ],
                },
            ],
        });

        if (transceiverDuplicate) throw new Error(`The Transceiver whit this Part Number or Model is already registered`);

        const newTransceiver = await TransceiverModel.create(createTransceiverDTO)
        await newTransceiver.populate([
            { path: 'vendor', select: 'vendorName' },
            { path: 'signals', select: 'type subType' }
        ]);
        return TransceiverEntity.fromObject(newTransceiver);
    }

    async getAll(queries?: QueriesDTO): Promise<TransceiverEntity[] | TransceiverEntityWithPagination> {
        const [pagination, filters = {}] = QueriesDTO.pagination(queries)
        if (pagination) {
            const { page, limit } = pagination
            const [totalDocs, transceivers] = await Promise.all([
                TransceiverModel.countDocuments(filters || {}),
                TransceiverModel.aggregate([
                    { $match: filters },
                    {
                        $lookup: {
                            from: 'vendors',
                            localField: 'vendor',
                            foreignField: '_id',
                            as: 'vendor'
                        },
                    },
                    {
                        $unwind: '$vendor'
                    },
                    {
                        $sort: {
                            'vendor.vendorName': 1, // Ordenar por vendorName
                            type: 1,
                            partNumber: 1,
                            model: 1
                        }
                    },
                    {
                        $skip: (page - 1) * limit // Paginación
                    },
                    {
                        $limit: limit // Limitar la cantidad de resultados
                    }
                ])

            ])

            const totalPages = Math.ceil(totalDocs / limit);
            const baseUrl = `api/catalog/transceiver?limit=${limit}&${new URLSearchParams(filters).toString()}`;

            return {
                payload: transceivers.map(TransceiverEntity.fromObject),
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

        const transceivers = await TransceiverModel.find(filters || {}).populate('vendor', 'vendorName')
        return sortBy( transceivers.map(TransceiverEntity.fromObject), [ 'vendor.vendorName', 'type', 'partNumber', 'model' ] );
    }

    async getById(id: TransceiverEntity["id"]): Promise<TransceiverEntity> {
        const transceiver = await TransceiverModel.findOne({ _id: id });
        if (!transceiver) throw new Error(`The Transceiver whit this Part Number or Model is already registered`);
        await transceiver.populate([
            { path: 'vendor', select: 'vendorName' },
            { path: 'signals', select: 'type subType' }
        ]);
        return TransceiverEntity.fromObject(transceiver);
    }

    async updateById(updateTransceiverDTO: UpdateTransceiverDTO): Promise<TransceiverEntity> {
        const transceiver = await TransceiverModel.findOne({ _id: updateTransceiverDTO.id});

        if( !transceiver ) throw new Error(`Transceiver not Found!`);

        const trasceiverDuplicated = await TransceiverModel.findOne({
            $and: [
                { _id: { $ne: updateTransceiverDTO.id } },
                { partNumber: updateTransceiverDTO.partNumber }
            ]
        });

        if( trasceiverDuplicated ) throw new Error(`The Transceiver whit this Part Number ${ updateTransceiverDTO.partNumber } already registered`);

        const transceiverUpdated = await TransceiverModel.findByIdAndUpdate(
            updateTransceiverDTO.id,
            { ...updateTransceiverDTO },
            { new: true },
        ).populate({ path: 'vendor', select: 'vendorName' });

        if( !transceiverUpdated ) throw new Error('Error - Update Transceiver failed');
        return TransceiverEntity.fromObject( transceiverUpdated );
    }

    async deleteById(id: TransceiverEntity["id"]): Promise<TransceiverEntity> {
        const transceiver = await TransceiverModel.findOne({ _id: id })
        if (!transceiver) throw new Error('Transceiver Not Found!')
        const transceiverkDelete = await TransceiverModel.findByIdAndDelete(id);
        if (!transceiverkDelete) throw new Error('Subrack not deleted');
        return TransceiverEntity.fromObject(transceiverkDelete);
    }

}