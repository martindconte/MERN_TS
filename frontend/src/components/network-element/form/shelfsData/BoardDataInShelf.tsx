import { useFormContext, useWatch } from 'react-hook-form'
import { NEFormData, SubrackType } from '../../../../types'
import { Dispatch, SetStateAction } from 'react';
// import { BtnActions, BtnActionsShelf } from './BtnActionsShelf'

interface Props {
  setShowModalSelectBoard: Dispatch<SetStateAction<boolean>>
  slotData: SubrackType['slots'][number];
  indexShelf: number;
  indexSlot: number;
}

export const BoardDataInShelf = ({ setShowModalSelectBoard, indexShelf, indexSlot, slotData }: Props) => {

  const { control, setValue } = useFormContext<NEFormData>()
  
  const { slots } = useWatch({
    control,
    name: `subracks.${indexShelf}`,
  })
  
  const boardInfo = slotData.boards?.find(board => board.id === slots[indexSlot].board?.id)

  return (
    <div>
      {boardInfo ? (
        <div className='flex items-center gap-2'>
            <p className='bg-emerald-200 px-3 py-1 rounded-md cursor-pointer hover:bg-emerald-700 hover:text-white'>
              {boardInfo.boardName} // {boardInfo.partNumber}
            </p>
            <button
                type='button'
                className='material-symbols-outlined bg-yellow-300 text-[18px] uppercase px-3 py-1 rounded-md hover:bg-yellow-700 hover:text-white'
                title='Editar Placa y Puertos'
                onClick={() => setShowModalSelectBoard(prev => !prev)}
            >edit</button>
            <button
                type='button'
                title='Eliminar Placa'
                className='material-symbols-outlined bg-red-400 text-[18px] uppercase px-3 py-1 rounded-md hover:bg-red-700 hover:text-white'
                onClick={() => setValue( `subracks.${indexShelf}.slots.${indexSlot}.board`, undefined )}
            >delete</button>
        </div>
      ) : (
        <p className='bg-gray-700 text-white px-3 py-1 rounded-md'>EMPTY</p>
      )}
    </div>
  )
}
