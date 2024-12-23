import { colors, SubrackType } from '../../../../types'

interface Props {
  slots: SubrackType['slots']
}

export const SlotsDetails = ({ slots }: Props) => {
  return (
    <div className='bg-gray-200 font-roboto_condensed rounded-lg mr-4 text-sm w-full overflow-y-auto max-h-[750px]'>
      {slots.map((slot, index) => (
        <div key={index} className='flex rounded-lg px-2 py-1 my-2 mx-3 border border-black bg-white'>
          <div className='flex items-center justify-around w-1/2'>
            <div className='flex gap-1'>
              <p className='font-semibold'>No.:</p>
              <p>{slot.number}</p>
            </div>
            <div className='flex gap-1'>
              <p className='font-semibold'>Slot Fisico:</p>
              <p>{slot.physical}</p>
            </div>
            <div className='flex gap-1'>
              <p className='font-semibold'>Slot Logico:</p>
              <p>{slot.logical}</p>
            </div>
          </div>
          <div className='flex items-center pl-2 grow'>
            <p className='font-semibold'>Placas Admitidas</p>
            <ul className='flex flex-wrap gap-2 px-3 py-1 text-xs'>
              {slot.boards?.map(board => (
                <li key={board.id} className={`flex gap-2 p-1 rounded-md ${colors[Math.floor(Math.random() * colors.length)]}`}>
                  <p>
                    <span className='font-semibold uppercase'>PN: </span>
                    {board.partNumber}
                  </p>
                  <p>
                    <span className='font-semibold uppercase'>Nombre: </span>
                    {board.boardName}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
