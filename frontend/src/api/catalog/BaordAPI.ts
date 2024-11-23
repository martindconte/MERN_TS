import { isAxiosError } from 'axios';
import {
  BoardFormData,
  BoardPaginationType,
  boardSchema,
  BoardType,
  respAPIBoardSchema,
  respAPIBoardsSchema,
  RoadmapEnum,
  TechnologyEnum,
  TransceiverType,
} from '../../types';
import { api } from '../../lib';
import { buildURL } from '../../helpers';
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
        equipment: port.equipments.map((eq) =>
          transceiverMapped(eq as TransceiverType)
        ),
      }))
      : [],
  slotSize: board.slotSize,
  bandwidthMax: board.bandwidthMax,
  technology: board.technology || TechnologyEnum.GENERIC,
  roadmap: board.roadmap || RoadmapEnum.empty,
  createdAt: board.createdAt ? new Date(board.createdAt) : new Date(),
  updatedAt: board.updatedAt ? new Date(board.updatedAt) : new Date(),
});

export const createBoard = async (
  formData: BoardFormData
): Promise<{ msg?: string; payload: BoardType }> => {
  const transformedFormData = {
    ...formData,
    ports: formData.ports.map((port) => ({
      ...port,
      equipments: port.equipments?.map((equipment) => equipment.id),
    })),
  };

  try {
    const {
      data: { msg, payload },
    } = await api.post('/catalog/board', transformedFormData);
    const dataMapped = {
      msg,
      payload: boardMapped(payload),
    };
    const response = respAPIBoardSchema.safeParse(dataMapped);
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
    const {
      data: { payload, pagination },
    } = await api(URL);
    console.log({ payload });
    console.log({ pagination });
    const mappedData: {
      payload: BoardType[];
      pagination: BoardPaginationType;
    } = {
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
  const { ports } = formData
  const portsId = ports.map(port => ({
    ...port,
    equipments: port.equipments.map(equipment => equipment.id)
  }))

  try {
    const { data: { msg, payload } } = await api.put(`/catalog/board/${id}` + searchParams, { ...formData, ports: portsId });
    const dataMapped = {
      msg,
      payload: boardMapped(payload),
    };
    const { success, data } = respAPIBoardSchema.safeParse(dataMapped);
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
