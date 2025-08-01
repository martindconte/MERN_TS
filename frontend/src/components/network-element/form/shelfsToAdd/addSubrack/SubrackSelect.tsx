import { Dispatch, SetStateAction } from 'react'
import { SubrackType } from '../../../../../types'

interface Props {
  subracks: Pick<SubrackType, 'id' | 'subrackType' | 'subrackFamily' | 'modelName' | 'partNumber'>[]
  subrackIdSelected: string
  setSubrackIdSelected: Dispatch<SetStateAction<string>>
}

export const SubrackSelect = ({ subracks, subrackIdSelected, setSubrackIdSelected }: Props) => (
  <div className='flex gap-2 items-center px-3 py-1'>
    <label htmlFor='subrackNE'>Subrack:</label>
    <select
      className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black grow'
      id='subrackNE'
      value={subrackIdSelected}
      onChange={e => setSubrackIdSelected(e.target.value)}
    >
      {subracks.map(({ id, subrackType, subrackFamily, modelName, partNumber }) => (
        <option key={id} value={id}>
          {subrackType} {subrackFamily} / Model: {modelName} / PN: {partNumber}
        </option>
      ))}
    </select>
  </div>
)
