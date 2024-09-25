import { Link, useParams } from 'react-router-dom';
import { useCentral } from '../../hook';
import { BtnNavCentral, Spinner } from '../../components';
import { keyToShowInTable } from '../../components/shared/table/keysToShowInTable';

export const DescriptionCentralView = () => {

    const centralKeys = keyToShowInTable["central"];
    const { centralId } = useParams<{ centralId: string }>();
    const { queryCentral } = useCentral({ id: centralId! });

    if (queryCentral.isLoading) return <Spinner />;

    if (!queryCentral.data) return <div className="flex-1 bg-stone-900 text-4xl text-white font-oswald uppercase font-bold text-center px-3 py-4">No se Encontraron datos</div>;

    return (
        <main className="flex-1 bg-stone-900 font-roboto">
            <h2 className="uppercase text-2xl font-extrabold text-white px-4 py-4">
                <span className="text-blue-500">Datos de </span>Central:
            </h2>
            <div className="flex align-top">
                <div className="bg-gray-50 w-fit px-3 py-4 mx-4 rounded-lg font-oswald text-sm space-y-2">
                    {
                        centralKeys.map(({ key, label }) => {
                            const value = queryCentral.data![key as keyof typeof queryCentral.data];
                            return (
                                <p key={key}>
                                    <strong className="uppercase mr-1">{label}:</strong> {value instanceof Date ? value.toLocaleString() : value?.toString()}
                                </p>
                            );
                        })
                    }
                </div>
                <div className="h-fit flex gap-4">
                    <Link
                        to={`/central/edit/${centralId}`}
                        className="bg-blue-600 text-center px-2 py-1 w-48 rounded-lg font-roboto_condensed font-bold uppercase hover:bg-blue-800 hover:text-white">Editar</Link>
                    {/* <Link
                        to={`/central/edit/${centralId}`}
                        className="bg-red-600 text-center px-2 py-1 w-48 rounded-lg font-roboto_condensed font-bold uppercase hover:bg-red-800 hover:text-white">Eliminar</Link> */}
                </div>
            </div>
            <div className='w-1/4 mx-auto'>
                <BtnNavCentral />
            </div>
            <div className="text-white text-center">
                <p>TODO: Mostar en MAPA</p>
            </div>
        </main>
    );
};
