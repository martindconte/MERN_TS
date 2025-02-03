import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { NEFormData, SubrackType, VendorType } from '../../../types'
import { UseFieldArrayAppend } from 'react-hook-form'
import { useSubrack, useSubracks } from '../../../hook'

interface Props {
  vendors: VendorType[] // valores de los vendors para seleccionar el subrack.
  vendorNE: string // valor de vendor seleccionado para crear el NE.
  append: UseFieldArrayAppend<NEFormData, 'subracks'> // funcion para agregar un subrack al NE.
  quantitySubracks: number // cantidad de subracks a agregar.
  setSubracksAdded: Dispatch<SetStateAction<SubrackType[]>> // funcion para actualizar el subrack seleccionado para luego agregar las placas a los slots
}

export const AddSubrack = ({ vendors, vendorNE, append, quantitySubracks, setSubracksAdded }: Props) => {
  const [vendorSubrack, setVendorSubrack] = useState<string>('')
  const [subrackIdSelected, setSubrackIdSelected] = useState<SubrackType['id']>('')

  const { querySubracks } = useSubracks({ enabled: vendorSubrack !== '', search: { vendor: vendorSubrack } })
  const { querySubrack } = useSubrack({ id: subrackIdSelected, searchParams: '?subrack-boards-ports=true', enabled: false })

  // Cuando se retornan los subracks, se selecciona el primer subrack de la lista de otra manera que si el select no cambia no se seleccionan datos
  useEffect(() => {
    if (querySubracks.data && querySubracks.data.payload.length > 0) {
      const firstSubrackId = querySubracks.data.payload[0].id
      setSubrackIdSelected(firstSubrackId)
    }
  }, [querySubracks.data])

  //todo: optimizar la consulta... si el subrack a agregar ya se encuentra en el listado de subracks seleccionados, no realizar consulta al backend... sino agregarlo desde el listado de subracks seleccionados
  const handleAddSubrack = async () => {
    if (vendorSubrack === '' || subrackIdSelected === '') return
    try {
      const { data } = await querySubrack.refetch()
      if (data) {
        setSubracksAdded(prev => {
          const exist = prev.some(subrack => subrack.id === data.id)
          return exist ? prev : [...prev, data]
        })
        append({
          id: data.id,
          position: '',
          shelfNumber: quantitySubracks,
          shelfName: `Shelf${quantitySubracks}`,
          slots: data.slots.map(slot => ({
            number: slot.number,
            physical: slot.physical,
            logical: slot.logical,
            // board: {
            //   id: '',
            //   ports: [],
            // },
            // board: {} as NEFormData['subracks'][number]['slots'][number]['board'],
          })),
        })
      }
    } catch (error) {
      console.error('Error al agregar el subrack:', error)
    }
  }

  return (
    <div className='flex gap-2 items-start'>
      <button
        type='button'
        className='bg-emerald-400 px-3 py-1 rounded-md uppercase flex items-center gap-1 text-sm h-fit'
        onClick={handleAddSubrack}
      >
        <span className='material-symbols-outlined'>add_circle</span>Agregar Subrack
      </button>
      <div className={`flex gap-2 items-center px-3 py-1 ${vendorSubrack === vendorNE ? '' : 'bg-red-200 rounded-lg'}`}>
        <label htmlFor='vendorSubrack'>Proveedor:</label>
        <select
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
          id='vendorSubrack'
          onChange={e => setVendorSubrack(e.target.value)}
        >
          <option value=''></option>
          {vendors.map(vendor => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.vendorName}
            </option>
          ))}
        </select>
      </div>
      <div className='flex gap-2 items-center px-3 py-1'>
        <label htmlFor='subrackNE'>Subrack:</label>
        <select
          className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black grow'
          id='subrackNE'
          value={subrackIdSelected}
          onChange={e => setSubrackIdSelected(e.target.value)}
        >
          {querySubracks.data?.payload.map(({ id, subrackType, subrackFamily, modelName, partNumber }) => (
            <option key={id} value={id}>
              {subrackType} {subrackFamily} / Model: {modelName} / PN: {partNumber}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
