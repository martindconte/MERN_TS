import { BtnNavVendor, FormVendor, Spinner, Table } from "../../../components"
import { useVendorMutation, useVendors } from "../../../hook";
import { VendorFormData } from "../../../types";

export const VendorView = () => {

    const { queryVendors } = useVendors({ enabled: true })
    const { mutationCreateVendor, mutationDeleteVendor } = useVendorMutation()

    const handleForm = async ( data: VendorFormData ) => {
        await mutationCreateVendor.mutateAsync( data )
    }

    return (
        <main className="flex-1 bg-gray-50 font-oswald">
            <h2 className='my-4 text-4xl uppercase font-bold text-center'>Proveedores / Vendors</h2>
            <div className="flex">
                <div className="basis-1/2 my-7 bg-gray-300 mx-4 rounded-lg h-fit">
                    <h3 className='uppercase text-center my-3 text-lg font-bold'>Registre un Nuevo Vendor</h3>
                    <FormVendor
                        onSubmit={handleForm}
                        buttonLabel='Registrar Vendor'
                        requiredFields
                    />
                </div>
                <div  className="basis-1/2 mx-4">
                    {
                        queryVendors.isLoading
                            ? <Spinner />
                            : (
                                <Table
                                    data={ queryVendors.data || [] }
                                    info="catalogVendor"
                                    fnDelete={ mutationDeleteVendor }
                                />
                            )
                    }
                </div>
            </div>
            <div className="w-1/2 mx-auto">
                <BtnNavVendor />
            </div>
        </main>
    )
}
