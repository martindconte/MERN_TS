import { isAxiosError } from 'axios';
import { BoardFormData, BoardStatusEnum, BoardTechnologyEnum, BoardType, respAPIBoardSchema } from '../../types';
import { api } from '../../lib';

export const boardMapped = (board: BoardType): BoardType => ({
    id: board.id,
    boardName: board.boardName,
    partNumber: board.partNumber,
    signals: board.signals.map(signal => ({
        id: signal.id,
        type: signal.type,
        subType: signal.subType,
        bandwidth: signal.bandwidth ? { ...signal.bandwidth } : undefined
    })),
    vendor: board.vendor,
    description: board.description,
    observations: board.observations,
    ports: board.ports,
    slotSize: board.slotSize,
    technology: board.technology || BoardTechnologyEnum.generic,
    status: board.status || BoardStatusEnum.NA,
    createdAt: board.createdAt ? new Date(board.createdAt) : new Date(),
    updatedAt: board.updatedAt ? new Date(board.updatedAt) : new Date(),
});

export const createBoard = async ( formData: BoardFormData ): Promise<{msg?: string, payload: BoardType}> => {
    try {
        const { data: { msg, payload } } = await api.post('/catalog/board', formData);
        const dataMapped = {
            msg,
            payload: boardMapped( payload )
        };
        const response = respAPIBoardSchema.safeParse( dataMapped )
        console.log(response);
        if( response.success ) return response.data
        throw new Error('Invalid response data');
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
        throw error; // Re-throw the error if it's not an AxiosError
    }
}