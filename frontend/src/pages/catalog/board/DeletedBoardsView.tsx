import { useMemo, useState } from 'react'
import { FiltersBoardsDeleted, Spinner, TableV2 } from '../../../components'
import { useBoardsDeleted } from '../../../hook/catalog/board/useBoardsDeleted'
import { BoardsDeletedType, BoardType } from '../../../types'
import { useBoardMutation } from '../../../hook'

export const DeletedBoardsView = () => {
  const [filterVendor, setFilterVendor] = useState<string>('')
  const [filterPNBoard, setFilterPNBoard] = useState<string>('')
  const [filterBoardName, setFilterBoardName] = useState<string>('')

  const { queryBoardsDeleted } = useBoardsDeleted({})
  const { mutationPermanentlyDeleteBoard } = useBoardMutation()

  console.log(queryBoardsDeleted.data)

  const filteredBoards: BoardsDeletedType = useMemo(() => {
    return {
      boards: queryBoardsDeleted.data
        ? queryBoardsDeleted.data.boards.filter(
            board =>
              board.vendor.vendorName?.toLowerCase().includes(filterVendor.toLowerCase()) &&
              board.partNumber.toLowerCase().includes(filterPNBoard.toLowerCase()) &&
              board.boardName.toLowerCase().includes(filterBoardName.toLowerCase()),
          )
        : [],
      subracks: queryBoardsDeleted.data
        ? queryBoardsDeleted.data.subracks.filter(
            subrack =>
              subrack.vendor.vendorName?.toLowerCase().includes(filterVendor.toLowerCase()) &&
              subrack.slots.filter(slot => slot.boards?.filter(board => board.partNumber.toLowerCase() === filterPNBoard.toLowerCase())) &&
              subrack.slots.filter(slot => slot.boards?.filter(board => board.boardName.toLowerCase() === filterBoardName.toLowerCase())),
          )
        : [],
    }
  }, [filterVendor, filterPNBoard, filterBoardName, queryBoardsDeleted.data])

  const handlePermanentlyDeleteBoard = async (id: BoardType['id']) => {
    await mutationPermanentlyDeleteBoard.mutateAsync(id)
  }

  if (queryBoardsDeleted.isError)
    return (
      <p className='flex-1 bg-gray-900 text-white text-center font-roboto_condensed text-2xl font-extrabold uppercase py-10'>
        Placas no Encontradas...
      </p>
    )

  if (queryBoardsDeleted.isLoading) return <Spinner />

  return (
    <main className='flex-1 bg-stone-900 font-oswald'>
      <div className='flex items-start gap-6 px-4 my-6 max-w-[1100px] mx-auto text-white'>
        <h2 className='basis-1/2 text-4xl uppercase font-bold text-right'>
          Placas <span className='text-red-500'>Eliminadas</span>
        </h2>
        <h3 className='basis-1/2 text-lg uppercase font-bold text-left'>
          Verifica y Limpia los Registros de Placas que aun se encuentran asociados a distintos Subracks
        </h3>
      </div>

      <div className='font-roboto text-sm flex items-center justify-center gap-4 bg-emerald-300 w-3/4 mx-auto px-10 py-2 rounded-md'>
        <p className='uppercase bg-emerald-50 px-3 py-2 rounded-md basis-2/5'>
          Cantidad de Transceivers Eliminados: {queryBoardsDeleted.data?.boards.length}
        </p>
        <FiltersBoardsDeleted
          vendorValue={filterVendor}
          onChangeVendor={setFilterVendor}
          PNValue={filterPNBoard}
          onChangePN={setFilterPNBoard}
          boardNameValue={filterBoardName}
          onChangeBoardName={setFilterBoardName}
        />
      </div>
      <div className='border border-gray-600 mx-3 mt-4 text-center rounded-lg bg-gray-50 px-3 py-2 '>
        <p className='uppercase text-xl font-bold font-roboto underline decoration-red-500 underline-offset-4'>Placas Eliminados</p>
        <TableV2 data={filteredBoards.boards} info='catalogBoard' basePath='catalog/board' fnDelete={handlePermanentlyDeleteBoard} />
      </div>
      <div className='border border-gray-600 mx-3 mt-4 text-center rounded-lg bg-gray-50 px-3 py-2 '>
        <p className='uppercase text-xl font-bold font-roboto underline decoration-red-500 underline-offset-4'>Subracks con Placas Eliminadas</p>
        <TableV2 data={filteredBoards.subracks} info='catalogSubrack' basePath='catalog/subrack' />
      </div>
    </main>
  )
}
