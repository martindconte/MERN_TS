import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { UseFieldArrayAppend } from 'react-hook-form'
import { NEFormData, SubrackType, VendorType } from '../../../../../types'
import { useSubrack, useSubracks } from '../../../../../hook'
import { BtnAddSubrack, VendorSelect, SubrackSelect } from './'

interface Props {
  vendors: VendorType[]
  vendorNE: string
  append: UseFieldArrayAppend<NEFormData, 'subracks'>
  quantitySubracks: number
  subracksAdded: SubrackType[]
  setSubracksAdded: Dispatch<SetStateAction<SubrackType[]>>
}

export const AddSubrack = ({ vendors, vendorNE, append, quantitySubracks, subracksAdded, setSubracksAdded }: Props) => {
  const [vendorSubrack, setVendorSubrack] = useState<string>('')
  const [subrackIdSelected, setSubrackIdSelected] = useState<SubrackType['id']>('')

  const { querySubracks } = useSubracks({ enabled: vendorSubrack !== '', search: { vendor: vendorSubrack } })
  const { querySubrack } = useSubrack({
    id: subrackIdSelected,
    searchParams: '?subrack-boards-ports=true',
    enabled: false,
  })

  // Efecto para seleccionar primer subrack disponible
  useEffect(() => {
    if (querySubracks.data?.payload?.length && !subrackIdSelected) {
      setSubrackIdSelected(querySubracks.data.payload[0].id)
    }
  }, [querySubracks.data, subrackIdSelected])

  // Función memoizada para agregar subracks
  const appendSubrack = useCallback(
    (subrack: SubrackType) => {
      append({
        id: subrack.id,
        position: '',
        shelfNumber: quantitySubracks,
        shelfName: `Shelf${quantitySubracks}`,
        slots: subrack.slots.map(slot => ({
          number: slot.number,
          physical: slot.physical,
          logical: slot.logical,
        })),
      })
    },
    [append, quantitySubracks],
  )

  // Handler principal para agregar subracks
  const handleAddSubrack = useCallback(async () => {
    if (!vendorSubrack || !subrackIdSelected) return

    const existingSubrack = subracksAdded.find(subrack => subrack.id === subrackIdSelected)

    if (existingSubrack) {
      appendSubrack(existingSubrack)
      return
    }

    try {
      const { data } = await querySubrack.refetch()
      if (!data) return
      setSubracksAdded(prev => (prev.some(s => s.id === data.id) ? prev : [...prev, data]))
      appendSubrack(data)
    } catch (error) {
      console.error('Error agregando subrack:', error)
    }
  }, [vendorSubrack, subrackIdSelected, subracksAdded, querySubrack, setSubracksAdded, appendSubrack])

  return (
    <div className='flex gap-2 items-start'>
      <BtnAddSubrack isLoading={querySubrack.isFetching} onClick={handleAddSubrack} />
      <VendorSelect vendors={vendors} vendorNE={vendorNE} vendorSubrack={vendorSubrack} setVendorSubrack={setVendorSubrack} />
      <SubrackSelect subracks={querySubracks.data?.payload || []} subrackIdSelected={subrackIdSelected} setSubrackIdSelected={setSubrackIdSelected} />
    </div>
  )
}
