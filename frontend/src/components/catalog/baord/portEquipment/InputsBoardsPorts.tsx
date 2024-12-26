import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { useVendors } from '../../../../hook'
import { BitsRatesEnum, BoardFormData, RoadmapEnum, TechnologyEnum, TransceiverFormData, TransceiverType } from '../../../../types'
import { Spinner } from '../../../shared/spinners/Spinner'

interface Props {
    handleSearch?: (formData: Partial<TransceiverFormData>) => void;
    // selectedData?: TransceiverType[];
    // setSelectedData?: Dispatch<SetStateAction<TransceiverType[]>>;
      selectedData: BoardFormData['ports'][number]['equipments'];
    //   selectedData: TransceiverType[]
    //   setSelectedData: Dispatch<SetStateAction<TransceiverType[]>>;
      setSelectedData: Dispatch<SetStateAction<BoardFormData['ports'][number]['equipments']>>;
}

// export const InputsBoardsPorts = () => {
export const InputsBoardsPorts = ({ handleSearch, selectedData, setSelectedData }: Props) => {

    const [search, setSearch] = useState<Partial<TransceiverFormData>>({ isDeleted: 'all' })
    const { queryVendors } = useVendors({ enabled: true })

    const handleOnChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value, checked } = event.target as HTMLInputElement | HTMLSelectElement & { checked?: boolean };
        setSearch(prevState => {
            let newState = { ...prevState };
            if (name === 'bitsRates') {
                const bitRateValue = value as BitsRatesEnum;
                const bitRates = prevState.bitsRates || [];
                newState.bitsRates = checked ? [...bitRates, bitRateValue] : bitRates.filter(bitRate => bitRate !== bitRateValue);
            } else if( name === 'isDeleted' ) {
                value === 'all' ? newState = { ...prevState, [name]: value } : newState = { ...prevState, [name]: value === 'true' };
            } else {
                newState = { ...prevState, [name]: value };
            }
            if (value === '') {
                delete newState[name as keyof TransceiverFormData]; 
            }
            return newState;
        });
    }

    const onSubmit = () => {
        handleSearch && handleSearch(search)
    }

    if (queryVendors.isLoading) return <Spinner />

    return (
        <div className='flex gap-3'>
            <div className='flex flex-col justify-between p-2 border border-gray-400 rounded-md'>
                <div className="flex justify-between my-1 items-center gap-1">
                    <label className="w-1/3 text-right" htmlFor="partNumber">No. Parte</label>
                    <input
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        type="text"
                        id="partNumber"
                        name="partNumber"
                        placeholder="Part Number del Transceiver"
                        onChange={event => handleOnChange(event)}
                    />
                </div>
                <div className="flex justify-between my-1 items-center gap-1">
                    <label className="w-1/3 text-right" htmlFor="vendor">Vendor</label>
                    <select
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        id="vendor"
                        name="vendor"
                        onChange={event => handleOnChange(event)}
                    >
                        <option value=''></option>
                        {
                            queryVendors.data?.map(vendor => (
                                <option
                                    key={vendor.id}
                                    value={vendor.id}
                                >{vendor.vendorName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex justify-between my-1 items-center gap-1">
                    <label className="w-1/3 text-right" htmlFor="model">Model</label>
                    <input
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        type="text"
                        id="model"
                        name="model"
                        placeholder="Ingrese el modelo. Si no posee Ingrese PN"
                        onChange={event => handleOnChange(event)}
                    />
                </div>
                <div className="flex justify-between my-1 items-center gap-1">
                    <label className="w-1/3 text-right" htmlFor="type">Tipo</label>
                    <input
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        type="text"
                        id="type"
                        placeholder="SFP, SFP+, QSFP28, CFP, MSA, etc..."
                        onChange={event => handleOnChange(event)}
                    />
                </div>
            </div>
            <div className="flex justify-between items-center gap-1 border border-gray-400 px-2 rounded-md">
                <label className="text-right" htmlFor="bitsRates">Bit Rates</label>
                <div className="w-2/3 h-44 overflow-y-auto border border-gray-300 p-2 outline-none rounded shadow-md bg-white my-1">
                    {Object.values(BitsRatesEnum).map((bitRate) => (
                        <div key={bitRate} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={bitRate}
                                name='bitsRates'
                                value={bitRate}
                                onChange={event => handleOnChange(event)}
                            />
                            <label htmlFor={bitRate}>{bitRate}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col justify-between p-2 border border-gray-400 rounded-md'>
                <div className="flex justify-between items-center gap-1">
                    <label className="w-1/3 text-right" htmlFor="description">Descripcion</label>
                    <input
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Descripcion del Modulo"

                    />
                </div>
                <div className="flex justify-between items-center gap-1">
                    <label className="w-1/3 text-right" htmlFor="observations">Observaciones</label>
                    <input
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        type="text"
                        id="observations"
                        name="observations"
                        placeholder="Descripcion del Modulo"
                        onChange={event => handleOnChange(event)}
                    />
                </div>
                <div className="flex justify-between items-center gap-1">
                    <label className="w-1/3 text-right" htmlFor="technology">Tecnologia</label>
                    <select
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        id="technology"
                        name="technology"
                        onChange={event => handleOnChange(event)}
                    >
                        <option value=''></option>
                        {
                            Object.values(TechnologyEnum).map(technology => (
                                <option
                                    key={technology}
                                    value={technology}>{technology}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex justify-between items-center gap-1">
                    <label className="w-1/3 text-right" htmlFor="roadmap">ROADMAP</label>
                    <select
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        id="roadmap"
                        name="roadmap"
                        onChange={event => handleOnChange(event)}
                    >
                        <option value="">Sin Datos...</option>
                        {
                            Object.values(RoadmapEnum).map(roadmap => (
                                <option
                                    key={roadmap}
                                    value={roadmap}>{roadmap}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex justify-between items-center gap-1 bg-red-600 rounded-md">
                    <label className="w-1/3 text-right text-white" htmlFor="roadmap">ELIMINADOS</label>
                    <select
                        className="w-2/3 border border-gray-300 p-1 outline-none rounded shadow-md"
                        id="isDeleted"
                        name="isDeleted"
                        onChange={event => handleOnChange(event)}
                    >
                        <option value="all">Cualquiera</option>
                        <option value="false">Dsiponibles</option>
                        <option value="true">Eliminados</option>
                    </select>
                </div>
            </div>
            <div className='flex flex-col justify-between items-center gap-2'>
                <div className='flex gap-3 basis-1/2'>
                    <button
                        className="text-white bg-blue-600 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-blue-900 hover:ring-green-800 hover:ring-2"
                        type="button"
                        onClick={onSubmit}
                    >BUSCAR<span className="material-symbols-outlined">search</span></button>
                    <button
                        className="text-white bg-red-500 font-semibold px-3 py-2 rounded-md ring-offset-2 flex items-center gap-2 hover:bg-red-800 hover:ring-red-800 hover:ring-2"
                        type="button"
                    // onClick={() => close(false)}
                    >LIMPIAR <span className="material-symbols-outlined">backspace</span></button>
                </div>
                {
                    selectedData && setSelectedData && (
                        <div className='flex flex-col justify-center items-center gap-2 basis-1/2'>
                            <p className='font-roboto_condensed text-sm font-bold uppercase'>Cant Seleccionada: <span className='font-normal'>{selectedData?.length}</span></p>
                            <button
                                className='flex items-center gap-2 font-roboto_condensed text-sm uppercase px-3 py-2 rounded-md bg-emerald-400 hover:bg-emerald-800 hover:text-white'
                                type='button'
                                onClick={() => setSelectedData([])}
                            >Limpiar TODA Seleecion<span className='material-symbols-outlined'>mop</span></button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
