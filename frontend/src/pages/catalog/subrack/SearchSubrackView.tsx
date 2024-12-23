import { useEffect, useState } from 'react'
import { FormSubrack, HiddenComponent, Spinner } from '../../../components'
import { cleanFormData } from '../../../helpers'
import { useSubrackMutation, useSubracks } from '../../../hook'
import { SubrackFormData, SubrackType } from '../../../types'
import { TableV2 } from '../../../components/shared/table_v2/TableV2'

export const SearchSubrackView = () => {
  const [search, setSearch] = useState<Partial<SubrackFormData>>({})
  const { querySubracks, limit, page, setLimit, setPage } = useSubracks({ search })
  const { mutationDeletedSubrack } = useSubrackMutation()

  useEffect(() => {
    setPage(1)
  }, [limit])

  const handleDelete = async ( id: SubrackType['id'] ) => {
    await mutationDeletedSubrack.mutateAsync({ id })
  }

  const handleForm = (formData: SubrackFormData) => {
    const cleanedData = cleanFormData(formData)
    setSearch(cleanedData)
  }

  return (
    <main className='flex-1 bg-zinc-900 text-white font-roboto'>
      <div className='w-1/2 flex gap-5 mx-auto my-5'>
        <h2 className='text-3xl font-extrabold uppercase text-right'>
          <span className='text-orange-600'>Busqueda</span> de Subracks
        </h2>
        <h3 className='text-base font-extrabold uppercase text-left'>
          <span className='text-blue-600'>Modifique</span> o <span className='text-red-600'>Elimine</span> Subracks
        </h3>
      </div>

      <div className='mx-auto flex flex-col gap-3 items-center my-3'>
        <HiddenComponent>
          <FormSubrack buttonLabel='Buscar Subracks' onSubmit={handleForm} requiredFields={false} />
        </HiddenComponent>
      </div>

      {querySubracks.isLoading ? (
        <div className='font-oswald text-white flex flex-col items-center gap-3 my-6'>
          <p className='uppercase'>Actualizando Busqueda...</p>
          <Spinner />
        </div>
      ) : (
        <TableV2
          info='catalogSubrack'
          data={querySubracks.data?.payload || []}
          pagination={querySubracks.data?.pagination}
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          fnDelete={handleDelete}
        />
      )}
    </main>
  )
}
