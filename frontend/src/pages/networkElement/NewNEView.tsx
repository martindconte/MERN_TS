import { FormNE } from '../../components/network-element'
import { useNetworkElementMutation } from '../../hook/networkElement/useNetworkElementMutation'
import { NEFormData } from '../../types'

export const NewNEView = () => {

  const { mutationCreateNetworkElement } = useNetworkElementMutation()

  const handleForm = async (formData: NEFormData) => {
    console.log('Desde NewNEWView', formData);
    await mutationCreateNetworkElement.mutateAsync(formData);
  }

  return (
    <main className='flex-1 bg-neutral-900 text-white dark:bg-white'>
      <h2 className='mx-16 text-3xl font-extrabold uppercase my-5 text-center'>
        Creacion de <span className='text-red-700'>Nuevo</span> <span className='text-yellow-300'>Equipo </span>/ Network Element / NE
      </h2>
      <FormNE onSubmit={handleForm} buttonLabel='Crear NE' requiredFields />
    </main>
  )
}