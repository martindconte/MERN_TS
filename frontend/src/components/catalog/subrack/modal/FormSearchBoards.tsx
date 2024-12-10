import { useForm } from 'react-hook-form'
import { BoardFormData, BoardType, RoadmapEnum, TechnologyEnum, VendorType } from '../../../../types'
import { Dispatch, SetStateAction, useState } from 'react'
import { useBoards } from '../../../../hook'
import { InputsSearchBoards } from './InputsSearchBoards'
import { Table } from '../../../shared/table/Table'
import { Spinner } from '../../../shared/spinners/Spinner'

interface Props {
  vendors: VendorType[];
  boardsSelected: BoardType[];
  setBoardsSelected: Dispatch<SetStateAction<BoardType[]>>;
}

export const FormSearchBoards = ({ vendors, boardsSelected, setBoardsSelected }: Props) => {

  const { register, handleSubmit, reset } = useForm<BoardFormData>({
    defaultValues: {
      roadmap: RoadmapEnum.empty,
      technology: TechnologyEnum.DWDM,
    }
  })
  const [search, setSearch] = useState<Partial<BoardFormData>>({ isDeleted: false })
  const [enabled, setEnabled] = useState<boolean>(false)
  // const [boardsSelected, setBoardsSelected] = useState<BoardType[]>([])
  const { queryBoards, limit, page, setLimit, setPage } = useBoards({ enabled, search })

  const handleSearchBoards = (formData: BoardFormData) => {
    setSearch(formData)
    setEnabled(true)
  }

  // const handleBoardSelect = ( data: BoardType[] ) => {
  //   setBoardsSelected( data )
  // }

  if( queryBoards.isLoading ) return <Spinner />

  return (
    <div className='flex flex-col'>
      <p className='text-2xl uppercase mb-3 bg-white px-4 py-2 rounded-lg font-bold w-fit mx-auto'>Busque Placas para Asociar al Subrack</p>
      <div className='flex gap-2 bg-gray-300 px-4 py-3 rounded-lg'>
        <InputsSearchBoards
          register={register}
          vendors={vendors}
        />
        <button
          type='button'
          className='bg-sky-400 uppercase px-3 py-1 rounded-lg hover:bg-sky-700 hover:text-white hover:shadow-lg hover:shadow-sky-600/100'
          onClick={handleSubmit(handleSearchBoards)}
        >Buscar</button>
        <button
          type='reset'
          className='bg-rose-400 uppercase px-3 py-1 rounded-lg hover:bg-rose-700 hover:text-white hover:shadow-lg hover:shadow-rose-600/100'
          onClick={() => reset()}
        >Limpiar</button>
      </div>
      <div className='bg-gray-200 mt-2 rounded-lg'>
        <Table
          info='catalogBoard'
          data={queryBoards.data?.payload ?? []}
          pagination={queryBoards.data?.pagination}
          limit={limit}
          page={page}
          setLimit={setLimit}
          setPage={setPage}
          fnSelected={setBoardsSelected}
          selectedData={boardsSelected}
        />
      </div>
    </div>
  )
}
