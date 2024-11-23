import { useParams } from 'react-router-dom';
import { useBoard } from '../../../hook';
import { BtnNavBoard, Spinner } from '../../../components';
import { BitsRatesBoars, InfoBoard, PortsBoardDetails } from '../../../components/catalog/baord/details';

export const DetailsBoardView = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { queryBoard } = useBoard({ id: boardId! });

  if (queryBoard.isError)
    return (
      <div className="flex-1 bg-stone-950 text-white uppercase text-2xl font-bold py-6 px-4 text-center">
        <p className="mb-6">Error al Cargar la informacion de Las Placas</p>
        <span className="material-symbols-outlined text-red-600 text-9xl font-bold">error</span>
      </div>
    );

  if (queryBoard.isLoading) return <Spinner />;

  return (
    <main className="flex-1 bg-stone-900 font-roboto">
      <h2 className="uppercase text-2xl font-extrabold text-white px-4 py-4">
        <span className="text-blue-500">Datos de </span>Placa
      </h2>
      <div className="flex gap-2 mx-4">
        {queryBoard.data && (
          <>
            <div className="w-96 flex flex-col gap-3">
              <InfoBoard data={queryBoard.data} />
              <BitsRatesBoars data={queryBoard.data} />
              <BtnNavBoard />
            </div>
            <PortsBoardDetails data={queryBoard.data} />
          </>
        )}
      </div>
    </main>
  );
};
