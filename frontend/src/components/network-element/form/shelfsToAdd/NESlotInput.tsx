import { useState } from 'react'
import { Control, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form'
import { NEFormData, SubrackType } from '../../../../types'
import { AddBoardInSlotModal } from './AddBoardInSlotModal'
import { BoardDataInShelf } from './BoardDataInShelf'

interface Props {
  register: UseFormRegister<NEFormData>
  setValue: UseFormSetValue<NEFormData>
  control: Control<NEFormData, any>
  slotData: SubrackType['slots'][number]
  indexShelf: number
  indexSlot: number
}

export const NESlotInput = ({
  register,
  control,
  slotData,
  indexShelf,
  indexSlot,
  setValue /* isBoardConfirm */ /* handleChangeBoard  */,
}: Props) => {
  const [showModalSelectBoard, setShowModalSelectBoard] = useState<boolean>(false)

  const { board } = useWatch({
    control,
    name: `subracks.${indexShelf}.slots.${indexSlot}`,
  })

  return (
    <>
      <div className='flex gap-2 items-center'>
        <label htmlFor='physical' className='uppercase font-semibold'>
          Slot:
        </label>
        <input
          className='border border-gray-300 px-1 py-1 outline-none rounded shadow-md text-black w-16'
          type='string'
          min={0}
          step={1}
          id='physical'
          placeholder='Slot Fisico del Equipo'
          readOnly
          value={slotData.physical}
          {...register(`subracks.${indexShelf}.slots.${indexSlot}.physical` as const)}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <label htmlFor='logical' className='uppercase font-semibold'>
          NMS:
        </label>
        <input
          className='border border-gray-300 px-1 py-1 outline-none rounded shadow-md text-black w-16'
          type='string'
          min={0}
          step={1}
          id='logical'
          placeholder='Slot Fisico del Equipo'
          readOnly
          value={slotData.logical}
          {...register(`subracks.${indexShelf}.slots.${indexSlot}.logical` as const)}
        />
      </div>

      {/* Muestro la informacion de la placa seleccionado en caso de haber hecho una seleccion o EMPTY */}
      <BoardDataInShelf
        control={control}
        setValue={setValue}
        indexShelf={indexShelf}
        indexSlot={indexSlot}
        slotData={slotData}
        setShowModalSelectBoard={setShowModalSelectBoard}
      />
      {/* Muestro el boton de seleccion de placa en caso de no haber board en el slot */}
      {!board?.id && (
        <button type='button' className='bg-blue-400 px-2 py-1 rounded-lg' onClick={() => setShowModalSelectBoard(true)}>
          Seleccion Placa
        </button>
      )}

      {/* Modal que se muestra en caso de presionar el boton "Selccion Placa". Abre el Modal de seleccion de placa*/}
      {showModalSelectBoard && (
        <AddBoardInSlotModal
          register={register}
          control={control}
          setValue={setValue}
          slotData={slotData}
          indexShelf={indexShelf}
          indexSlot={indexSlot}
          onClose={setShowModalSelectBoard}
        />
      )}
    </>
  )
}
