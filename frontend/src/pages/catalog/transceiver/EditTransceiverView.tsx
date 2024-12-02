import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BtnNavTransceiver, FormTransceiver, Spinner } from '../../../components';
import { useTransceiver, useTransceiverMutation } from '../../../hook';
import { TransceiverFormData } from '../../../types';

export default function EditTransceiverView() {

  const navigate = useNavigate()
  const { transceiverId } = useParams<{ transceiverId: string }>();

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)

  const { queryTransceiver } = useTransceiver({ id: transceiverId!, searchParams: search });
  const { mutationUpdateTransceiver } = useTransceiverMutation()

  const handleForm = async (formData: TransceiverFormData) => {
    console.log('formData', formData);
    const data = await mutationUpdateTransceiver.mutateAsync({ id: transceiverId!, formData, searchParams: search })
    if (data) navigate(-1)
  };

  if (queryTransceiver.isLoading) return <Spinner />;
  if (!queryTransceiver.data) return <div className="flex-1 bg-stone-900 text-4xl text-white font-oswald uppercase font-bold text-center px-3 py-4">No se Encontraron datos</div>;

  //todo: SOLUCIONAR EL PROBLEMA DE CARGAR EL VENDOR EN EL FORMULARIO... 
  return (
    <main className="flex-1 bg-stone-900 px-2 py-4">
      <h2 className="uppercase text-2xl font-extrabold text-center text-white"><span className="text-blue-800">Modifica / Actualiza</span> los datos del Transceiver/Modulo:</h2>
      <h3 className="text-white text-center py-3 font-roboto_condensed">
        <strong className="text-blue-400">Part Number:</strong> <span>{queryTransceiver.data.partNumber}</span>{' // '}
        <strong className="text-blue-400">Model:</strong> <span>{queryTransceiver.data.modelName}</span>{' // '}
        <strong className="text-blue-400">Vendor:</strong> <span>{queryTransceiver.data.vendor.vendorName}</span>{' // '}
        <strong className="text-blue-400">Descripción:</strong> <span>{queryTransceiver.data.description}</span>
      </h3>
      {
        queryParams.get('isDeleted') === 'true' && <div className="bg-red-400 shadow-xl shadow-red-900 px-4 py-2 mx-auto my-6 text-center uppercase font-semibold w-3/5 rounded-lg">
          <p>El Transiver consultado se encuentra eliminado</p>
          <p>Modifique sus datos o restaure a activo. No debera haber registrado un transceiver actualmente con su valor de Part Number</p>
        </div>
      }
      <div className="w-1/2 mx-auto">
        <FormTransceiver
          onSubmit={handleForm}
          buttonLabel='Editar Transceiver'
          defaultValues={{ ...queryTransceiver.data, vendor: queryTransceiver.data.vendor.id }}
          requiredFields
          isDeleted={queryParams.get('isDeleted') === 'true'}
        />
        <BtnNavTransceiver />
      </div>
    </main>
  );
}
