import { useFormContext, useWatch } from 'react-hook-form'
import { NEFormData } from '../../../../types'

interface Props {
  indexShelf: number
}

export const ShelfDataInputs = ({ indexShelf }: Props) => {
  const {
    register,
    control,
  } = useFormContext<NEFormData>()

  const subracks = useWatch({
    control,
    name: 'subracks',
  })

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
          {...register(`subracks.${indexShelf}.shelfNumber` as const, {
            required: 'El Numero de Shelf es requerido',
            validate: value => {
              if (isNaN(value)) return 'Debe ser un número válido'
              const isUnique = subracks.every((subrack, i) => +i === +indexShelf || +subrack.shelfNumber !== +value)
              return isUnique || 'El Numero de Shelf debe ser Único'
            },
            valueAsNumber: true,
          })}
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
          {...register(`subracks.${indexShelf}.shelfName` as const, {
            required: 'El Nombre del Shelf es requerido',
            validate: value => {
              const isUnique = subracks.every((subrack, i) => +i === +indexShelf || subrack.shelfName !== value)
              return isUnique || 'El Nombre del Shelf debe ser Único'
            },
          })}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <label htmlFor='position' className='uppercase font-semibold'>
          Posicion:
        </label>
        <input
          type='text'
          min={0}
          step={1}
          id='position'
          placeholder='104501'
          className='border border-gray-300 p-1 outline-none rounded shadow-md text-black'
          {...register(`subracks.${indexShelf}.position` as const, {
            required: 'La Posicion de Shelf es requerido',
            validate: value => {
              const isUnique = subracks.every((subrack, i) => +i === +indexShelf || subrack.position !== value)
              return isUnique || 'El Numero de Shelf debe ser Único'
            },
          })}
        />
      </div>
    </div>
  )
}
