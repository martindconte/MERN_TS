import { useMemo, useState } from 'react'
import { BtnNavVendor, Spinner, Table } from '../../../components'
import { useVendorMutation, useVendors } from '../../../hook'
import { VendorDeletedType, VendorType } from '../../../types'

export const DeletedVendorsView = () => {

  const [filter, setFilter] = useState<string>('');

  const { queryVendorsDeleted } = useVendors({});
  const { mutationPermanentlyDeleteVendor } = useVendorMutation()

  const filteredVendor: VendorDeletedType = useMemo(() => {
    return {
      vendors: queryVendorsDeleted.data?.vendors.filter(vendor => vendor.vendorName.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) || [],
      transceivers: queryVendorsDeleted.data?.transceivers.filter(transceiver => transceiver.vendor.vendorName?.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) || [],
      boards: queryVendorsDeleted.data?.boards.filter(board => board.vendor.vendorName?.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) || [],
    }
  }, [filter, queryVendorsDeleted.data]);

  const handlePermanentlyDeleteVendor = async ( id: VendorType['id'] ) => {
    await mutationPermanentlyDeleteVendor.mutateAsync( id )
  }

  if (queryVendorsDeleted.isError) return <p>Error al Cargar la informacion de Los Vendors Eliminados</p>

  return (
    <main className="flex-1 bg-gray-300 font-oswald">
      <div className='flex items-start gap-6 px-4 my-6'>
        <h2 className='basis-1/2 text-4xl uppercase font-bold text-right'>Proveedores / Vendors <span className='text-red-500'>Eliminados</span></h2>
        <h3 className='basis-1/2 text-lg uppercase font-bold text-left'>Verifica y Limpia los Registros de Proveedores que aun se encuentran asociados a distintos equipamientos</h3>

      </div>
      {
        queryVendorsDeleted.isLoading
          ? <Spinner />
          : queryVendorsDeleted.data &&
          <>
            <div className='font-roboto text-sm flex items-center justify-center gap-4 bg-emerald-300 w-fit mx-auto px-10 py-2 rounded-md'>
              <p className='uppercase bg-emerald-50 px-3 py-2 rounded-md'>Cantidad de Vendor Eliminados: {queryVendorsDeleted.data?.vendors.length}</p>
              <div className='bg-emerald-50 px-3 py-1 rounded-md'>
                <label htmlFor='filterVendor'>Filtrar Vendor</label>
                <input
                  className='mx-3 px-2 py-1 border border-gray-400 rounded-md outline-none'
                  type="text"
                  name="filterVendor"
                  id="filterVendor"
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                />
              </div>
            </div>
            <div className='border border-gray-600 mx-3 mt-4 text-center rounded-lg bg-gray-50 px-3 py-2 '>
              <p className='uppercase text-xl font-bold font-roboto underline decoration-red-500 underline-offset-4'>Vendor Eliminados</p>
              <Table
                data={filteredVendor.vendors}
                info='catalogVendor'
                path='catalog/vendor'
                fnDelete={ handlePermanentlyDeleteVendor }
              />
            </div>
            <div className='border border-gray-600 mx-3 mt-4 text-center rounded-lg bg-gray-50 px-3 py-2 '>
              <p className='uppercase text-xl font-bold font-roboto underline decoration-red-500 underline-offset-4'>Transceivers Eliminados</p>
              <Table
                data={filteredVendor.transceivers}
                info='catalogTransceiver'
                path='catalog/transceiver'
              />
            </div>
            <div className='border border-gray-600 mx-3 mt-4 text-center rounded-lg bg-gray-50 px-3 py-2 '>
              <p className='uppercase text-xl font-bold font-roboto underline decoration-red-500 underline-offset-4'>Placas Eliminadas</p>
              <Table
                data={filteredVendor.boards}
                info='catalogBoard'
                path='catalog/board'
              />
            </div>
          </>
      }
      <div className='w-1/2 mx-auto'>
        <BtnNavVendor />
      </div>
    </main>
  )
}

