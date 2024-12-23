import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useBoard, useBoardMutation } from '../../../hook'
import { BtnNavBoard, FormBoard, Spinner } from '../../../components'
import { BoardFormData } from '../../../types'

export const EditBoardView = () => {
  const { boardId } = useParams<{ boardId: string }>()
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const navigate = useNavigate()

  if (!boardId) {
    return (
      <div className='flex-1 bg-stone-950 text-white uppercase text-2xl font-bold py-6 px-4 text-center'>
        <p className='mb-6'>Error al Cargar la informacion de La Placa</p>
        <span className='material-symbols-outlined text-red-600 text-9xl font-bold'>error</span>
      </div>
    )
  }

  const { queryBoard } = useBoard({ id: boardId, searchParams: search })
  const { mutationUpdateBoard } = useBoardMutation()

  const handleForm = async (formData: BoardFormData) => {
    const data = await mutationUpdateBoard.mutateAsync({ id: boardId!, formData, searchParams: search })
    if (data) navigate(-1)
  }

  if (queryBoard.isLoading) return <Spinner />
  if (queryBoard.isError)
    return (
      <p className='flex-1 bg-gray-900 text-white text-center font-roboto_condensed text-2xl font-extrabold uppercase py-10'>
        Placas no Encontradas...
      </p>
    )
  if (!queryBoard.data)
    return (
      <div className='flex-1 bg-stone-900 text-4xl text-white font-oswald uppercase font-bold text-center px-3 py-4'>No se Encontraron datos</div>
    )

  return (
    <main className='flex-1 bg-stone-800'>
      {queryParams.get('isDeleted') === 'true' && (
        <div className='text-white bg-red-600 shadow-xl shadow-red-900 px-4 py-2 mx-auto my-6 text-center uppercase font-semibold w-3/5 rounded-lg'>
          <p>La Placa a Editar se encuentra eliminada</p>
          <p>
            Modifique sus datos o restaure a activo. No debera haber registrado una placa actualmente con su valor de Part Number y Board Name
            registrado!
          </p>
        </div>
      )}
      <h2 className='w-1/2 mx-auto text-3xl font-extrabold uppercase my-5 text-center text-white'>
        <span className='text-green-400 border border-emerald-700 px-2 py-1'>Editar / Modificar</span> Placa
        {/* <span className="text-green-400 underline underline-offset-8">Editar / Modificar</span> Placa */}
      </h2>

      <FormBoard
        onSubmit={handleForm}
        defaultValues={{ ...queryBoard.data, vendor: queryBoard.data.vendor.id }}
        buttonLabel='Modificar Placa'
        requiredFields
        isDeleted={queryParams.get('isDeleted') === 'true'}
      />
      <div className='w-1/4 mx-auto'>
        <BtnNavBoard />
      </div>
    </main>
  )
}
