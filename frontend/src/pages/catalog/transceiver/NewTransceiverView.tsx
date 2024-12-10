import { FormTransceiver } from '../../../components'
import { BtnNavTransceiver } from '../../../components/catalog/transceiver/BtnNavTransceiver';
import { useTransceiverMutation } from '../../../hook'
import { TransceiverFormData } from '../../../types';

export const NewTransceiverView = () => {

    const { mutationCreateTransceiver } = useTransceiverMutation()

    const handleForm = async (data: TransceiverFormData) => {
        if( !data.bitsRates ) data.bitsRates = []
        await mutationCreateTransceiver.mutateAsync(data);
    };

    return (
        <main className="flex-1 bg-zinc-900">
            <h2 className="w-1/2 mx-auto text-3xl font-extrabold uppercase my-5 text-center text-white">
                Carga de <span className="text-red-600">Nuevo</span> Transceiver/Modulo
            </h2>
            <div className="w-1/3 mx-auto">
                <FormTransceiver
                    onSubmit={handleForm}
                    status={mutationCreateTransceiver.status}
                    buttonLabel='Crear Transceiver'
                    requiredFields
                />
            </div>
            <div className="w-3/4 mx-auto">
                <BtnNavTransceiver />
            </div>
        </main>
    )
}
