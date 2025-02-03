import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { NEFormData, SubrackType } from '../../../../types'
import { Control, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form'
import { PortsDetails } from './PortsDetails'

interface Props {
  register: UseFormRegister<NEFormData>
  setValue: UseFormSetValue<NEFormData>
  control: Control<NEFormData, any>
  slotData: SubrackType['slots'][number]
  indexShelf: number
  indexSlot: number
  onClose: Dispatch<SetStateAction<boolean>>
}

interface PortsData extends Pick<NonNullable<SubrackType['slots'][number]['boards']>[number]['ports'][number], 'port' | 'equipments'> {}

export const AddBoardInSlotModal = ({ register, control, setValue, onClose, indexShelf, indexSlot, slotData }: Props) => {
  const { shelfName, shelfNumber, position, slots } = useWatch({
    control,
    name: `subracks.${indexShelf}`,
  })

  const [boardIdSelected, setBoardIdSelected] = useState<string>('')
  const [portsData, setPortsData] = useState<PortsData[]>([])

  useEffect(() => {
    const currentBoardId = slots[indexSlot]?.board?.id || ''
    // Si hay una placa asignada y boardIdSelected es diferente (o vacío), la establecemos.
    if (currentBoardId && currentBoardId !== boardIdSelected) {
      setBoardIdSelected(currentBoardId)
    }
  }, [slots, indexSlot, boardIdSelected])

  // Actualizamos portsData cada vez que boardIdSelected o slotData cambian
  useEffect(() => {
    if (boardIdSelected) {
      const board = slotData.boards?.find(board => board.id === boardIdSelected)
      if (board) {
        setPortsData(
          board.ports.map(port => ({
            port: port.port,
            equipments: port.equipments,
          })),
        )
      } else {
        setPortsData([])
      }
    } else {
      setPortsData([])
    }
  }, [boardIdSelected, slotData])

  // confirmo la selección de la placa y la agrego al slot
  const handleAddBoard = () => {
    if (boardIdSelected === '') return
    const boardData = slotData.boards?.find(board => board.id === boardIdSelected)
    if (!boardData) return
    const boardPorts = [...boardData.ports] // Renombrada para evitar confusión
    const ports = boardPorts.map(port => ({
      port: port.port,
      physical: port.physical,
      NMS: port.NMS,
      type: port.type,
      fullName: port.fullName,
      equipment: '',
      logicalFacilities: port.logicalFacilities,
      path: {},
    }))
    const boardInfo: NEFormData['subracks'][number]['slots'][number]['board'] = {
      id: boardIdSelected,
      ports,
    }
    setValue(`subracks.${indexShelf}.slots.${indexSlot}.board`, boardInfo)
    // Opcional: actualizar portsData localmente (aunque el useEffect ya se encarga)
    setPortsData(
      boardPorts.map(port => ({
        port: port.port,
        equipments: port.equipments,
      })),
    )
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex flex-col text-black z-40 font-roboto_condensed overflow-auto'>
      <div className='flex gap-3 my-2 mx-3 px-3 py-2 bg-white rounded-md'>
        <div className='flex items-center gap-2 border border-black px-3 py-1 rounded-md'>
          <p className='uppercase font-semibold'>Seleccione una Placa para: </p>
          <p>
            Shelf {shelfNumber}: {shelfName} / {position}
          </p>
          <p>Slot No: {slots[indexSlot].number}</p>
          <p>Slot Fisico: {slots[indexSlot].physical}</p>
          <p>Slot Logico: {slots[indexSlot].logical}</p>
        </div>
        <div className='flex items-center gap-3 border border-black px-3 py-1 rounded-md'>
          <label className='uppercase' htmlFor='board'>
            Placas Disponibles
          </label>
          <select
            onChange={event => setBoardIdSelected(event.target.value)}
            className='border border-gray-300 px-1 py-1 outline-none rounded shadow-md text-black w-fit'
            defaultValue={slots[indexSlot].board?.id || ''}
            id='board'
          >
            <option value=''>EMPTY</option>
            {slotData.boards?.map(boardData => (
              <option key={boardData.id} value={boardData.id}>
                PN: {boardData.partNumber} / Model: {boardData.boardName}
              </option>
            ))}
          </select>
        </div>
        {boardIdSelected !== '' && (
          <button type='button' className='bg-sky-400 uppercase px-2 rounded-md hover:bg-sky-800 hover:text-white' onClick={handleAddBoard}>
            Confirmar
          </button>
        )}
      </div>

      {slots[indexSlot].board && slots[indexSlot].board.ports.length > 0 && (
        <div className='bg-gray-100 mx-3 px-3 py-6 rounded-md space-y-4'>
          {slots[indexSlot].board.ports.map((port, indexPort) => (
            <PortsDetails
              key={port.port}
              register={register}
              control={control}
              indexShelf={indexShelf}
              indexSlot={indexSlot}
              indexPort={indexPort}
              portInfo={port}
              transceiverData={portsData.find(portData => portData.port === port.port)}
            />
          ))}
        </div>
      )}

      <button
        type='button'
        className='absolute top-4 right-4 uppercase bg-red-400 px-3 py-2 rounded-full font-semibold shadow-xl shadow-red-800 hover:bg-red-600 hover:text-white'
        onClick={() => onClose(false)}
      >
        cerrar
      </button>
      <button
        type='button'
        className='uppercase bg-red-400 px-3 py-2 rounded-lg mx-3 my-2 font-semibold hover:bg-red-600 hover:text-white'
        onClick={() => onClose(false)}
      >
        cerrar
      </button>
    </div>
  )
}

// import { Dispatch, SetStateAction, useState } from 'react'
// import { NEFormData, SubrackType } from '../../../../types'
// import { Control, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form'
// import { PortsDetails } from './PortsDetails'

// interface Props {
//   register: UseFormRegister<NEFormData>
//   setValue: UseFormSetValue<NEFormData>
//   control: Control<NEFormData, any>
//   slotData: SubrackType['slots'][number]
//   indexShelf: number
//   indexSlot: number
//   onClose: Dispatch<SetStateAction<boolean>>
// }

// interface PortsData extends Pick<NonNullable<SubrackType['slots'][number]['boards']>[number]['ports'][number], 'port' | 'equipments'> {}

// export const AddBoardInSlotModal = ({ register, control, setValue, onClose, indexShelf, indexSlot, slotData }: Props) => {
//   const { shelfName, shelfNumber, position, slots } = useWatch({
//     control,
//     name: `subracks.${indexShelf}`,
//   })

//   const [boardIdSelected, setBoardIdSelected] = useState<string>('')
//   console.log('slotData', slotData)
//   // const [portsData, setPortsData] = useState<PortsData[]>([])
//   const [portsData, setPortsData] = useState<PortsData[]>(
//     slotData.boards?.find(board => board.id === slots[indexSlot].board?.id)?.ports.map(port => ({ port: port.port, equipments: port.equipments })) ||
//       [],
//   )

//   console.log('slots', slots)
//   console.log('portsData', portsData)

//   // confirmo la selccion de la placa y la agrego al slot
//   const handleAddBoard = () => {
//     if (boardIdSelected === '') return
//     const boardData = slotData.boards?.find(board => board.id === boardIdSelected)
//     if (!boardData) return
//     const portsData = [...boardData.ports]
//     const ports = portsData.map(port => ({
//       port: port.port,
//       physical: port.physical,
//       NMS: port.NMS,
//       type: port.type,
//       fullName: port.fullName,
//       equipment: '',
//       logicalFacilities: port.logicalFacilities,
//       path: {},
//     }))
//     const boardInfo: NEFormData['subracks'][number]['slots'][number]['board'] = {
//       id: boardIdSelected,
//       ports,
//     }
//     setValue(`subracks.${indexShelf}.slots.${indexSlot}.board`, boardInfo)
//     setPortsData(
//       portsData.map(port => ({
//         port: port.port,
//         equipments: port.equipments,
//       })),
//     )
//   }

//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex flex-col text-black z-50 font-roboto_condensed overflow-auto'>
//       <div className='flex gap-3 my-2 mx-3 px-3 py-2 bg-white rounded-md'>
//         <div className='flex items-center gap-2 border border-black px-3 py-1 rounded-md'>
//           <p className='uppercase font-semibold'>Seleccione una Placa para: </p>
//           <p>
//             Shelf {shelfNumber}: {shelfName} / {position}
//           </p>
//           <p>Slot No: {slots[indexSlot].number}</p>
//           <p>Slot Fisico: {slots[indexSlot].physical}</p>
//           <p>Slot Logico: {slots[indexSlot].logical}</p>
//         </div>
//         <div className='flex items-center gap-3 border border-black px-3 py-1 rounded-md'>
//           <label className='uppercase' htmlFor='board'>
//             Placas Disponibles
//           </label>
//           <select
//             onChange={event => setBoardIdSelected(event.target.value)}
//             className='border border-gray-300 px-1 py-1 outline-none rounded shadow-md text-black w-fit'
//             defaultValue={slots[indexSlot].board?.id || ''}
//             id='board'
//           >
//             <option value=''>EMPTY</option>
//             {slotData.boards?.map(boardData => (
//               <option key={boardData.id} value={boardData.id}>
//                 PN: {boardData.partNumber} / Model: {boardData.boardName}
//               </option>
//             ))}
//           </select>
//         </div>
//         {boardIdSelected !== '' && (
//           <button type='button' className='bg-sky-400 uppercase px-2 rounded-md hover:bg-sky-800 hover:text-white' onClick={handleAddBoard}>
//             Confirmar
//           </button>
//         )}
//       </div>

//       {slots[indexSlot].board && slots[indexSlot].board.ports.length > 0 && (
//         <div className='bg-gray-100 mx-3 px-3 py-6 rounded-md space-y-4'>
//           {slots[indexSlot].board.ports.map((port, indexPort) => (
//             <PortsDetails
//               key={port.port}
//               register={register}
//               control={control}
//               indexShelf={indexShelf}
//               indexSlot={indexSlot}
//               indexPort={indexPort}
//               portInfo={port}
//               transceiverData={portsData.find(portData => portData.port === port.port)}
//             />
//           ))}
//         </div>
//       )}
//         <button
//           type='button'
//           className='w-full my-2 mx-3 uppercase bg-red-400 px-3 py-2 rounded-md font-semibold hover:bg-red-600 hover:text-white'
//           onClick={() => onClose(false)}
//         >
//           Cerrar
//         </button>
//     </div>
//   )
// }
