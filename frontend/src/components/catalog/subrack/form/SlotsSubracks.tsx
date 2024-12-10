import { Control, FieldArrayWithId, FieldErrors, UseFieldArrayMove, UseFieldArrayRemove, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { SubrackFormData } from '../../../../types/catalog/subrackTypes'
import { BtnSlotsActions } from './BtnSlotsActions'
import { useState } from 'react'
import { SearchBoardModal } from '../modal/SearchBoardModal'
import { VendorType } from '../../../../types'

interface Props {
  index: number;
  control: Control<SubrackFormData>;
  vendors: VendorType[];
  totalSlots: number;
  value: FieldArrayWithId<SubrackFormData, 'slots', 'id'>;
  setValue: UseFormSetValue<SubrackFormData>;
  register: UseFormRegister<SubrackFormData>;
  errors: FieldErrors<SubrackFormData>;
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
}

export const SlotsSubracks = ({ index, value, register, errors, move, remove, totalSlots, vendors, setValue, control }: Props) => {

    const [showModalBoards, setShowModalBoards] = useState<boolean>(false)

  return (
    <div className='flex items-center justify-between bg-gray-200 px-3 py-2 rounded-lg text-sm'>
      <div className='flex space-x-3'>
        <div className='space-x-2'>
          <label htmlFor={`slots.${index}.number`}>No:</label>
          <input
            type='number'
            id={`slots.${index}.number`}
            className='w-12 px-2 py-1'
            defaultValue={value.number} // Cambiar value a defaultValue
            {...register(`slots.${index}.number` as const, { required: true })}
          />
          {errors?.slots?.[index]?.number && <span>Campo requerido</span>}
        </div>
        <div className='space-x-2'>
          <label htmlFor={`slots.${index}.physical`}>Slot Fisico:</label>
          <input
            type='text'
            id={`slots.${index}.physical`}
            className='w-12 px-2 py-1'
            defaultValue={value.physical} // Cambiar value a defaultValue
            {...register(`slots.${index}.physical` as const, {
              required: true,
            })}
          />
          {errors?.slots?.[index]?.physical && <span>Campo requerido</span>}
        </div>
        <div className='space-x-2'>
          <label htmlFor={`slots.${index}.logical`}>Slot Logico:</label>
          <input
            type='text'
            id={`slots.${index}.logical`}
            className='w-12 px-2 py-1'
            defaultValue={value.logical} // Cambiar value a defaultValue
            {...register(`slots.${index}.logical` as const)}
          />
          {errors?.slots?.[index]?.logical && <span>Campo requerido</span>}
        </div>
        <button
          type='button'
          className='bg-fuchsia-600 uppercase flex items-center gap-2 px-2 py-1 rounded-lg text-white hover:bg-fuchsia-900'
          onClick={() => setShowModalBoards( prev => !prev )}
        >
          Asociar Placas
          <span className='material-symbols-outlined'>tab_new_right</span>
        </button>
      </div>
      <BtnSlotsActions
        move={move}
        remove={remove}
        index={index}
        totalSlots={totalSlots}
      />
      { showModalBoards && <SearchBoardModal
        control={control}
        vendors={vendors}
        close={setShowModalBoards}
        index={index}
        setValue={setValue}
      />}
    </div>
  )
}
