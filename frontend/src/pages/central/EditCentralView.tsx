import { useNavigate, useParams } from 'react-router-dom';
import { BtnNavCentral, FormCentral, Spinner } from '../../components'
import { useCentral, useCentralMutation } from '../../hook';
import { CentralFormData } from '../../types';

export const EditCentralView = () => {

  const navigate = useNavigate()

  const { centralId } = useParams<{ centralId: string }>();

  const { queryCentral } = useCentral({ id: centralId! });
  const { mutationUpdateCentral } = useCentralMutation();

  const handleForm = async (formData: CentralFormData) => {
    const data = await mutationUpdateCentral.mutateAsync({ id: centralId!, formData })
    if (data) navigate(-1)
  };

  if (queryCentral.isLoading) return <Spinner />;

  return (
    <main className="flex-1 bg-stone-900 px-2 py-4">
      <h2 className="uppercase text-2xl font-extrabold text-center text-white"><span className="text-blue-500">Modifica / Actualiza</span> los datos de la Central:</h2>
      <h3 className="text-yellow-100 text-center py-3 text-lg font-bold">
        <strong className="text-blue-400">Central:</strong> <span>{queryCentral.data?.centralName}</span>{' // '}
        <strong className="text-blue-400">Codigo:</strong> <span>{queryCentral.data?.codeName}</span>{' // '}
        <strong className="text-blue-400">Emplazamiento:</strong> <span>{queryCentral.data?.siteCode}</span>
      </h3>
      <div className="w-1/2 mx-auto">
        <FormCentral
          onSubmit={handleForm}
          buttonLabel='Editar Central'
          defaultValues={queryCentral.data}
          requiredFields
        />
        <BtnNavCentral />
      </div>
    </main>
  )
}
