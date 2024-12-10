import { isAxiosError } from 'axios';
import { respAPISubrackSchema, SubrackFormData, /*SubrackType*/ } from '../../types'
import { api } from '../../lib';

// const subrackMapped = (subrack: SubrackType) => ({
//   ...subrack,
//   createdAt: subrack.createdAt ? new Date(subrack.createdAt) : new Date(),
//   updatedAt: subrack.updatedAt ? new Date(subrack.updatedAt) : new Date(),
// })

export const createSubrack = async (formData: SubrackFormData) => {
  const transformedFormData = {
    ...formData,
    slots: formData.slots.map( slot => ({
        ...slot,
        boards: slot.boards?.map( board => board.id)
    }))
  };
  try {
    const { data } = await api.post('/catalog/subrack', transformedFormData);
    const response = respAPISubrackSchema.safeParse( data );
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
}
