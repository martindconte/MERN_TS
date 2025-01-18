import { Dispatch, SetStateAction } from 'react'
import { Control, UseFormSetValue, useWatch } from 'react-hook-form'
import { LogicalSignal, NEFormData, SubrackType } from '../../../../types'

interface Props {
  indexSlot: number
  control: Control<NEFormData, any>
  index: number
  subrackInfo: SubrackType
  setValue: UseFormSetValue<NEFormData>
  baordsStatus: Map<number, { status: Status, currentBoardId: string }>
  setBaordsStatus: Dispatch<SetStateAction<Map<number, { status: Status, currentBoardId: string }>>>
  // baordsStatus: Map<number, Status>;
  // setBaordsStatus: Dispatch<SetStateAction<Map<number, Status>>>;
}

enum Status {
  new = 'NEW',
  change = 'CHANGE',
  delete = 'DELETE',
}

export const BtnActions = ({ indexSlot, control, index, subrackInfo, setValue, baordsStatus, setBaordsStatus }: Props) => {
  const subrack = useWatch({
    control,
    name: `subracks.${index}`,
  })

  // Auxiliares para validación y estado
  const isBoardValid = (indexSlot: number) => {
    const board = subrack.slots[indexSlot]?.board
    return board && board.id !== '' && Array.isArray(board.ports) && board.ports.length === 0
  }

  //? Vale la pena implementar reducer???
  const getBoardStatus = (indexSlot: number) => baordsStatus.get(indexSlot)

  const updateBoardStatus = (indexSlot: number, status: Status) => {
    const currentBoardId = subrack.slots[indexSlot]?.board?.id || '';
    setBaordsStatus(prev => {
      const updated = new Map(prev);
      updated.set(indexSlot, { status, currentBoardId });
      return updated;
    });
  };
  // const updateBoardStatus = (indexSlot: number, status: Status) => {
  //   setBaordsStatus(prev => new Map(prev).set(indexSlot, status))
  // }

  const removeBoardStatus = (indexSlot: number) => {
    setBaordsStatus(prev => {
      const updated = new Map(prev)
      updated.delete(indexSlot)
      return updated
    })
  }

  const handleCancelChange = (indexSlot: number) => {
    const boardStatus = baordsStatus.get(indexSlot);
    if (!boardStatus) return; // Si no hay estado almacenado, no hacer nada.
  
    setValue(`subracks.${index}.slots.${indexSlot}.board.id`, boardStatus.currentBoardId); // Restaurar el ID original
    setBaordsStatus(prev => {
      const updated = new Map(prev);
      updated.set(indexSlot, { ...boardStatus, status: Status.new }); // Cambiar el estado a 'NEW' o mantenerlo según lógica
      return updated;
    });
  };

  // Handlers consolidados
  const handleBoardAction = (action: 'confirm' | 'delete' | 'change', indexSlot: number) => {
    switch (action) {
      case 'confirm': {
        const boardId = subrack.slots[indexSlot].board?.id
        if (!boardId) return
        const ports = subrackInfo.slots[indexSlot].boards
          ?.find(board => board.id === boardId)
          ?.ports.map(port => ({
            port: port.port,
            physical: port.physical,
            NMS: port.NMS,
            type: port.type,
            fullName: port.fullName,
            equipment: '',
            logicalFacilities: {} as Record<LogicalSignal, string[]>,
          }))
        setValue(`subracks.${index}.slots.${indexSlot}.board.ports`, ports || [])
        updateBoardStatus(indexSlot, Status.new)
        break
      }
      case 'delete':
        setValue(`subracks.${index}.slots.${indexSlot}.board`, { id: '', ports: [] })
        removeBoardStatus(indexSlot)
        break
    }
  }

  return (
    <>
      {getBoardStatus(indexSlot) === undefined && isBoardValid(indexSlot) && (
        <button type='button' className='bg-orange-400 uppercase px-2 py-1 rounded text-xs' onClick={() => handleBoardAction('confirm', indexSlot)}>
          Confirmar Placa
        </button>
      )}

      {getBoardStatus(indexSlot)?.status === Status.new && (
        <div className='flex flex-wrap items-center gap-2'>
          <button type='button' className='bg-sky-400 uppercase px-2 py-1 rounded text-xs hover:bg-sky-800 hover:text-white'>
            Ver Ports
          </button>
          <button
            type='button'
            className='bg-emerald-400 uppercase px-2 py-1 rounded text-xs hover:bg-emerald-800 hover:text-white'
            onClick={() => updateBoardStatus(indexSlot, Status.change)}
          >
            Modificar
          </button>
          <button
            type='button'
            className='bg-red-400 uppercase px-2 py-1 rounded text-xs hover:bg-red-800 hover:text-white'
            onClick={() => handleBoardAction('delete', indexSlot)}
          >
            Eliminar
          </button>
        </div>
      )}
      {getBoardStatus(indexSlot)?.status === Status.change && (
        <div className='flex flex-wrap items-center gap-1'>
          <button
            type='button'
            className='material-symbols-outlined text-[16px] bg-fuchsia-400 uppercase px-2 py-1 rounded hover:bg-fuchsia-800 hover:text-white'
            onClick={() => handleBoardAction('confirm', indexSlot)}
          >
            check_circle
          </button>
          <button
            type='button'
            title='HOLA'
            className='material-symbols-outlined text-[16px] bg-rose-400 uppercase px-2 py-1 rounded hover:bg-rose-800 hover:text-white'
            onClick={() => handleCancelChange( indexSlot )}
          >
            cancel
          </button>
        </div>
      )}
    </>
  )
}
