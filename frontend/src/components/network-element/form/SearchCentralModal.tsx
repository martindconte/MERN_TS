import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Central, CentralFormData } from '../../../types'
import { useCentrals } from '../../../hook'
import { InputsSearchCentral } from './InputsSearchCentral'
import { BtnForm, Spinner, TableV2 } from '../../shared'

interface Props {
  onCentralSelect: (centrals: Central[]) => void
  onClose: Dispatch<SetStateAction<boolean>>
}

export const SearchCentralModal = ({ onCentralSelect, onClose }: Props) => {
  const { register, reset, handleSubmit } = useForm<CentralFormData>({})

  const [search, setSearch] = useState<Partial<CentralFormData>>({})
  const [enabled, setEnabled] = useState<boolean>(false)
  const { queryCentrals, limit, page, setLimit, setPage } = useCentrals({ enabled, search })

  const handleSearchCentrals = (formData: CentralFormData) => {
    setSearch(formData)
    setEnabled(true)
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center text-black z-50 font-oswald'>
      <p className='bg-gray-100 px-14 py-3 mb-3 rounded-lg uppercase text-lg font-bold underline underline-offset-4'>
        Busque La Central Donde se Crearra el Nuevo Equipo
      </p>
      <form className='bg-gray-100 px-3 py-2 rounded-lg' onSubmit={handleSubmit(handleSearchCentrals)}>
        <InputsSearchCentral register={register} />
        <BtnForm buttonLabel='Buscar' reset={reset} />
      </form>
      {queryCentrals.isLoading ? (
        <Spinner />
      ) : (
        queryCentrals.data && (
          <div className='overflow-x-auto max-w-full'>
            <TableV2
              data={queryCentrals.data.payload}
              pagination={queryCentrals.data.pagination}
              info={'central'}
              basePath='/central'
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              fnSelectData={onCentralSelect}
            />
          </div>
        )
      )}
      <button
        className='text-white bg-red-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-red-800 hover:ring-red-800 hover:ring-2'
        type='button'
        onClick={() => onClose(false)}
      >
        CERRAR <span className='material-symbols-outlined'>close</span>
      </button>
    </div>
  )
}
