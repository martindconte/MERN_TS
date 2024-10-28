import { BoardModel } from '../../../data';
import util from 'util'
import { BoardDatasource, BoardEntity, CreateBoardDTO, QueriesDTO, UpdateBoardDTO } from '../../../domain';
import { BoardEntityWithPagination } from '../../../interface';

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

    getAll(queries?: QueriesDTO): Promise<BoardEntity[] | BoardEntityWithPagination> {
        throw new Error("Method not implemented.");
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