import { UseFormRegister } from 'react-hook-form'
import { BoardFormData, BitsRatesEnum, TechnologyEnum, RoadmapEnum, VendorType } from '../../../../types'

interface Props {
  register: UseFormRegister<BoardFormData>;
  vendors: VendorType[];
}

export const InputsSearchBoards = ({ register, vendors }: Props) => {
  return (
    <div className="flex space-x-2 bg-gray-200 p-4 rounded-lg">
      <div className="border border-gray-400 px-3 py-2 rounded-lg space-y-2 h-fit">
        <div className="flex items-center gap-2">
          <label htmlFor="boardName" className="w-2/5">
            Nombre Placa:
          </label>
          <input
            type="text"
            id="boardName"
            className="p-1 w-3/5"
            {...register("boardName", { setValueAs: (value) => value.trim() })}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="partNumberBoard" className="w-2/5">
            No. Parte:
          </label>
          <input
            type="text"
            id="partNumberBoard"
            className="p-1 w-3/5"
            {...register("partNumber", { setValueAs: (value) => value.trim() })}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="vendorBoard" className="w-2/5">
            Vendor:
          </label>
          <select id="vendorBoard" className="p-1 w-3/5" {...register("vendor")}>
            <option value="">Cualquiera...</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.vendorName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border border-gray-400 px-3 py-2 rounded-lg flex items-center gap-2 h-fit">
        <p>Señales</p> {/* Usar legend en lugar de label */}
        <fieldset className="h-44 overflow-y-auto border border-gray-300 p-2 outline-none rounded shadow-md bg-white">
          {Object.values(BitsRatesEnum).map((bitRate) => (
            <div key={bitRate} className="flex items-center space-x-2 px-1">
              <input
                type="checkbox"
                id={`${bitRate}board`}
                value={bitRate}
                {...register("bitsRates")}
              />
              <label htmlFor={`${bitRate}board`}>{bitRate}</label>
            </div>
          ))}
        </fieldset>
      </div>

      <div className="border border-gray-400 px-3 py-2 rounded-lg space-y-2 h-fit">
        <div className="flex items-center gap-2">
          <label htmlFor="descriptionBoard" className="w-1/3">
            Descripcion:
          </label>
          <input
            type="text"
            id="descriptionBoard"
            className="p-1 w-2/3"
            {...register("description", { setValueAs: (value) => value.trim() })}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="observationsBoard" className="w-1/3">
            Observaciones:
          </label>
          <input
            type="text"
            id="observationsBoard"
            className="p-1 w-2/3"
            {...register("observations", { setValueAs: (value) => value.trim() })}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="technologyBoard" className="w-1/3">
            Tecnologia:
          </label>
          <select
            id="technologyBoard"
            className="p-1 w-2/3"
            {...register("technology")}
          >
            <option value=""></option>
            {Object.values(TechnologyEnum).map((technology) => (
              <option key={technology} value={technology}>
                {technology}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="roadmapBoard" className="w-1/3">
            ROADMAP:
          </label>
          <select
            id="roadmapBoard"
            className="p-1 w-2/3"
            {...register("roadmap")}
          >
            {Object.values(RoadmapEnum).map((roadmap) => (
              <option key={roadmap} value={roadmap}>
                {roadmap}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
