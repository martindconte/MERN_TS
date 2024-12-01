import { useMemo, useState } from 'react';
import { Spinner, Table } from '../../../components';
import { useTransceiverMutation, useTransceiversDeleted } from '../../../hook'
import { TransceiversDeletedType, TransceiverType } from '../../../types';

export const DeletedTransceiversView = () => {

  const [filterVendor, setFilterVendor] = useState<string>('');
  const [filterPartNumber, setFilterPartNumber] = useState<string>('')

  const { queryTransceiversDeleted } = useTransceiversDeleted({});
  const { mutationPermanentlyDeleteTransceiver } = useTransceiverMutation();

  const filteredTransceiver: TransceiversDeletedType = useMemo(() => {
    return {
      transceivers: queryTransceiversDeleted.data?.transceivers.filter(transceiver =>
        transceiver.vendor.vendorName?.toLocaleLowerCase().includes(filterVendor.toLocaleLowerCase()) &&
        transceiver.partNumber.toLocaleLowerCase().includes(filterPartNumber.toLocaleLowerCase())
      ) || [],
      boards: queryTransceiversDeleted.data?.boards.filter(board =>
        board.vendor.vendorName?.toLocaleLowerCase().includes(filterVendor.toLocaleLowerCase()) &&
        board.ports.filter(port => port.equipments.filter(eq => eq.partNumber.toLocaleLowerCase() === filterPartNumber.toLocaleLowerCase()))
      ) || [],
    };
  }, [filterVendor, filterPartNumber, queryTransceiversDeleted.data]);

  const handlePermanentlyDeleteTransceiver = async (id: TransceiverType['id']) => {
    await mutationPermanentlyDeleteTransceiver.mutateAsync(id);
  };

  if (queryTransceiversDeleted.isError) return <p>Error al Cargar la informacion de Los Transceivers Eliminados</p>;

  return (
    <main className="flex-1 bg-gray-300 font-oswald">
      <div className='flex items-start gap-6 px-4 my-6 max-w-[1100px] mx-auto'>
        <h2 className='basis-1/2 text-4xl uppercase font-bold text-right'>Transceivers / Modulos / Pluggins <span className='text-red-500'>Eliminados</span></h2>
        <h3 className='basis-1/2 text-lg uppercase font-bold text-left'>Verifica y Limpia los Registros de tRANSCEIVERS / mODULOS que aun se encuentran asociados a distintos equipamientos</h3>
      </div>
      {
        queryTransceiversDeleted.isLoading
          ? <Spinner />
          : queryTransceiversDeleted.data &&
          <>
            <div className='font-roboto text-sm flex items-center justify-center gap-4 bg-emerald-300 w-3/4 mx-auto px-10 py-2 rounded-md'>
              <p className='uppercase bg-emerald-50 px-3 py-2 rounded-md basis-2/5'>Cantidad de Transceivers Eliminados: {queryTransceiversDeleted.data?.transceivers.length}</p>
              <div className='flex flex-col gap-3 bg-emerald-200 px-3 py-1 rounded-md basis-3/5'>
                <div className='flex items-center px-2 py-1 rounded-md bg-white text-right font-oswald'>
                  <label htmlFor='filterVendor' className='w-1/2 uppercase'>Filtrar Vendor</label>
                  <input
                    className='mx-3 px-2 py-1 border border-gray-400 rounded-md outline-none grow'
                    type="text"
                    name="filterVendor"
                    id="filterVendor"
                    value={filterVendor}
                    onChange={e => setFilterVendor(e.target.value)}
                  />
                </div>
                <div className='flex items-center px-2 py-1 rounded-md bg-white text-right font-oswald'>
                  <label htmlFor='filterPartNumber' className='w-1/2 uppercase'>Filtrar Part Number Transceiver</label>
                  <input
                    className='mx-3 px-2 py-1 border border-gray-400 rounded-md outline-none grow'
                    type="text"
                    name="filterPartNumber"
                    id="filterPartNumber"
                    value={filterPartNumber}
                    onChange={e => setFilterPartNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='border border-gray-600 mx-3 mt-4 text-center rounded-lg bg-gray-50 px-3 py-2 '>
              <p className='uppercase text-xl font-bold font-roboto underline decoration-red-500 underline-offset-4'>Transceivers Eliminados</p>
              <Table
                data={filteredTransceiver.transceivers}
                info='catalogTransceiver'
                path='catalog/transceiver'
                fnDelete={handlePermanentlyDeleteTransceiver}
              />
            </div>
            <div className='border border-gray-600 mx-3 mt-4 text-center rounded-lg bg-gray-50 px-3 py-2 '>
              <p className='uppercase text-xl font-bold font-roboto underline decoration-red-500 underline-offset-4'>Placas Con Transceivers Eliminados</p>
              <Table
                data={filteredTransceiver.boards}
                info='catalogBoard'
                path='catalog/board'
              // fnDelete={ handlePermanentlyDeleteTransceiver }
              />
            </div>
          </>
      }

    </main>
  )
}
