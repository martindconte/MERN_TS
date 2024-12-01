import { BoardModel, SubrackModel } from '../../../data';
import { BoardDatasource, BoardEntity, CreateBoardDTO, SubrackEntity, UpdateBoardDTO } from '../../../domain';
import { generateRandomCode } from '../../../helpers';
import { IBoardResponse, IBoardSearch, IBoardsResponse, IBoard, IBoardsDeleted, IBoardToClean } from '../../../interface';

export class BoardDatasourceImpl implements BoardDatasource {

  async create(createBoardDTO: CreateBoardDTO): Promise<IBoardResponse> {
    const { boardName, partNumber } = createBoardDTO;

    const boardDuplicate = await BoardModel.findOne({
      $or: [{ boardName }, { partNumber }],
    });

    if (boardDuplicate) throw new Error(`The Board whit this Board Name or Part Number is already registered`);

    const newBoard = await BoardModel.create(createBoardDTO);
    (await newBoard.populate([{ path: 'vendor', select: 'vendorName _id' }])).toObject();
    const transformedBoard = newBoard.toObject({ virtuals: true });
    return BoardEntity.fromObject(transformedBoard);
  }

  async getAll(queries?: IBoardSearch): Promise<IBoardsResponse> {
    const { searchParams = {}, otherQueries = { isDeleted: false }, paginationData } = queries || {};
    if (paginationData) {
      const { page, limit } = paginationData;
      const [totalDocs, boards] = await Promise.all([
        BoardModel.countDocuments({ ...searchParams, ...otherQueries }),
        BoardModel.find({ ...searchParams, ...otherQueries })
          .select('-ports -bitsRates')
          .populate({ path: 'vendor', select: 'vendorName' })
          .limit(limit)
          .skip((page - 1) * limit)
          .sort({
            'vendor.vendorName': 1,
            boardName: 1,
            partNumber: 1,
            techonology: 1,
            status: 1,
          })
          .lean(),
      ]);

      const totalPages = Math.ceil(totalDocs / limit);
      const baseUrl = `api/catalog/board?limit=${limit}&page=${page}&${new URLSearchParams().toString()}`;
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
        },
      };
    }

    const boards = await BoardModel.find({ ...searchParams, ...otherQueries })
      .populate('vendor', 'vendorName')
      .select('-ports -bitsRates')
      .populate({ path: 'vendor', select: 'vendorName' })
      .sort({
        'vendor.vendorName': 1,
        boardName: 1,
        partNumber: 1,
        techonology: 1,
        status: 1,
      })
      .lean();

    return {
      payload: boards.map(BoardEntity.fromObject),
    };
  }

  async getById(id: IBoard['id'], queries?: IBoardSearch): Promise<IBoard> {
    const { otherQueries } = queries || {};
    const { isDeleted = false } = otherQueries || {};
    const board = await BoardModel.findOne({ _id: id, isDeleted }).lean();
    if (!board) throw new Error('Board not Found!');
    const boardPopulate = await BoardModel.populate(board, [
      { path: 'vendor', select: 'vendorName' },
      {
        path: 'ports.equipments',
        // select: 'partNumber modelName vendor description bitsRates logicalFacilities',
        populate: [{ path: 'vendor', select: 'vendorName', model: 'Vendor' }],
      },
    ])
    return BoardEntity.fromObject(boardPopulate);
  };

  async getByIdDeleted(id: IBoard['id']): Promise<IBoardToClean> {
    const board = await this.getById(id, { otherQueries: { isDeleted: true }});
    const subracks = await SubrackModel.find()

    return {
        board,
        subracks: [] //todo: pendiente de desarrolar modulo de subracks
    }
}
  
  async updateById(updateBoardDTO: UpdateBoardDTO, queries?: IBoardSearch): Promise<IBoardResponse> {
    const { otherQueries } = queries || {};
    const { isDeleted = false } = otherQueries || {};

    await this.getById(updateBoardDTO.id, { otherQueries: { isDeleted } });

      const boardDuplicated = await BoardModel.findOne({
        $and: [
          { _id: { $ne: updateBoardDTO.id } },
          { partNumber: updateBoardDTO.partNumber },
          { boardName: updateBoardDTO.boardName }
        ],
      });

      if (boardDuplicated)
        throw new Error(
          `The Transceiver whit this Part Number ${updateBoardDTO.partNumber} or Board Name ${updateBoardDTO.boardName}already registered`
        );

      const boardUpdate = await BoardModel.findByIdAndUpdate(updateBoardDTO.id, { ...updateBoardDTO }, { new: true })
        .select('-ports -bitsRates')
        .lean()
        .populate([
          { path: 'vendor', select: 'vendorName' },
        ]);
      return BoardEntity.fromObject(boardUpdate!)
  }

  async deleteById(id: BoardEntity['id']): Promise<IBoardResponse> {
    const boardToDelete = await this.getById(id);
    const randomCode = generateRandomCode(3);
    const boardDeleted = await BoardModel.findOneAndUpdate(
      { _id: id },
      {
        partNumber: boardToDelete.partNumber + '_DELETED_' + randomCode,
        boardName: boardToDelete.boardName + '_DELETED_' + randomCode,
        isDeleted: true,
      }
    )
    .select('-ports -bitsRates')
    .lean()
    .populate({ path: 'vendor', select: 'vendorName' });

    if (!boardDeleted) throw new Error('Board not deleted');

    return BoardEntity.fromObject(boardDeleted);
  }

  //todo: PENDIENTE DE REALIZACION SUBRACKS
  async getAllDeleted(): Promise<IBoardsDeleted> {
    const boardsDeleted = await BoardModel.find({ isDeleted: true })
      .select('-ports -bitsRates')
      .lean()
      .populate({ path: 'vendor', select: 'vendorName' });
    // const ids = boardsDeleted.map( baord => baord.id );
    // const [ subracks ] = await Promise.all([
    //   SubrackModel.find() //todo: Pendiente de realizar subracks
    // ]);

    return {
      boards: boardsDeleted.map( BoardEntity.fromObject ),
      subracks: [] // todo: PENDIENTE DE REALIZAR SUBRACKS
    }
  }

  async clean(id: BoardEntity['id']): Promise<IBoardResponse> {
    const { board, subracks } = await this.getByIdDeleted(id);
    if ( board && subracks.length > 0) throw 'Board not deleted. The Board has associated Subracks';
    const boardCleaned = await BoardModel.findByIdAndDelete(id).populate([{ path: 'vendor', select: 'vendorName' }]).lean().select('-ports');
    if (boardCleaned) {
        return BoardEntity.fromObject(boardCleaned);
    } else {
        throw 'Error - Delete failed';
    };
  }
}