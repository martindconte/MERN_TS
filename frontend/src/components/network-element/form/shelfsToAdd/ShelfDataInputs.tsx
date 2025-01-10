import { UseFormRegister } from 'react-hook-form'
import { NEFormData } from '../../../../types'

interface Props {
  register: UseFormRegister<NEFormData>
  indexShelf: number
}

export const ShelfDataInputs = ({ indexShelf, register }: Props) => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2 border border-black px-2 py-1 rounded-lg bg-orange-100'>
      <div className='flex gap-2 items-center'>
        <label htmlFor='shelfNumber' className='uppercase font-semibold'>
          Shelf:
        </label>
        <input
          type='number'
          min={0}
          step={1}
          id='shelfNumber'
          placeholder='Numero de shelf'
          className='border border-gray-300 p-1 outline-none rounded shadow-md text-black'
          {...register(`subracks.${indexShelf}.shelfNumber` as const)}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <label htmlFor='shelfName' className='uppercase font-semibold'>
          Nombre:
        </label>
        <input
          type='text'
          id='shelfName'
          placeholder='Shelf0 / Master / Slave 1'
          className='border border-gray-300 p-1 outline-none rounded shadow-md text-black'
          {...register(`subracks.${indexShelf}.shelfName` as const)}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <label htmlFor='position' className='uppercase font-semibold'>
          Posicion:
        </label>
        <input
          type='string'
          min={0}
          step={1}
          id='position'
          placeholder='104501'
          className='border border-gray-300 p-1 outline-none rounded shadow-md text-black'
          {...register(`subracks.${indexShelf}.position` as const)}
        />
      </div>
    </div>
  )
}
