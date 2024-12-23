import { BoardModel, TransceiverModel } from '../../../data';
import { BoardEntity, CreateTransceiverDTO, TransceiverDatasource, TransceiverEntity, UpdateTransceiverDTO } from '../../../domain';
import { generateRandomCode } from '../../../helpers';
import { ITransceiver, ITransceiversResponse, ITransceiverSearch, ITransceiversDeleted, ITransceiverDeleted } from '../../../interface';

export class TransceiverDatasourceImpl implements TransceiverDatasource {
  async create(createTransceiverDTO: CreateTransceiverDTO): Promise<ITransceiver> {
    const { partNumber, modelName } = createTransceiverDTO;
    const transceiverDuplicate = await TransceiverModel.findOne({
      $or: [{ partNumber }, { $and: [{ modelName: { $exists: true } }, { modelName: { $ne: '' } }, { modelName }] }],
    });
    if (transceiverDuplicate) throw new Error(`The Transceiver whit this Part Number or Model is already registered`);
    const newTransceiver = await TransceiverModel.create(createTransceiverDTO);
    await newTransceiver.populate([{ path: 'vendor', select: 'vendorName' }]);
    const newTransceiverToObject = newTransceiver.toObject();
    return TransceiverEntity.fromObject(newTransceiverToObject);
  }

  async getAll(queries?: ITransceiverSearch): Promise<ITransceiversResponse> {
    const { searchParams = {}, otherQueries = { isDeleted: false }, paginationData } = queries || {};
    if (paginationData) {
      const { page, limit } = paginationData;
      const [totalDocs, transceivers] = await Promise.all([
        TransceiverModel.countDocuments({ ...searchParams, ...otherQueries }),
        TransceiverModel.find({ ...searchParams, ...otherQueries })
          .populate({ path: 'vendor', select: 'vendorName' })
          .limit(limit)
          .skip((page - 1) * limit)
          .sort({
            'vendor.vendorName': 1,
            modelName: 1,
            partNumber: 1,
            techonology: 1,
            status: 1,
          })
          .lean(),
      ]);

      const totalPages = Math.ceil(totalDocs / limit);
      const baseUrl = `api/catalog/transceiver?limit=${limit}&page=${page}&${new URLSearchParams().toString()}`;
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
        },
      };
    }

    const transceivers = await TransceiverModel.find({ ...searchParams, ...otherQueries })
      .populate('vendor', 'vendorName')
      .populate({ path: 'vendor', select: 'vendorName' })
      .sort({
        'vendor.vendorName': 1,
        partNumber: 1,
        modelName: 1,
        techonology: 1,
        status: 1,
      })
      .lean();

    return {
      payload: transceivers.map(TransceiverEntity.fromObject),
    };
  }

  async getById(id: ITransceiver['id'], queries?: ITransceiverSearch): Promise<ITransceiver> {
    const { searchParams = {} } = queries || {};
    const { isDeleted = false } = searchParams;
    const transceiver = await TransceiverModel.findOne({ _id: id, isDeleted });
    if (!transceiver) throw new Error(`Transceiver not found!`);
    await transceiver.populate([{ path: 'vendor', select: 'vendorName' }]);
    return TransceiverEntity.fromObject(transceiver);
  }

  async updateById(updateTransceiverDTO: UpdateTransceiverDTO, queries?: ITransceiverSearch): Promise<ITransceiver> {
    const { id, partNumber, vendor } = updateTransceiverDTO;
    const { searchParams = { isDeleted: false } } = queries || {};
    await this.getById(updateTransceiverDTO.id, { searchParams });

    const trasceiverDuplicated = await TransceiverModel.findOne({
      $and: [{ _id: { $ne: id } }, { partNumber: partNumber }],
    });

    if (trasceiverDuplicated) throw new Error(`The Transceiver Vendor: ${vendor.vendorName} whit this Part Number ${partNumber} already registered`);
    const transceiverUpdated = await TransceiverModel.findByIdAndUpdate(updateTransceiverDTO.id, { ...updateTransceiverDTO }, { new: true })
      .populate({ path: 'vendor', select: 'vendorName' })
      .lean();
    if (!transceiverUpdated) throw new Error('Error - Update Transceiver failed');
    return TransceiverEntity.fromObject(transceiverUpdated);
  }

  async deleteById(id: ITransceiver['id']): Promise<ITransceiver> {
    const transceiver = await this.getById(id);
    const randomCode = generateRandomCode(3);
    const transceiverDelete = await TransceiverModel.findOneAndUpdate(
      { _id: id },
      {
        partNumber: transceiver.partNumber + '_DELETED_' + randomCode,
        modalName: transceiver.modelName + '_DELETED_' + randomCode,
        isDeleted: true,
      },
      { new: true }
    )
      .populate({ path: 'vendor', select: 'vendorName' })
      .lean();
    if (!transceiverDelete) throw new Error('Subrack not deleted');
    return TransceiverEntity.fromObject(transceiverDelete);
  }

  async getAllDeleted(): Promise<ITransceiversDeleted> {
    const transceiversDeleted = await TransceiverModel.find({ isDeleted: true })
      .lean()
      .populate({ path: 'vendor', select: 'vendorName' });
    const ids = transceiversDeleted.map((transceiver) => transceiver._id);
    if (ids.length === 0) {
      return {
        boards: [],
        transceivers: [],
      };
    }
    const boardsWidthTransceiverDeleted = await BoardModel.find({ ports: { $elemMatch: { equipments: { $in: ids } } } })
      .select('-ports -bitsRates')
      .populate({ path: 'vendor', select: 'vendorName' })
      .sort({ vendor: 1 });

    const boardsToObject = boardsWidthTransceiverDeleted.map((board) => board.toObject());

    return {
      boards: boardsToObject.map(BoardEntity.fromObject),
      transceivers: transceiversDeleted.map(TransceiverEntity.fromObject),
    };
  }

  async getByIdDeleted(id: ITransceiver['id']): Promise<ITransceiverDeleted> {
    const transceiver = await this.getById(id, { searchParams: { isDeleted: true } });
    const boards = await BoardModel.find({ 'ports.equipments': transceiver.id })
      .lean()
      .select('-ports -bitsRates')
      .populate({ path: 'vendor', select: 'vendorName' });
    return {
      transceiver: transceiver,
      boards: boards.map(BoardEntity.fromObject),
    };
  }

  async clean(id: ITransceiver['id']): Promise<ITransceiver> {
    const { boards } = await this.getByIdDeleted(id);
    if (boards.length > 0) throw 'Transceiver not deleted. The transceiver has associated bords';
    const transceiverDeleted = await TransceiverModel.findByIdAndDelete(id).populate([{ path: 'vendor', select: 'vendorName' }]);
    if (transceiverDeleted) {
      return TransceiverEntity.fromObject(transceiverDeleted);
    } else {
      throw 'Error - Delete failed';
    }
  }
}
