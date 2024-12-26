import { Link } from 'react-router-dom'
import { BtnNavVendor, FormVendor, Spinner, /* Table, */ TableV2 } from '../../../components'
import { useVendorMutation, useVendors } from '../../../hook'
import { VendorFormData, VendorType } from '../../../types'

export const VendorView = () => {
  const { queryVendors } = useVendors({ enabled: true })
  const { mutationCreateVendor, mutationDeleteVendor } = useVendorMutation()

  const handleForm = async (data: VendorFormData) => {
    await mutationCreateVendor.mutateAsync(data)
  }

  const handleDelete = async (id: VendorType['id']) => {
    return await mutationDeleteVendor.mutateAsync(id)
  }

  return (
    <main className='flex-1 bg-gray-50 font-oswald'>
      <h2 className='my-4 text-4xl uppercase font-bold text-center'>
        Proveedores / Vendors
      </h2>
      <div className='flex'>
        <div className='flex flex-col gap-3'>
          <div className='basis-1/2 my-7 bg-gray-300 mx-4 rounded-lg h-fit'>
            <h3 className='uppercase text-center my-3 text-lg font-bold'>
              Registre un Nuevo Vendor
            </h3>
            <FormVendor
              onSubmit={handleForm}
              buttonLabel='Registrar Vendor'
              requiredFields
              status={mutationCreateVendor.status}
            />
          </div>
          <Link
            to='deleted'
            className='bg-red-500 w-fit mx-auto px-4 py-2 rounded-lg text-white shadow-xl shadow-red-800 hover:bg-red-900 hover:shadow-red-950'
          >
            Vendors Eliminados
          </Link>
        </div>
        <div className='basis-1/2 mx-4'>
          {queryVendors.isLoading ? (
            <Spinner />
          ) : (
            <TableV2
              data={queryVendors.data || []}
              info='catalogVendor'
              fnDelete={handleDelete}
            />
            // <Table
            //   data={queryVendors.data || []}
            //   info='catalogVendor'
            //   fnDelete={handleDelete}
            // />
          )}
        </div>
      </div>
      <div className='w-1/2 mx-auto'>
        <BtnNavVendor />
      </div>
    </main>
  )
}
