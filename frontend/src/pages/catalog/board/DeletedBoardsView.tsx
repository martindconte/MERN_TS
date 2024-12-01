import { useMemo, useState } from 'react'
import { Spinner, Table } from '../../../components'
import { useBoardsDeleted } from '../../../hook/catalog/board/useBoardsDeleted'
import { BoardsDeletedType, BoardType } from '../../../types'
import { useBoardMutation } from '../../../hook'

export const DeletedBoardsView = () => {

  const [filterVendor, setFilterVendor] = useState<string>('')
  const [filterPNBoard, setFilterPNBoard] = useState<string>('')
  const [filterBoardName, setFilterBoardName] = useState<string>('')

  const { queryBoardsDeleted } = useBoardsDeleted({})
  const { mutationPermanentlyDeleteBoard } = useBoardMutation()

  const filteredBoards: BoardsDeletedType = useMemo(() => {
    return {
      boards: queryBoardsDeleted.data
        ? queryBoardsDeleted.data.boards.filter(board =>
          board.vendor.vendorName?.toLowerCase().includes(filterVendor.toLowerCase()) &&
          board.partNumber.toLowerCase().includes(filterPNBoard.toLowerCase()) &&
          board.boardName.toLowerCase().includes( filterBoardName.toLowerCase() )
        )
        : [],
      subracks: 'TODO /// SUBRACKS...' // Puedes ajustar esto según sea necesario
    };
  }, [filterVendor, filterPNBoard, filterBoardName, queryBoardsDeleted.data]);

  const handlePermanentlyDeleteBoard = async (id: BoardType['id']) => {
    await mutationPermanentlyDeleteBoard.mutateAsync(id);
  };

  if (queryBoardsDeleted.isError) return (
    <p className="flex-1 bg-gray-900 text-white text-center font-roboto_condensed text-2xl font-extrabold uppercase py-10">
      Placas no Encontradas...
    </p>
  );

  if (queryBoardsDeleted.isLoading) return <Spinner />

  return (
    <main className="flex-1 bg-stone-900 font-oswald">
      <div className='flex items-start gap-6 px-4 my-6 max-w-[1100px] mx-auto text-white'>
        <h2 className='basis-1/2 text-4xl uppercase font-bold text-right'>Placas <span className='text-red-500'>Eliminadas</span></h2>
        <h3 className='basis-1/2 text-lg uppercase font-bold text-left'>Verifica y Limpia los Registros de Placas que aun se encuentran asociados a distintos Subracks</h3>
      </div>

      <div className='font-roboto text-sm flex items-center justify-center gap-4 bg-emerald-300 w-3/4 mx-auto px-10 py-2 rounded-md'>
        <p className='uppercase bg-emerald-50 px-3 py-2 rounded-md basis-2/5'>Cantidad de Transceivers Eliminados: {queryBoardsDeleted.data?.boards.length}</p>
        <div className='flex flex-col gap-3 bg-emerald-200 px-3 py-1 rounded-md basis-3/5'>
          <div className='flex items-center px-2 py-1 rounded-md bg-white text-right font-oswald'>
            <label htmlFor='filterVendor' className='w-1/2 uppercase'>Filtrar Vendor</label>
            <input
              className='mx-3 px-2 py-1 border border-gray-400 rounded-md outline-none grow'
              type="text"
              name="filterVendor"
              id="filterVendor"
              value={filterVendor}
              onChange={e => setFilterVendor(e.target.value)}
            />
          </div>
          <div className='flex items-center px-2 py-1 rounded-md bg-white text-right font-oswald'>
            <label htmlFor='filterPartNumber' className='w-1/2 uppercase'>Filtrar Part Number Board</label>
            <input
              className='mx-3 px-2 py-1 border border-gray-400 rounded-md outline-none grow'
              type="text"
              name="filterPNBoard"
              id="filterPNBoard"
              value={filterPNBoard}
              onChange={e => setFilterPNBoard(e.target.value)}
            />
          </div>
          <div className='flex items-center px-2 py-1 rounded-md bg-white text-right font-oswald'>
            <label htmlFor='filterPartNumber' className='w-1/2 uppercase'>Filtrar Board Name</label>
            <input
              className='mx-3 px-2 py-1 border border-gray-400 rounded-md outline-none grow'
              type="text"
              name="filterBoardName"
              id="filterBoardName"
              value={filterBoardName}
              onChange={e => setFilterBoardName(e.target.value)}
            />
          </div>
          {/* <div className='flex items-center px-2 py-1 rounded-md bg-white text-right font-oswald'>
            <label htmlFor='filterPartNumber' className='w-1/2 uppercase'>Filtrar Part Number Transceiver</label>
            <input
              className='mx-3 px-2 py-1 border border-gray-400 rounded-md outline-none grow'
              type="text"
              name="filterPartNumber"
              id="filterPartNumber"
            // value={filterPartNumber}
            // onChange={e => setFilterPartNumber(e.target.value)}
            />
          </div> */}
        </div>
      </div>
      <div className='border border-gray-600 mx-3 mt-4 text-center rounded-lg bg-gray-50 px-3 py-2 '>
        <p className='uppercase text-xl font-bold font-roboto underline decoration-red-500 underline-offset-4'>Placas Eliminados</p>
        <Table
          data={filteredBoards.boards}
          info='catalogBoard'
          path='catalog/board'
          fnDelete={handlePermanentlyDeleteBoard}
        // fnDelete={handlePermanentlyDeleteTransceiver}
        />
      </div>
      <div className='border border-gray-600 mx-3 mt-4 text-center rounded-lg bg-gray-50 px-3 py-2 '>
        <p className='uppercase text-xl font-bold font-roboto underline decoration-red-500 underline-offset-4'>Subracks con Placas Eliminadas</p>
        <p>TODO SUBRACKS......</p>
        {/* <Table
                data={queryBoardsDeleted.data}
                info='catalogBoard'
                path='catalog/board'
              // fnDelete={ handlePermanentlyDeleteTransceiver }
              /> */}
      </div>
    </main>
  )
}
