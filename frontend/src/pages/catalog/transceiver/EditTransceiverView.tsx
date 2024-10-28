import { useNavigate, useParams } from 'react-router-dom';
import { BtnNavTransceiver, FormTransceiver, Spinner } from '../../../components';
import { useTransceiver, useTransceiverMutation } from '../../../hook';
import { TransceiverFormData } from '../../../types';

export default function EditTransceiverView() {

  const navigate = useNavigate()

  const { transceiverId } = useParams<{ transceiverId: string }>();

  const { queryTransceiver } = useTransceiver({ id: transceiverId! });
  const { mutationUpdateTransceiver } = useTransceiverMutation()

  const handleForm = async (formData: TransceiverFormData) => {
    const data = await mutationUpdateTransceiver.mutateAsync({ id: transceiverId!, formData })
    if (data) navigate(-1)
  };

  if (queryTransceiver.isLoading) return <Spinner />;
  if (!queryTransceiver.data) return <div className="flex-1 bg-stone-900 text-4xl text-white font-oswald uppercase font-bold text-center px-3 py-4">No se Encontraron datos</div>;

  //todo: SOLUCIONAR EL PROBLEMA DE CARGAR EL VENDOR EN EL FORMULARIO... 
  return (
    <main className="flex-1 bg-stone-900 px-2 py-4">
    <h2 className="uppercase text-2xl font-extrabold text-center text-white"><span className="text-blue-500">Modifica / Actualiza</span> los datos del Transceiver/Modulo:</h2>
    <h3 className="text-yellow-100 text-center py-3 text-lg font-bold">
      <strong className="text-blue-400">Part Number:</strong> <span>{queryTransceiver.data.partNumber}</span>{' // '}
      <strong className="text-blue-400">Model:</strong> <span>{queryTransceiver.data.model}</span>{' // '}
      <strong className="text-blue-400">Vendor:</strong> <span>{queryTransceiver.data.vendor.vendorName}</span>{' // '}
      <strong className="text-blue-400">Descripción:</strong> <span>{queryTransceiver.data.description}</span>
    </h3>
    <div className="w-1/2 mx-auto">
      <FormTransceiver
        onSubmit={ handleForm }
        buttonLabel='Editar Transceiver'
        // defaultValues={{...queryTransceiver.data, vendor: { id: queryTransceiver.data.vendor.id }}}
        defaultValues={ queryTransceiver.data}
        requiredFields
      />
      <BtnNavTransceiver />
    </div>
  </main>
  );
}
