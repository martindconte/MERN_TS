import { useEffect, useState } from 'react';
import { BtnNavCentral, FormCentral, HiddenComponent, Spinner, Table } from '../../components'
// import { useCentrals, useTable } from '../../hook'
import { CentralFormData } from '../../types';
import { cleanFormData } from '../../helpers';
import { useCentralMutation, useCentrals } from '../../hook';

export const SearchCentralView = () => {

  const [search, setSearch] = useState({})

  const { queryCentrals, limit, setLimit, page, setPage } = useCentrals({
    enabled: true,
    search
  })

  const { mutationDeleteCentral } = useCentralMutation()

  const handleForm = async (formData: CentralFormData) => {
    const cleanedData = cleanFormData(formData);
    setSearch(cleanedData)
  }

  useEffect(() => {
    setPage(1)
  }, [limit])

  return (
    <main className="flex-1 bg-zinc-800 text-white font-roboto">
      <div className="w-1/2 flex gap-5 mx-auto my-5">
        <h2 className="text-3xl font-extrabold uppercase text-right"><span className='text-orange-600'>Busqueda</span> de  Centrales</h2>
        <h3 className="text-base font-extrabold uppercase text-left"><span className='text-blue-600'>Modifique</span> o <span className='text-red-600'>Elimine</span> Centrales</h3>
      </div>

      <div className="w-1/2 mx-auto flex flex-col gap-3 items-center my-3">
        <HiddenComponent>
          <FormCentral
            onSubmit={handleForm}
            buttonLabel='Crear Central'
            requiredFields={false}
          />
        </HiddenComponent>
        <BtnNavCentral />
      </div>

      {
        queryCentrals.isLoading
          ? <Spinner />
          : (
            queryCentrals.data && <Table
              data={queryCentrals.data.payload}
              pagination={queryCentrals.data.pagination}
              info={'central'}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              fnDelete={ mutationDeleteCentral }
            />
          )
      }
    </main>
  )
}
