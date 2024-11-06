import { useState } from 'react';
import { BtnNavBoard, FormBoard, HiddenComponent, Spinner, Table } from '../../../components'
import { useBoards } from '../../../hook';
import { BoardFormData } from '../../../types';
import { cleanFormData } from '../../../helpers';

export const SearchBoardView = () => {

  const [search, setSearch] = useState<BoardFormData>({} as BoardFormData)

  const { queryBoards, page, setPage, limit, setLimit } = useBoards({ search })

  const handleForm = ( formData: BoardFormData ) => {
    const cleanedData = cleanFormData(formData);
    setSearch(cleanedData as BoardFormData);
  }

  if( queryBoards.isError ) return <p className="flex-1 bg-gray-900 text-white text-center font-roboto_condensed text-2xl font-extrabold uppercase py-10">Placas no Encontradas...</p>;

  return (
    <main className="flex-1 bg-zinc-800 text-white font-roboto">
      <div className="w-1/2 flex items-center gap-5 mx-auto my-5">
        <h2 className="text-3xl font-extrabold uppercase text-right"><span className='text-yellow-400'>Busqueda</span> de PLacas</h2>
        <h3 className="text-base font-extrabold uppercase text-left"><span className='text-blue-600'>Modifique</span> o <span className='text-red-600'>Elimine</span> Placas</h3>
      </div>

      <div className="text-black flex flex-col items-center gap-2">
        <HiddenComponent>
          <FormBoard
            onSubmit={handleForm}
            buttonLabel='Buscar Transceivers'
            requiredFields={false}
          />
        </HiddenComponent>

        {
          queryBoards.isLoading
            ? <Spinner />
            : queryBoards.data && (
              <Table
                data={queryBoards.data?.payload}
                pagination={queryBoards.data.pagination}
                info="catalogBoard"
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
              />
            )
        }

        <div className="w-1/4">
          <BtnNavBoard />
        </div>
      </div>
    </main>
  )
}
