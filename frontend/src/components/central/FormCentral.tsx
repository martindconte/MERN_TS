import { useForm } from "react-hook-form";
import { FormBodyCentral } from "./FormBodyCentral";
import { CentralFormData } from "../../types";
import { MutationStatus } from "@tanstack/react-query";

interface FormCentralProps {
    onSubmit: (data: CentralFormData) => void,
    status: MutationStatus,
    requiredFields: boolean,    
}

export const FormCentral = ({ onSubmit, status, requiredFields }: FormCentralProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            centralName: '',
            codeName: '',
            siteCode: '',
            owner: '',
            status: true,
            provinceName: '',
            districtName: '',
            localityName: '',
            address: '',
            latitude: 0,
            longitude: 0,
            description: '',
            observations: '',
        } as CentralFormData,
    });

    return (
        <form
            className="bg-white px-3 py-2 rounded-lg font-roboto"
            onSubmit={handleSubmit( onSubmit )}
            noValidate
        >
            <FormBodyCentral
                register={ register }
                errors={ errors }
                requiredFields={ requiredFields }
            />

            <button
                type='submit'
                className='text-sm font-bold bg-emerald-700 text-white py-2 w-full my-2 rounded-lg uppercase hover:bg-emerald-400 hover:text-black hover:border hover:border-black'
                disabled={ status === 'pending' }
            >{ status === 'pending' ? 'Creando...' : 'Crear Central' }</button>
            <button
                type='reset'
                className={`text-sm font-bold bg-blue-700 text-white py-2 w-full my-2 rounded-lg uppercase hover:bg-blue-400 hover:text-black hover:border hover:border-black`}
                disabled={ status === 'pending' }
            >Limpiar</button>
        </form>
    );
};
