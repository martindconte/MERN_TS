import { BtnNavSignal, FormSignal, Spinner, TableV2 } from '../../../components'
import { useSignalMutation, useSignals } from '../../../hook'
import { SignalFormData } from '../../../types'

//TODO: Implementar la tabla de señales. ASOCIAR BITS RATES a las señales
export const SignalView = () => {
  const { querySignals } = useSignals({})
  const { mutationCreateSignal } = useSignalMutation()

  const handleSubmit = async (formData: SignalFormData) => {
    mutationCreateSignal.mutateAsync(formData)
  }

  if (querySignals.isLoading) return <Spinner />
  if (!querySignals.data)
    return (
      <div className='flex-1 bg-stone-900 text-4xl text-white font-oswald uppercase font-bold text-center px-3 py-4'>No se Encontraron datos</div>
    )

  return (
    <main className='flex-1 bg-neutral-800 text-white font-roboto_condensed'>
      <h2 className='my-4 text-4xl uppercase font-bold text-center'>Señales / Paths</h2>
      <div className='flex'>
        <div className='basis-1/3 mx-9 bg-gray-50 text-black rounded-lg h-fit'>
          <h3 className='uppercase text-center my-3 text-lg font-bold'>Registre una Nueva Señal</h3>
          <FormSignal onSubmit={handleSubmit} buttonLabel='Crear Señal' status={mutationCreateSignal.status} />
        </div>
        <div className='basis-2/3 mx-4'>{querySignals.isLoading ? <Spinner /> : <TableV2 data={querySignals.data || []} info='catalogSignal' />}</div>
      </div>
      <BtnNavSignal />
    </main>
  )
}
