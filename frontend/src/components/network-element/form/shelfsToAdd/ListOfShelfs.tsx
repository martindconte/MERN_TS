import { Control, useWatch } from 'react-hook-form'
import {  NEFormData } from '../../../../types'

interface Props {
  // fields: FieldArrayWithId<NEFormData, 'subracks', 'key'>[]
  control: Control<NEFormData, any>
  index: number
  isSelected: boolean;
  // onSelectShelf: (keyField: string | undefined) => void
  onSelectShelf: () => void
}

export const ListOfShelfs = ({ /* fields, */ onSelectShelf, control, index, isSelected }: Props) => {
  // const subracks = useWatch({
  //   control,
  //   name: `subracks`,
  // })
  const { shelfNumber, shelfName, position } = useWatch({
    control,
    name: `subracks.${index}`,
  })

  return (
    <div className={`p-2 rounded-md bg-purple-300 ${isSelected ? 'bg-purple-800 text-white ring ring-purple-600 ring-offset-2 ring-offset-purple-100' : ''}`} onClick={onSelectShelf}>
    {/* <div className={`border border-gray-300 p-2 rounded-md bg-amber-300 ${isSelected ? 'bg-violet-700 text-white font-semibold border-double border-8 border-black' : ''}`} onClick={onSelectShelf}> */}
      <p className='whitespace-nowrap cursor-pointer'>
        {shelfNumber}: {shelfName} ({position})
      </p>
    </div>
  )

  // console.log(subracks);

  // return (
  //   <>
  //     {subracks.map((subrack, index) => (
  //       <div key={subrack.id + index} className={`border border-gray-300 p-2 rounded-md ${colors[Math.floor(Math.random() * colors.length)]}`} onClick={onSelectShelf}>
  //         <p className='whitespace-nowrap cursor-pointer'>
  //           {subrack.shelfNumber}: {subrack.shelfName} ({subrack.position})
  //         </p>
  //       </div>
  //     ))}
  //   </>
  // )

  // return (
  //   <>
  //     {fields.map((field, index) => (
  //       <div className={`border border-gray-300 p-2 rounded-md ${colors[Math.floor(Math.random() * colors.length)]}`} onClick={onSelectShelf}>
  //         <p className='whitespace-nowrap cursor-pointer'>
  //           {subracks[index].shelfNumber}: {subracks[index].shelfName} ({subracks[index].position})
  //         </p>
  //       </div>
  //     ))}
  //   </>
  // )

}
