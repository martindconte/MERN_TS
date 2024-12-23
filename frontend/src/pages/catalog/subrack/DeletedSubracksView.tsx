import { useMemo, useState } from 'react'
import { useSubrackMutation, useSubracksDeleted } from '../../../hook'
import { SubracksDeletedType, SubrackType } from '../../../types'
import { Filters, HiddenComponent } from '../../../components'
import { TableV2 } from '../../../components/shared/table_v2/TableV2'

export const DeletedSubracksView = () => {
  const [filterVendor, setFilterVendor] = useState<string>('')
  const [filterPNSubrack, setFilterPNSubrack] = useState<string>('')
  const [filterSubrackType, setFilterSubrackType] = useState<string>('')
  const [filterSubrackFamily, setFilterSubrackFamily] = useState<string>('')
  const [showTableSubracks, setShowTableSubracks] = useState<boolean>(true)

  const { querySubracksDeleted } = useSubracksDeleted({})
  const { mutationPermanentlyDeleteSubrack } = useSubrackMutation()

  const filteredSubracks: SubracksDeletedType = useMemo(() => {
    return {
      subracks: querySubracksDeleted.data
        ? querySubracksDeleted.data.subracks.filter(
            subrack =>
              subrack.vendor.vendorName?.toLowerCase().includes(filterVendor.toLowerCase()) &&
              subrack.partNumber.toLowerCase().includes(filterPNSubrack.toLowerCase()) &&
              subrack.subrackType.toLowerCase().includes(filterSubrackType.toLowerCase()) &&
              subrack.subrackFamily.toLowerCase().includes(filterSubrackFamily.toLowerCase()),
          )
        : [],
      networkElements: 'TODO /// SUBRACKS...', // Puedes ajustar esto según sea necesario
    }
  }, [filterVendor, filterPNSubrack, filterSubrackType, filterSubrackFamily, querySubracksDeleted.data])

    const handlePermanentlyDeleteSubrack = async (id: SubrackType['id']) => {
      await mutationPermanentlyDeleteSubrack.mutateAsync(id);
    };

  return (
    <main className='flex-1 bg-neutral-900 font-oswald'>
      <div className='flex items-start gap-6 px-4 my-6 max-w-[1100px] mx-auto text-white'>
        <h2 className='basis-1/2 text-4xl uppercase font-bold text-right'>
          Subracks <span className='text-red-500'>Eliminados</span>
        </h2>
        <h3 className='basis-1/2 text-lg uppercase font-bold text-left'>
          Verifica y Limpia los Registros de Subracks que aun se encuentran asociados a distintos Networks Elements
        </h3>
      </div>

      <div className='font-roboto text-sm flex items-center justify-center gap-4 bg-emerald-300 w-3/4 mx-auto px-10 py-2 rounded-md'>
        <p className='uppercase bg-emerald-50 px-3 py-2 rounded-md basis-2/5'>
          Cantidad de Transceivers Eliminados: {querySubracksDeleted.data?.subracks.length || 'S/D'}
        </p>
        <HiddenComponent>
          <Filters
            vendorValue={filterVendor}
            onChangeVendor={setFilterVendor}
            PNValue={filterPNSubrack}
            onChangePN={setFilterPNSubrack}
            SubrackTypeValue={filterSubrackType}
            onChangeSubrackType={setFilterSubrackType}
            SubrackFamilyValue={filterSubrackFamily}
            onChangeSubrackFamily={setFilterSubrackFamily}
          />
        </HiddenComponent>
      </div>
      <div className='border border-gray-600 mx-3 mt-4 text-center rounded-lg bg-gray-50 px-3 py-2 '>
        <div className='flex gap-3 justify-center'>
          <p className='uppercase text-xl font-bold font-roboto underline decoration-red-500 underline-offset-4'>Subracks Eliminados</p>
          <button
            type='button'
            className={`flex items-center gap-2 px-3 py-1 rounded-lg ${ showTableSubracks ? 'bg-rose-800 text-white' : 'bg-amber-400' }`}
            onClick={() => setShowTableSubracks(prev => !prev)}
          >{showTableSubracks
            ? <>Ocultar Resultados <span className='material-symbols-outlined'>visibility_off</span></>
            : <>Mostrar Resultados <span className='material-symbols-outlined'>visibility</span></>}
          </button>
        </div>
        <div className={`${showTableSubracks ? '' : 'hidden'}`}>
          <TableV2
            data={filteredSubracks.subracks}
            info='catalogSubrack'
            basePath='catalog/subrack'
            fnDelete={handlePermanentlyDeleteSubrack}
          />
        </div>
      </div>
    </main>
  )
}
