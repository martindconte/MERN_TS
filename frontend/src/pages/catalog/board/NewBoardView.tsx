import { BtnNavBoard, FormBoard } from '../../../components'
import { useBoardMutation } from '../../../hook'
import { BoardFormData } from '../../../types'

export const NewBoardView = () => {

  const { mutationCreateBoard } = useBoardMutation()

  const handleForm = async (formData: BoardFormData) => {
    await mutationCreateBoard.mutateAsync(formData)
  }

  return (
    <main className="flex-1 bg-stone-800">
      <h2 className="w-1/2 mx-auto text-3xl font-extrabold uppercase my-5 text-center text-white">
        Carga de <span className="text-blue-600">Nueva</span> Placa
      </h2>

      <FormBoard
        onSubmit={handleForm}
        status={mutationCreateBoard.status}
        buttonLabel='Crear Placa'
        requiredFields
      />

      <div className='w-1/4 mx-auto'>
        <BtnNavBoard />
      </div>
    </main>
  )
};