import { Link, useLocation, useParams } from 'react-router-dom'
import { useSubrack } from '../../../hook'
import { BtnNavSubrack, InfoSubrack, SlotsDetails, Spinner } from '../../../components'

export const DetailsSubrackView = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const { subrackId } = useParams<{ subrackId: string }>()

  const { querySubrack } = useSubrack({ id: subrackId! })

  if (querySubrack.isLoading) return <Spinner />
  if (querySubrack.isError || !querySubrack.data)
    return (
      <div className='flex-1 bg-stone-950 text-white uppercase text-2xl font-bold py-6 px-4 text-center'>
        <p className='mb-6'>Error al Cargar la informacion de Las Placas</p>
        <span className='material-symbols-outlined text-red-600 text-9xl font-bold'>error</span>
      </div>
    )

  return (
    <main className='flex-1 bg-zinc-900 font-roboto'>
      {queryParams.get('isDeleted') === 'true' && (
        <div className='text-white bg-red-600 shadow-xl shadow-red-900 px-4 py-2 mx-auto my-6 text-center uppercase font-semibold w-3/5 rounded-lg'>
          <p>El Subrack consultado se encuentra eliminado. Aun Puede volver a habilitarlo/restaurarlo</p>
        </div>
      )}
      <div className='flex items-center gap-3'>
        <h2 className='uppercase text-2xl font-extrabold text-white px-4 py-4'>
          <span className='text-blue-500'>Datos de </span>Placa
        </h2>
        <Link
          to={`/catalog/subrack/edit/${subrackId}`}
          className='bg-blue-600 text-center text-sm px-2 py-1 w-48 rounded-lg font-bold uppercase hover:bg-blue-800 hover:text-white'
        >
          Editar
        </Link>
      </div>
      <div className='flex gap-2'>
        <div className='flex flex-col'>
          <InfoSubrack data={querySubrack.data} />
          <div className='ml-4'>
            <BtnNavSubrack />
          </div>
        </div>
        <SlotsDetails slots={querySubrack.data.slots} />
      </div>
    </main>
  )
}
