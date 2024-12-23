import { Dispatch, SetStateAction } from 'react'

interface Props {
  vendorValue: string
  onChangeVendor: Dispatch<SetStateAction<string>>
  PNValue: string
  onChangePN: Dispatch<SetStateAction<string>>
}

export const FiltersTransceiversDeleted = ({ PNValue, onChangePN, onChangeVendor, vendorValue }: Props) => {
  return (
    <div className='flex flex-col gap-3 bg-emerald-200 px-3 py-1 rounded-md basis-3/5'>
      <div className='flex items-center px-2 py-1 rounded-md bg-white text-right font-oswald'>
        <label htmlFor='filterVendor' className='w-1/2 uppercase'>
          Filtrar Vendor
        </label>
        <input
          className='mx-3 px-2 py-1 border border-gray-400 rounded-md outline-none grow'
          type='text'
          name='filterVendor'
          id='filterVendor'
          value={vendorValue}
          onChange={e => onChangeVendor(e.target.value)}
        />
      </div>
      <div className='flex items-center px-2 py-1 rounded-md bg-white text-right font-oswald'>
        <label htmlFor='filterPartNumber' className='w-1/2 uppercase'>
          Filtrar Part Number Transceiver
        </label>
        <input
          className='mx-3 px-2 py-1 border border-gray-400 rounded-md outline-none grow'
          type='text'
          name='filterPartNumber'
          id='filterPartNumber'
          value={PNValue}
          onChange={e => onChangePN(e.target.value)}
        />
      </div>
    </div>
  )
}
