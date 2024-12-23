import { isAxiosError } from 'axios'
import {
  respAPISubrackSchema,
  respAPISubracksSchema,
  SubrackFormData,
  SubrackPaginationType /*SubrackType*/,
  subrackSchema,
  subracksDeletedSchema,
  SubracksDeletedType,
  SubrackType,
} from '../../types'
import { api } from '../../lib'
import { buildURL, regExHelper } from '../../helpers'

export const subrackMapped = (subrack: SubrackType) => ({
  ...subrack,
  createdAt: subrack.createdAt ? new Date(subrack.createdAt) : new Date(),
  updatedAt: subrack.updatedAt ? new Date(subrack.updatedAt) : new Date(),
})

export const createSubrack = async (formData: SubrackFormData) => {
  try {
    const { data } = await api.post('/catalog/subrack', formData)
    // const { data } = await api.post('/catalog/subrack', transformedFormData);
    const response = respAPISubrackSchema.safeParse(data)
    if (response.success) return response.data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 500) {
        throw new Error(error.message)
      } else {
        throw new Error(error.response.data.msg)
      }
    }
    throw error // Re-throw the error if it's not an AxiosError
  }
}

export const getSubrtacks = async (queries: { [key: string]: any } = {}) => {
  const baseURL = '/catalog/subrack'
  const URL = buildURL(baseURL, queries)
  console.log(URL)
  try {
    const {
      data: { payload, pagination },
    } = await api(URL)
    const mappedData: { payload: SubrackType[]; pagination: SubrackPaginationType } = {
      payload: payload.map((subrack: SubrackType) => subrackMapped(subrack)),
      pagination,
    }
    const { success, data } = respAPISubracksSchema.safeParse(mappedData)
    if (success) return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 500) {
        throw new Error(error.message)
      } else {
        throw new Error(error.response.data.msg)
      }
    }
    throw error // Re-throw the error if it's not an AxiosError
  }
}

export const getSubrack = async (id: SubrackType['id'], searchParams: string = '') => {
  try {
    const { data } = await api(`catalog/subrack/${id}` + searchParams)
    const response = subrackSchema.safeParse(subrackMapped(data))
    if (response.success) return response.data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 500) {
        throw new Error(error.message)
      } else {
        throw new Error(error.response.data.msg)
      }
    }
    throw error // Re-throw the error if it's not an AxiosError
  }
}

export const updateSubrack = async ({
  id,
  formData,
  searchParams = '',
}: {
  id: SubrackType['id']
  formData: SubrackFormData
  searchParams: string
}) => {
  const { partNumber, isDeleted } = formData

  const boardTransform = {
    ...formData,
    partNumber: isDeleted
      ? regExHelper.containsDeleteSequence(partNumber)
        ? partNumber
        : partNumber + '_DELETE_'
      : regExHelper.containsDeleteSequence(partNumber)
      ? regExHelper.removeDeleteSequence(partNumber)
      : partNumber,
  }
  try {
    const { data } = await api.put(`/catalog/subrack/${id}` + searchParams, boardTransform)
    const response = respAPISubrackSchema.safeParse(data)
    if (response.success) return response.data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg)
    throw error // Re-throw the error if it's not an AxiosError
  }
}

export const deleteSubrack = async (id: SubrackType['id']) => {
  try {
    const {
      data: { msg, payload },
    } = await api.delete(`catalog/subrack/${id}`)
    console.log({ msg }, { payload })
    const dataMapped = {
      msg,
      payload: subrackMapped(payload),
    }
    console.log({ dataMapped })
    const response = respAPISubrackSchema.safeParse(dataMapped)
    console.log({ response })
    if (response.success) return response.data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg)
    throw error // Re-throw the error if it's not an AxiosError
  }
}

export const getAllSubracksDeleted = async () => {
  try {
    const { data: { subracks, networkElements } }: { data: SubracksDeletedType } = await api('/catalog/subrack/deleted-subracks')
    console.warn('Pendiente PARTE NETWORKS ELEMENTS', { networkElements })
    const dataMapped: SubracksDeletedType = {
      subracks: subracks.map(subrack => subrackMapped(subrack)),
      networkElements: 'TODO... PENDIENTES DE REALIZAR',
    }
    const { success, data } = subracksDeletedSchema.safeParse(dataMapped)
    if (success) {
      return data
    } else {
      throw Error('Validation failed! Check Info Subracks Deleted')
    }
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg)
    throw error // Re-throw the error if it's not an AxiosError
  }
}

export const cleanSubrack = async (id: SubrackType['id']) => {
  try {
    const { data: { msg, payload } } = await api.delete(`catalog/subrack/deleted-subrack/${id}/permanently-delete`)
    const dataMapped = {
      msg,
      payload: subrackMapped(payload),
    }
    const { success, data } = respAPISubrackSchema.safeParse(dataMapped)
    if (success) return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) throw new Error(error.response.data.msg)
    throw error // Re-throw the error if it's not an AxiosError
  }
}
