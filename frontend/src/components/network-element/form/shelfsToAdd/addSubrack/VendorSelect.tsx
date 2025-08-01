import { VendorType } from "../../../../../types";

interface Props {
    vendorNE: string;
    vendorSubrack: string;
    setVendorSubrack: (value: string) => void;
    vendors: VendorType[];
}

export const VendorSelect = ({ vendorNE, vendorSubrack, setVendorSubrack, vendors }: Props ) => (
    <div className={`flex gap-2 items-center px-3 py-1 ${vendorSubrack === vendorNE ? '' : 'bg-red-200 rounded-lg'}`}>
      <label htmlFor='vendorSubrack'>Proveedor:</label>
      <select
        className='w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md text-black'
        id='vendorSubrack'
        value={vendorSubrack}
        onChange={(e) => setVendorSubrack(e.target.value)}
      >
        <option value=''></option>
        {vendors.map((vendor) => (
          <option key={vendor.id} value={vendor.id}>
            {vendor.vendorName}
          </option>
        ))}
      </select>
    </div>
  )
