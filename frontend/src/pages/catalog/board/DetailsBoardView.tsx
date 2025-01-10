import { Link, useLocation, useParams } from 'react-router-dom'
import { useBoard } from '../../../hook'
import { BtnNavBoard, Spinner } from '../../../components'
import { BitsRatesBoars, InfoBoard, PortsBoardDetails } from '../../../components/catalog/baord/details'

export const DetailsBoardView = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const { boardId } = useParams<{ boardId: string }>()
  const { queryBoard } = useBoard({ id: boardId!, searchParams: search })

  console.log(queryBoard.data);

  if (queryBoard.isError)
    return (
      <div className='flex-1 bg-stone-950 text-white uppercase text-2xl font-bold py-6 px-4 text-center'>
        <p className='mb-6'>Error al Cargar la informacion de Las Placas</p>
        <span className='material-symbols-outlined text-red-600 text-9xl font-bold'>error</span>
      </div>
    )

  if (queryBoard.isLoading) return <Spinner />

  return (
    <main className='flex-1 bg-stone-900 font-roboto'>
      {queryParams.get('isDeleted') === 'true' && (
        <div className='text-white bg-red-600 shadow-xl shadow-red-900 px-4 py-2 mx-auto my-6 text-center uppercase font-semibold w-3/5 rounded-lg'>
          <p>La Placa consultada se encuentra eliminada. Aun Puede volver a habilitarla</p>
        </div>
      )}
      <div className='flex items-center gap-3'>
        <h2 className='uppercase text-2xl font-extrabold text-white px-4 py-4'>
          <span className='text-blue-500'>Datos de </span>Placa
        </h2>
        <Link
          to={`/catalog/board/edit/${boardId}`}
          className='bg-blue-600 text-center text-sm px-2 py-1 w-48 rounded-lg font-bold uppercase hover:bg-blue-800 hover:text-white'
        >
          Editar
        </Link>
      </div>
      <div className='flex gap-2 mx-4'>
        {queryBoard.data && (
          <>
            <div className='w-96 flex flex-col gap-3'>
              <InfoBoard data={queryBoard.data} />
              <BitsRatesBoars data={queryBoard.data} />
              <BtnNavBoard />
            </div>
            <PortsBoardDetails data={queryBoard.data} />
          </>
        )}
      </div>
    </main>
  )
}
