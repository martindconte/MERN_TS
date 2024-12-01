import { isAxiosError } from 'axios';
import { BoardFormData, BoardPaginationType, boardSchema, boardsDeletedSchema, BoardsDeletedType, BoardType, respAPIBoardSchema, respAPIBoardsSchema, RoadmapEnum, TechnologyEnum, TransceiverType } from '../../types';
import { api } from '../../lib';
import { buildURL, regExHelper } from '../../helpers';
import { transceiverMapped } from './TransceiverAPI';

export const boardMapped = (board: BoardType): BoardType => ({
  id: board.id,
  boardName: board.boardName,
  partNumber: board.partNumber,
  bitsRates: board.bitsRates,
  vendor: board.vendor,
  description: board.description,
  observations: board.observations,
  ports:
    board.ports.length > 0
      ? board.ports.map((port) => ({
        ...port,
        logicalFacilities: port.logicalFacilities ?? {},
        equipments: port.equipments.map((eq) =>
          transceiverMapped(eq as TransceiverType)
        ),
      }))
      : [],
  slotSize: board.slotSize,
  bandwidthMax: board.bandwidthMax,
  technology: board.technology || TechnologyEnum.GENERIC,
  roadmap: board.roadmap || RoadmapEnum.empty,
  isDeleted: board.isDeleted,
  createdAt: board.createdAt ? new Date(board.createdAt) : new Date(),
  updatedAt: board.updatedAt ? new Date(board.updatedAt) : new Date(),
});

export const createBoard = async ( formData: BoardFormData ) => {
// export const createBoard = async ( formData: BoardFormData ): Promise<{ msg?: string; payload: BoardType }> => {
  const transformedFormData = {
    ...formData,
    ports: formData.ports.map((port) => ({
      ...port,
      equipments: port.equipments?.map((equipment) => equipment.id),
    })),
  };

  try {
    const { data } = await api.post('/catalog/board', transformedFormData);
    // const { data: { msg, payload } } = await api.post('/catalog/board', transformedFormData);
    // const dataMapped = {
    //   msg,
    //   payload: boardMapped(payload),
    // };
    // const response = respAPIBoardSchema.safeParse(dataMapped);
    const response = respAPIBoardSchema.safeParse( data );
    if (response.success) return response.data;
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
};

export const getBoards = async (query = {}) => {
  const baseURL = '/catalog/board';
  const URL = buildURL(baseURL, query);
  try {
    const { data: { payload, pagination } } = await api(URL);
    const mappedData: { payload: BoardType[]; pagination: BoardPaginationType; } = {
      payload: payload.map((baord: BoardType) => boardMapped(baord)),
      pagination,
    };
    const response = respAPIBoardsSchema.safeParse(mappedData);
    if (response.success) return response.data;
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
};

export const getBoard = async (id: BoardType['id'], searchParams: string = '') => {
  try {
    const { data } = await api(`catalog/board/${id}` + searchParams);
    console.log(data);
    console.log(boardMapped(data));
    const response = boardSchema.safeParse(boardMapped(data));
    if (response.success) return response.data;
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
};

export const updateBoard = async ({ id, formData, searchParams = '' }: { id: BoardType['id'], formData: BoardFormData, searchParams?: string }) => {
  const { boardName, partNumber, ports } = formData
  
  // const portsId = ports.map(port => ({
  //   ...port,
  //   equipments: port.equipments.map(equipment => equipment.id)
  // }))

  const boardTransform = {
    ...formData,
    boardName: regExHelper.containsDeleteSequence( boardName ) ? regExHelper.removeDeleteSequence( boardName ) : boardName,
    partNumber: regExHelper.containsDeleteSequence( partNumber ) ? regExHelper.removeDeleteSequence( partNumber ) : partNumber,
    ports: ports.map(port => ({
      ...port,
      equipments: port.equipments.map(equipment => equipment.id)
    }))
  }

  try {
    const { data: boardData} = await api.put(`/catalog/board/${id}` + searchParams, boardTransform );
    // const { data: boardData} = await api.put(`/catalog/board/${id}` + searchParams, { ...formData, ports: portsId });
    const { success, data } = respAPIBoardSchema.safeParse(boardData);
    if (success) return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
    throw error; // Re-throw the error if it's not an AxiosError
  };
};

export const deleteBoard = async ( id: BoardType['id'] ) => {
  try {
      const { data: { msg, payload } } = await api.delete(`catalog/board/${ id }`)
      console.log({ msg, payload });
      const dataMapped = {
          msg,
          payload: boardMapped( payload )
      };
      const response = respAPIBoardSchema.safeParse( dataMapped );
      console.log(response);
      if( response.success ) return response.data;
  } catch (error) {
      console.log(error);
      if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
      throw error; // Re-throw the error if it's not an AxiosError
  };
};

export const getAllBoardsDeleted = async () => {
  try {
      const { data: { boards, subracks } }: {data: BoardsDeletedType} = await api('/catalog/board/clean-board');
      console.warn('Pendiente PARTE SUBRACKS', {subracks})
      const dataMapped: BoardsDeletedType = {
          boards: boards.map( board => boardMapped( board ) ),
          subracks: 'TODO... PENDIENTES DE REALIZAR'
      };
      const { success, data } = boardsDeletedSchema.safeParse( dataMapped );
      if( success ) {
          return data;
      } else {
          throw Error('Validation failed! Check Info Transceiver Deleted');
      };
  } catch (error) {
      console.log(error);
      if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg);
      throw error; // Re-throw the error if it's not an AxiosError
  };
};

export const cleanBoard = async ( id: BoardType['id'] ) => {
  try {
      const { data: { msg, payload } } = await api.delete(`catalog/board/clean-board/${ id }/permanently-delete`);
      const dataMapped = {
          msg,
          payload: boardMapped( payload )
      };
      const { success, data } = respAPIBoardSchema.safeParse( dataMapped );
      if( success ) return data;
  } catch (error) {
      console.log(error);
      if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg); 
      throw error; // Re-throw the error if it's not an AxiosError
  };
};