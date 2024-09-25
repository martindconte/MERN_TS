import { useNavigate, useParams } from "react-router-dom"
import { useVendor, useVendorMutation } from "../../../hook"
import { BtnNavVendor, FormVendor, Spinner } from "../../../components";
import { VendorFormData } from "../../../types";

export const EditVendorView = () => {

    const navigate = useNavigate()
    const { vendorId } = useParams<{ vendorId: string }>();

    const { queryVendor } = useVendor({ vendorId: vendorId! });
    const { mutationUpdateVendor } = useVendorMutation()

    const handleForm = async ( formData: VendorFormData ) => {
        console.log(formData);
        const data = await mutationUpdateVendor.mutateAsync({ id: vendorId!, formData } )
        if( data ) return navigate(-1)
    }

    if (queryVendor.isLoading) return <Spinner />;
    if (queryVendor.isError) return <p className="flex-1 bg-gray-900 text-white text-center font-roboto_condensed text-2xl font-extrabold uppercase py-10">Vendor no Encontrado...</p>;

    return (
        <main className="flex-1 bg-gray-50 px-2 py-4 text-black font-roboto">
            <h2 className="uppercase text-2xl font-extrabold text-center"><span className="text-red-500">Modifica / Actualiza</span> los datos de la Central:</h2>
            <h3 className="text-center py-3 text-lg font-bold">
                <strong className="text-blue-800 uppercase">Vendor: </strong><span>{queryVendor.data?.vendorName}</span>{' '}
                <strong className="text-blue-800 uppercase">Origen: </strong><span>{queryVendor.data?.country}</span>{' '}
                <strong className="text-blue-800 uppercase">Observaciones: </strong><span>{queryVendor.data?.observation}</span>
            </h3>
            <div className="w-1/2 mx-auto">
                {
                    queryVendor.data && <FormVendor
                        onSubmit={handleForm}
                        buttonLabel='Editar Central'
                        defaultValues={queryVendor.data}
                        requiredFields
                    />
                }
                <BtnNavVendor />
            </div>
        </main>
    )
}
