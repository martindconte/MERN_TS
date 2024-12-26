import { useEffect, useState } from 'react'
import { BtnNavTransceiver, FormTransceiver, HiddenComponent, Spinner, TableV2 } from '../../../components'
import { cleanFormData } from '../../../helpers'
import { useTransceiverMutation, useTransceivers } from '../../../hook'
import { TransceiverFormData, TransceiverType } from '../../../types'

export const SearchTransceiverView = () => {

  const [search, setSearch] = useState({})

  const { queryTransceivers, page, setPage, limit, setLimit } = useTransceivers({ enabled: true, search })
  const { mutationDeleteTransceiver } = useTransceiverMutation()
  
  useEffect(() => {
    setPage(1)
  }, [limit]);
  
  const handleForm = ( formData: TransceiverFormData ) => {
    console.log(formData);
    if( !formData.bitsRates ) formData.bitsRates = [];
    const cleanedData = cleanFormData(formData);
    setSearch(cleanedData);
  }
  
  const handleDelete = async ( id: TransceiverType['id'] ): Promise<{ msg?: string, payload: TransceiverType }>  => {
    console.log(id);
    return await mutationDeleteTransceiver.mutateAsync({ id })
  }

  return (
    <main className="flex-1 bg-zinc-800 text-white font-roboto">
      <div className="w-1/2 flex gap-5 mx-auto my-5">
        <h2 className="text-3xl font-extrabold uppercase text-right"><span className='text-orange-600'>Busqueda</span> de  Transceivers/Modulos</h2>
        <h3 className="text-base font-extrabold uppercase text-left"><span className='text-blue-600'>Modifique</span> o <span className='text-red-600'>Elimine</span> Transceivers/Modulos</h3>
      </div>

      <div className="w-1/2 mx-auto flex flex-col gap-3 items-center my-3">
        <HiddenComponent>
          <FormTransceiver
            onSubmit={handleForm}
            buttonLabel='Buscar Transceivers'
            requiredFields={false}
          />
        </HiddenComponent>
        <BtnNavTransceiver />
      </div>

      {
        queryTransceivers.isLoading
          ? <Spinner />
          : (
            queryTransceivers.data &&
            <TableV2
              data={queryTransceivers.data.payload}
              pagination={queryTransceivers.data.pagination}
              info={'catalogTransceiver'}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              fnDelete={handleDelete}
            />
          )
      }
    </main>
  )
}
