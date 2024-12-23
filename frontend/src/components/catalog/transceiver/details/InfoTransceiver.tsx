import { SubrackType, TransceiverType } from '../../../../types'
import { infoToShowInTable } from '../../../shared/table_v2/infoToShowInTable'

interface Props {
  data: TransceiverType
}

const keys = [...infoToShowInTable['catalogTransceiver']]

export const InfoTransceiver = ({ data }: Props) => {
  return (
    <div className='w-80 h-fit bg-gray-50 px-3 py-4 rounded-lg text-sm space-y-2'>
      {keys.map(keyInTable => {
        const value = data[keyInTable.key]

        if (keyInTable.key === 'vendor' && value) {
          return (
            <div key={keyInTable.key} className='flex gap-2'>
              <p className='font-semibold uppercase'>{keyInTable.label}:</p>
              <p>{(value as SubrackType['vendor']).vendorName}</p>
            </div>
          )
        }

        if ((keyInTable.key === 'createdAt' || keyInTable.key === 'updatedAt') && value instanceof Date) {
          return (
            <div key={keyInTable.key} className='flex gap-2'>
              <p className='font-semibold uppercase'>{keyInTable.label}:</p>
              <p>{value.toLocaleString()}</p>
            </div>
          )
        }

        return (
          <div key={keyInTable.key} className='flex gap-2'>
            <p className='font-semibold uppercase'>{keyInTable.label}:</p>
            <p>{value as string}</p>
          </div>
        )

        return null
      })}
    </div>
  )
}