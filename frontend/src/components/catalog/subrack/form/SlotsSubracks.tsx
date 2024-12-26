import { useState } from 'react'
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form'
import { VendorType } from '../../../../types'
import { SubrackFormData } from '../../../../types/catalog/subrackTypes'
import { SearchBoardModal } from '../modal/SearchBoardModal'
import { ErrorMsgForm } from '../../../shared/errors/ErrorMsgForm'
import { BtnSlotsActions } from './BtnSlotsActions'

interface Props {
  index: number
  control: Control<SubrackFormData>
  vendors: VendorType[]
  totalSlots: number
  value: FieldArrayWithId<SubrackFormData, 'slots', 'id'>
  setValue: UseFormSetValue<SubrackFormData>
  register: UseFormRegister<SubrackFormData>
  errors: FieldErrors<SubrackFormData>
  append: UseFieldArrayAppend<SubrackFormData, 'slots'>
  move: UseFieldArrayMove
  remove: UseFieldArrayRemove
}

export const SlotsSubracks = ({ index, value, register, errors, move, remove, totalSlots, vendors, setValue, control, append }: Props) => {
  const [showModalBoards, setShowModalBoards] = useState<boolean>(false)

  const slots = useWatch({
    control,
    name: 'slots',
  })

  return (
    <div className='flex items-center justify-between bg-gray-200 px-3 py-2 rounded-lg text-sm text-black'>
      <div className='flex flex-col w-full'>
        {errors && errors.slots && errors.slots[index] && (
          <div className='text-center mb-2'>
            <ErrorMsgForm>
              {errors.slots[index]?.number?.message || errors.slots[index]?.physical?.message || errors.slots[index]?.logical?.message}
            </ErrorMsgForm>
          </div>
        )}
        <div className='flex justify-between space-x-3'>
          <div className='space-x-2'>
            <label htmlFor={`slots.${index}.number`}>No:</label>
            <input
              type='number'
              id={`slots.${index}.number`}
              className='w-12 px-2 py-1'
              defaultValue={value.number} // Cambiar value a defaultValue
              {...register(`slots.${index}.number` as const, {
                required: true,
                validate: value => {
                  const isUnique = slots.every((slot, i) => i === index || slot.number !== value)
                  return isUnique || 'El Numero de Slot debe ser Único'
                },
              })}
            />
          </div>
          <div className='space-x-2'>
            <label htmlFor={`slots.${index}.physical`}>Slot Fisico:</label>
            <input
              type='text'
              id={`slots.${index}.physical`}
              className='w-20 px-2 py-1'
              defaultValue={value.physical} // Cambiar value a defaultValue
              {...register(`slots.${index}.physical` as const, {
                required: true,
                validate: value => {
                  const isUnique = slots.every((slot, i) => i === index || slot.physical !== value)
                  return isUnique || 'El Valor de Slot Fisico debe ser Único'
                },
              })}
            />
          </div>
          <div className='space-x-2'>
            <label htmlFor={`slots.${index}.logical`}>Slot Logico:</label>
            <input
              type='text'
              id={`slots.${index}.logical`}
              className='w-20 px-2 py-1'
              defaultValue={value.logical} // Cambiar value a defaultValuenweSubrac
              {...register(`slots.${index}.logical` as const, {
                required: true,
                validate: value => {
                  const isUnique = slots.every((slot, i) => i === index || slot.logical !== value)
                  return isUnique || 'El Valor de Slot Logico debe ser Único'
                },
              })}
            />
          </div>
          <button
            type='button'
            className='bg-fuchsia-600 uppercase flex items-center gap-2 px-2 py-1 rounded-lg text-white hover:bg-fuchsia-900'
            onClick={() => setShowModalBoards(prev => !prev)}
          >
            Asociar Placas
            <span className='material-symbols-outlined'>tab_new_right</span>
          </button>
          <BtnSlotsActions control={control} append={append} move={move} remove={remove} index={index} totalSlots={totalSlots} />
        </div>
      </div>
      {showModalBoards && <SearchBoardModal control={control} vendors={vendors} close={setShowModalBoards} index={index} setValue={setValue} />}
    </div>
  )
}
