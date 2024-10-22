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
            { path: 'ports.equipment', select: 'partNumber model vendorName' },
            { path: 'signals', select: 'bandwidth' }
        ]);

            return BoardEntity.fromObject( newBoard )

    }
    getAll(queries?: QueriesDTO): Promise<BoardEntity[] | BoardEntityWithPagination> {
        throw new Error("Method not implemented.");
    }
    getById(id: BoardEntity["id"]): Promise<BoardEntity> {
        throw new Error("Method not implemented.");
    }
    updateById(updateTransceiverDTO: UpdateBoardDTO): Promise<BoardEntity> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: BoardEntity["id"]): Promise<BoardEntity> {
        throw new Error("Method not implemented.");
    }
}