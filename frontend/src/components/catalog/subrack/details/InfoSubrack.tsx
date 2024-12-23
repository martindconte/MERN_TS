import { SubrackType } from '../../../../types'
import { infoToShowInTable } from '../../../shared/table_v2/infoToShowInTable'

interface Props {
  data: SubrackType
}

const keys = infoToShowInTable['catalogSubrack']

export const InfoSubrack = ({ data }: Props) => {
  return (
    <div className='bg-gray-200 font-roboto_condensed ml-4 px-3 py-1 rounded-lg h-fit min-w-64'>
      {Object.keys(data).map(keyInData =>
        keys.map(keyInTable => {
          if (keyInData === 'vendor') {
            return (
              keyInTable.key === keyInData && (
                <div key={keyInData} className='flex gap-2'>
                  <p className='font-semibold'>{keyInTable.label}:</p>
                  <p>{data[keyInData].vendorName as string}</p>
                </div>
              )
            )
          }
          if (keyInData === 'createdAt' || keyInData === 'updatedAt') {
            return (
              keyInTable.key === keyInData && (
                <div key={keyInData} className='flex gap-2'>
                  <p className='font-semibold'>{keyInTable.label}:</p>
                  <p>{data[keyInData].toLocaleString()}</p>
                </div>
              )
            )
          }
          if (keyInData !== 'id' && keyInData !== 'slots') {
            return (
              keyInTable.key === keyInData && (
                <div key={keyInData} className='flex gap-2'>
                  <p className='font-semibold'>{keyInTable.label}:</p>
                  <p>{data[keyInData] as string}</p>
                </div>
              )
            )
          }
        })
      )}
    </div>
  )
}
