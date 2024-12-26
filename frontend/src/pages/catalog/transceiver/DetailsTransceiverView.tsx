import { Link, useLocation, useParams } from 'react-router-dom';
import { BitsRatesTransceiver, BtnNavTransceiver, InfoTransceiver, Spinner } from '../../../components';
import { useTransceiver } from '../../../hook';

export const DetailsTransceiverView = () => {

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const { transceiverId } = useParams<{ transceiverId: string }>();
  const { queryTransceiver } = useTransceiver({ id: transceiverId!, searchParams: search })

  if (queryTransceiver.isLoading) return <Spinner />;
  if (!queryTransceiver.data) return <div className="flex-1 bg-stone-900 text-4xl text-white font-oswald uppercase font-bold text-center px-3 py-4">No se Encontraron datos</div>;

  return (

    <main className="flex-1 bg-stone-900 font-roboto">
      {
        queryParams.get('isDeleted') === 'true' &&
        <div className="text-white bg-red-600 shadow-xl shadow-red-900 px-4 py-2 mx-auto my-6 text-center uppercase font-semibold w-3/5 rounded-lg">
          <p>El Transceiver consultado se encuentra eliminado. Aun Puede volver a habilitarlo</p>
        </div>
      }
      <h2 className="uppercase text-2xl font-extrabold text-white px-4 py-4">
        <span className="text-blue-500">Datos de </span>Transceiver/Modulo:
      </h2>
      <div className="flex align-top font-oswald gap-3">
          <InfoTransceiver
            data={queryTransceiver.data}
          />
          <BitsRatesTransceiver
            data={queryTransceiver.data}
          />
        <div className="h-fit flex gap-4">
          <Link
            to={`/catalog/transceiver/edit/${transceiverId}`}
            className="bg-blue-600 text-center text-sm px-2 py-1 w-48 rounded-lg font-bold uppercase hover:bg-blue-800 hover:text-white">Editar</Link>
        </div>
      </div>
      <div className='w-1/4 mx-auto'>
        <BtnNavTransceiver />
      </div>
    </main>
  );
}
