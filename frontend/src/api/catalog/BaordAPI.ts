import { isAxiosError } from 'axios';
import { BoardFormData, BoardPaginationType, BoardStatusEnum, BoardTechnologyEnum, BoardType, respAPIBoardSchema, respAPIBoardsSchema, TransceiverType } from '../../types';
import { api } from '../../lib';
import { buildURL } from '../../helpers';
import { transceiverMapped } from './TransceiverAPI';


export const boardMapped = (board: BoardType): BoardType => ({
    id: board.id,
    boardName: board.boardName,
    partNumber: board.partNumber,
    signals: board.signals,
    vendor: board.vendor,
    description: board.description,
    observations: board.observations,

    ports: board.ports.length > 0 ? ( board.ports.map( port => ({
        ...port,
        equipment: port.equipment.map( eq => transceiverMapped( eq as TransceiverType ) )
    }))) : [],

    slotSize: board.slotSize,
    technology: board.technology || BoardTechnologyEnum.generic,
    status: board.status || BoardStatusEnum.NA,
    createdAt: board.createdAt ? new Date(board.createdAt) : new Date(),
    updatedAt: board.updatedAt ? new Date(board.updatedAt) : new Date(),
});

export const createBoard = async ( formData: BoardFormData ): Promise<{ msg?: string, payload: BoardType }> => {

    const transformedFormData = {
        ...formData,
        ports: formData.ports.map( port => ({
            ...port,
            equipment: port.equipment?.map( equipment => equipment.id )
        }))
    }

    try {
        const { data: { msg, payload } } = await api.post('/catalog/board', transformedFormData);
        console.log(msg, payload);
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
        if (isAxiosError(error) && error.response) {
            if (error.response.status === 500) {
                throw new Error(error.message);
            } else {
                throw new Error(error.response.data.msg);
            }
        }
        throw error; // Re-throw the error if it's not an AxiosError
    }
}

export const getBoards = async ( query = {} ) => {
    const baseURL = '/catalog/board'
    const URL = buildURL( baseURL, query )

    try {
        const { data: { payload, pagination } } = await api(URL);
        const mappedData: { payload: BoardType[], pagination: BoardPaginationType  } = {
            payload: payload.map( ( baord: BoardType ) => boardMapped( baord ) ),
            pagination
        }
        const response = respAPIBoardsSchema.safeParse( mappedData )
        if( response.success ) return response.data
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) {
            if (error.response.status === 500) {
                throw new Error(error.message);
            } else {
                throw new Error(error.response.data.msg);
            }
        }
        throw error; // Re-throw the error if it's not an AxiosError
    }

    console.log(URL);
}