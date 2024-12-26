import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSubrack, useSubrackMutation } from '../../../hook'
import { FormSubrack, Spinner } from '../../../components'
import { SubrackFormData } from '../../../types'

export const EditSubrackView = () => {
  const { subrackId } = useParams<{ subrackId: string }>()
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const navigate = useNavigate()

  const { querySubrack } = useSubrack({ id: subrackId!, searchParams: search })
  const { mutationUpdateSubrack } = useSubrackMutation()

   const handleSubmit = async (formData: SubrackFormData) => {
    console.log(formData)
    const data = await mutationUpdateSubrack.mutateAsync({ id: subrackId!, formData, searchParams: search })
    if (data) navigate(-1)
  }

  console.log(querySubrack.data);


  if (!subrackId) {
    return (
      <div className='flex-1 bg-stone-950 text-white uppercase text-2xl font-bold py-6 px-4 text-center'>
        <p className='mb-6'>Error al Cargar la informacion de La Placa</p>
        <span className='material-symbols-outlined text-red-600 text-9xl font-bold'>error</span>
      </div>
    )
  }

  if (querySubrack.isLoading) return <Spinner />
  if (querySubrack.isError)
    return (
      <p className='flex-1 bg-gray-900 text-white text-center font-roboto_condensed text-2xl font-extrabold uppercase py-10'>
        Placas no Encontradas...
      </p>
    )
  if (!querySubrack.data)
    return (
      <div className='flex-1 bg-stone-900 text-4xl text-white font-oswald uppercase font-bold text-center px-3 py-4'>No se Encontraron datos</div>
    )

  return (
    <main className='flex-1 bg-zinc-900 text-white'>
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
        <span className='text-green-400 border border-emerald-700 px-2 py-1'>Editar / Modificar</span> Subrack
      </h2>

      <FormSubrack
        buttonLabel='Modificar Subrack'
        onSubmit={handleSubmit}
        defaultValues={{
          ...querySubrack.data,
          vendor: querySubrack.data.vendor.id,
          slots: querySubrack.data.slots.map(slot => ({ ...slot, boards: slot.boards?.map(board => board.id) || [] })),
        }}
        status={mutationUpdateSubrack.status}
      />
    </main>
  )
}
