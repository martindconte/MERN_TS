import { Control, UseFieldArrayAppend, UseFieldArrayMove, UseFieldArrayRemove, useWatch } from 'react-hook-form'
import { SubrackFormData } from '../../../../types'

interface Props {
  index: number
  move: UseFieldArrayMove
  remove: UseFieldArrayRemove
  totalSlots: number
  control: Control<SubrackFormData>
  append: UseFieldArrayAppend<SubrackFormData, 'slots'>
}

export const BtnSlotsActions = ({ index, move, remove, totalSlots, append, control }: Props) => {
  const slots = useWatch({
    control,
    name: 'slots',
  })

  const onClone = (index: number) => {
    const slotToClone = slots[index]
    console.log(slotToClone)
    append({
      ...slotToClone,
      number: Number(slotToClone.number) + 1,
      logical: slotToClone.logical.replace(/(\d+)(?!.*\d)/, match => (parseInt(match) + 1).toString()),
      physical: slotToClone.physical.replace(/(\d+)(?!.*\d)/, match => (parseInt(match) + 1).toString()),
    })
  }

  return (
    <div className='flex items-center gap-1 rounded-lg'>
      <button
        className='material-symbols-outlined text-xs w-fit p-1 bg-lime-400 flex items-center justify-center rounded-full hover:bg-lime-800 hover:text-white'
        type='button'
        title='Clonar'
        onClick={() => onClone(index)}
      >
        content_copy
      </button>
      <button
        className={`${
          index === 0 ? 'opacity-50' : ''
        } material-symbols-outlined text-xs w-fit p-1 bg-blue-400 flex items-center justify-center rounded-full`}
        type='button'
        onClick={() => index > 0 && move(index, index - 1)}
        disabled={index === 0}
        title='Desplazar Abajo'
      >
        arrow_upward
      </button>
      <button
        className={`${
          index === totalSlots - 1 ? 'opacity-50' : ''
        } material-symbols-outlined text-xs w-fit p-1 bg-blue-400 flex items-center justify-center rounded-full`}
        type='button'
        onClick={() => index < totalSlots - 1 && move(index, index + 1)}
        disabled={index === totalSlots - 1}
        title='Desplazar Arriba'
      >
        arrow_downward
      </button>
      <button
        className='material-symbols-outlined text-xs w-fit p-1 bg-red-400 flex items-center justify-center rounded-full'
        type='button'
        title='Eliminar'
        onClick={() => remove(index)}
      >
        delete
      </button>
    </div>
  )
}
