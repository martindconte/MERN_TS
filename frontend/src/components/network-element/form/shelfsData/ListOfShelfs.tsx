import { UseFieldArrayRemove, useFormContext, useWatch } from 'react-hook-form'
import {  NEFormData } from '../../../../types'

interface Props {
  index: number
  isSelected: boolean;
  onSelectShelf: () => void;
    remove: UseFieldArrayRemove;
}

export const ListOfShelfs = ({ onSelectShelf, index, isSelected, remove }: Props) => {

  const { control } = useFormContext<NEFormData>()

  const { shelfNumber, shelfName, position } = useWatch({
    control,
    name: `subracks.${index}`,
  })

  return (
    <div className={`p-2 rounded-md bg-blue-200 flex items-center gap-2 ${isSelected ? 'bg-blue-800 text-white ring ring-blue-600 ring-offset-2 ring-offset-blue-100' : ''}`}>
      <p className='whitespace-nowrap cursor-pointer' onClick={onSelectShelf}>
        {shelfNumber}: {shelfName} ({position})
      </p>
      <button
        type='button'
        className="text-[16px] material-symbols-outlined bg-red-400 rounded-full p-1 cursor-pointer hover:bg-red-900 hover:text-white"
        onClick={()=> remove(index)}
      >do_not_disturb_on</button>
    </div>
  )
}
