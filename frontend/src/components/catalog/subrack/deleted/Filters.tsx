import { Dispatch, SetStateAction } from 'react'

interface Props {
  vendorValue: string
  onChangeVendor: Dispatch<SetStateAction<string>>
  PNValue: string
  onChangePN: Dispatch<SetStateAction<string>>
  SubrackTypeValue: string
  onChangeSubrackType: Dispatch<SetStateAction<string>>
  SubrackFamilyValue: string
  onChangeSubrackFamily: Dispatch<SetStateAction<string>>
}

export const Filters = ({
  vendorValue,
  PNValue,
  SubrackFamilyValue,
  SubrackTypeValue,
  onChangePN,
  onChangeSubrackFamily,
  onChangeSubrackType,
  onChangeVendor,
}: Props) => {
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
          Filtrar PN Subrack
        </label>
        <input
          className='mx-3 px-2 py-1 border border-gray-400 rounded-md outline-none grow'
          type='text'
          name='filterPNBoard'
          id='filterPNBoard'
          value={PNValue}
          onChange={e => onChangePN(e.target.value)}
        />
      </div>
      <div className='flex items-center px-2 py-1 rounded-md bg-white text-right font-oswald'>
        <label htmlFor='filterPartNumber' className='w-1/2 uppercase'>
          Filtrar Subrack Type
        </label>
        <input
          className='mx-3 px-2 py-1 border border-gray-400 rounded-md outline-none grow'
          type='text'
          name='filterBoardName'
          id='filterBoardName'
          value={SubrackTypeValue}
          onChange={e => onChangeSubrackType(e.target.value)}
        />
      </div>
      <div className='flex items-center px-2 py-1 rounded-md bg-white text-right font-oswald'>
        <label htmlFor='filterPartNumber' className='w-1/2 uppercase'>
          Filtrar Subrack Family
        </label>
        <input
          className='mx-3 px-2 py-1 border border-gray-400 rounded-md outline-none grow'
          type='text'
          name='filterBoardName'
          id='filterBoardName'
          value={SubrackFamilyValue}
          onChange={e => onChangeSubrackFamily(e.target.value)}
        />
      </div>
    </div>
  )
}
