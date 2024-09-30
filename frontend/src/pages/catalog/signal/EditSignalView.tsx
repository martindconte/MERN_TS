import { useParams } from 'react-router-dom'
import { useSignal } from '../../../hook';
import { BtnNavSignal, FormSignal, Spinner } from '../../../components';
import { SignalFormData } from '../../../types';

export const EditSignalView = () => {

    const { signalId } = useParams<{ signalId: string }>();

    const { querySignal } = useSignal({ id: signalId! })

    const handleForm = async ( formData: SignalFormData ) => {
        console.log(formData);
    }

    if (querySignal.isLoading) return <Spinner />;
    if (querySignal.isError) return <p className="flex-1 bg-gray-900 text-white text-center font-roboto_condensed text-2xl font-extrabold uppercase py-10">Señal no Encontrada...</p>;

    return (
        <main className="flex-1">
            <h2 className="uppercase text-2xl font-extrabold text-center"><span className="text-red-500">Modifica / Actualiza</span> Las Señales Registradas:</h2>
            <h3 className="text-center py-3 text-lg font-bold">
                <strong className="text-blue-800 uppercase">Señal: </strong><span>{querySignal.data?.type}</span>{' '}
                <strong className="text-blue-800 uppercase">SubTipo: </strong><span>{querySignal.data?.subType}</span>{' '}
            </h3>
            <div className="w-1/2 mx-auto">
                {
                    querySignal.data && <FormSignal
                        onSubmit={handleForm}
                        buttonLabel='Editar Señal'
                        defaultValues={querySignal.data}
                        requiredFields
                    />
                }
                <BtnNavSignal />
            </div>
        </main>
    )
}
