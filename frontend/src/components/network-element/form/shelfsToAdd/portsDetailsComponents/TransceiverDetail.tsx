import { UseFormRegister, Control, useWatch } from 'react-hook-form'
import { NEFormData, SubrackType } from '../../../../../types'

interface Props {
  register: UseFormRegister<NEFormData>
  control: Control<NEFormData, any>
  indexShelf: number
  indexSlot: number
  indexPort: number
  transceivers: NonNullable<SubrackType['slots'][number]['boards']>[number]['ports'][number]['equipments']
}

export const TransceiverDetail = ({ control, indexPort, indexShelf, indexSlot, register, transceivers }: Props) => {
  
  const currentEquipment = useWatch({
    control,
    name: `subracks.${indexShelf}.slots.${indexSlot}.board.ports.${indexPort}.equipment`,
  })

  return (
    <div className='relative flex items-center gap-2 pt-5 pb-2 px-3 border border-gray-300 rounded-md mt-3 hover:ring-2 hover:ring-blue-500'>
      <label className='absolute -top-2 left-2 bg-white px-2 text-sm text-gray-600 uppercase' htmlFor='equipment'>
        Transceiver
      </label>
      <select
        className='border border-gray-300 outline-none p-1 rounded shadow-md text-black w-fit focus:outline-none focus:ring-2 focus:ring-fuchsia-500'
        id='equipment'
        value={currentEquipment}
        {...register(`subracks.${indexShelf}.slots.${indexSlot}.board.ports.${indexPort}.equipment` as const)}
      >
        <option value=''>EMPTY</option>
        {transceivers.map(transceiver => (
          <option key={transceiver.id} value={transceiver.id}>
            Model: {transceiver.modelName} / PN: {transceiver.partNumber}
          </option>
        ))}
      </select>
    </div>
  )
}
