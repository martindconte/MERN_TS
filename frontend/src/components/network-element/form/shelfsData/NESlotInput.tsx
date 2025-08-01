import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { NEFormData, SubrackType } from '../../../../types';
import { BoardDataInShelf, AddBoardInSlotModal } from './';

interface Props {
  slotData: SubrackType['slots'][number];
  indexShelf: number;
  indexSlot: number;
}

export const NESlotInput = ({ slotData, indexShelf, indexSlot }: Props) => {

  const [showModalSelectBoard, setShowModalSelectBoard] = useState<boolean>(false)
  const { control, register } = useFormContext<NEFormData>()

  //todo: Revisar necesidad de usar useWatch
  const { board } = useWatch({
    control,
    name: `subracks.${indexShelf}.slots.${indexSlot}`,
  })

  return (
    <>
      <div className='flex gap-2 items-center'>
        <label htmlFor={`physical-${indexShelf}-${indexSlot}`} className='uppercase font-semibold'>
          Slot:
        </label>
        <input
          className='border border-gray-300 px-1 py-1 outline-none rounded shadow-md text-black w-16'
          type='string'
          min={0}
          step={1}
          id={`physical-${indexShelf}-${indexSlot}`}
          placeholder='Slot Fisico del Equipo'
          readOnly
          value={slotData.physical}
          {...register(`subracks.${indexShelf}.slots.${indexSlot}.physical` as const)}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <label htmlFor={`logical-${indexShelf}-${indexSlot}`} className='uppercase font-semibold'>
          NMS:
        </label>
        <input
          className='border border-gray-300 px-1 py-1 outline-none rounded shadow-md text-black w-16'
          type='string'
          min={0}
          step={1}
          id={`logical-${indexShelf}-${indexSlot}`}
          placeholder='Slot Fisico del Equipo'
          readOnly
          value={slotData.logical}
          {...register(`subracks.${indexShelf}.slots.${indexSlot}.logical` as const)}
        />
      </div>

      {/* Muestro la informacion de la placa seleccionado en caso de haber hecho una seleccion o EMPTY */}
      <BoardDataInShelf
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
          slotData={slotData}
          indexShelf={indexShelf}
          indexSlot={indexSlot}
          onClose={setShowModalSelectBoard}
        />
      )}
    </>
  )
}
