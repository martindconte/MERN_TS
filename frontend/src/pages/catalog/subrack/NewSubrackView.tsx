import { FormSubrack } from '../../../components'
import { useSubrackMutation } from '../../../hook'
import { SubrackFormData } from '../../../types/catalog/subrackTypes'

export const NewSubrackView = () => {
  const { mutationCreateSubrack } = useSubrackMutation()

  const handleForm = async (data: SubrackFormData) => {
    console.log(data)
    await mutationCreateSubrack.mutateAsync(data)
  }

  return (
    <main className='flex-1 bg-yellow-50'>
      <h2 className='w-1/2 mx-auto text-3xl font-extrabold uppercase my-5 text-center'>
        Creacion de <span className='text-red-700'>Nuevo</span> Subrack
      </h2>

      <FormSubrack
        onSubmit={handleForm}
        buttonLabel='Crear Subrack'
        status={mutationCreateSubrack.status}
        requiredFields
      />
    </main>
  )
}
