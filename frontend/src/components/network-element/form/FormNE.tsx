import { useState } from 'react'
import { MutationStatus } from '@tanstack/react-query'
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { Central, NEFormData, SubrackType } from '../../../types'
import { useVendors } from '../../../hook'
import { BtnForm, Spinner } from '../../shared'
import { AddSubrack, FormBodyNE, SearchCentralModal, Shelfs } from './'

interface Props {
  onSubmit: (data: NEFormData) => void
  buttonLabel: string
  requiredFields?: boolean
  status?: MutationStatus
  defaultValues?: NEFormData
  isDeleted?: boolean
}

type SubrackErrorPath = `subracks.${number}.${'shelfNumber' | 'shelfName' | 'position'}`;

export const FormNE = ({ buttonLabel, onSubmit, defaultValues, status, isDeleted }: Props) => {
  const [showModalCentral, setShowModalCentral] = useState<boolean>(false)
  const [centralSelected, setCentralSelected] = useState<Central[]>([])
  const [subracksAdded, setSubracksAdded] = useState<SubrackType[]>([]) // Subracks que voy agregando al NE para luego poder completar los datos de los shelfs
  const { queryVendors } = useVendors({})

  const methods = useForm<NEFormData>({ defaultValues, shouldUnregister: false })

  const { append, fields, remove } = useFieldArray({
    control: methods.control,
    name: 'subracks',
    keyName: 'key',
  })

  // Observo el valor de vendor para la creacion del NE y lo comparo con el valor de vendor para agregar un subrack
  const vendorNE = useWatch({
    control: methods.control,
    name: 'vendor',
  })

  // Almaceno el valor de vendor para la creacion del NE. La tabla retorna un array de objetos, por eso se toma el primer elemento
  const handleCentralSelect = (centrals: Central[]) => {
    setCentralSelected([centrals[0]])
    methods.setValue('central', centrals[0].id) // Actualiza el valor en el formulario
    setShowModalCentral(false) // Cierra el modal
  }

  const handleFormData = async (data: NEFormData) => {
    console.log('aqui');
    const errors: {
      index: number;
      shelfNumber?: string;
      shelfName?: string;
      position?: string;
    }[] = [];
  
    data.subracks.forEach((subrack, index) => {
      const subrackErrors: {
        shelfNumber?: string;
        shelfName?: string;
        position?: string;
      } = {};
  
      if (isNaN( subrack.shelfNumber) || subrack.shelfNumber < 0) subrackErrors.shelfNumber = `Shelf: ${subrack.shelfNumber} - El valor del Shelf no es valido.`;
      if (!subrack.shelfName) subrackErrors.shelfName = `Shelf: ${subrack.shelfNumber} - ShelfName: ${subrack.shelfName} no es valido`;
      if (!subrack.position) subrackErrors.position = `Shelf: ${subrack.shelfNumber} - Posicion: ${subrack.position} no es valida`;
  
      const isShelfNumberUnique = data.subracks.every((s, i) => i === index || s.shelfNumber !== subrack.shelfNumber);
      const isPositionUnique = data.subracks.every((s, i) => i === index || s.position.trim() !== subrack.position.trim());
      const isShelfNameUnique = data.subracks.every((s, i) => i === index || s.shelfName.trim() !== subrack.shelfName.trim());
      
      if (!isShelfNumberUnique) subrackErrors.shelfNumber = `Shelf:${subrack.shelfNumber} - Número de shelf debe ser único`; 
      if (!isPositionUnique) subrackErrors.position = `Shelf:${subrack.shelfNumber} - Posición debe ser única`;  
      if (!isShelfNameUnique) subrackErrors.shelfName = `Shelf:${subrack.shelfNumber} - Nombre de shelf debe ser único`;
  
      if (Object.keys(subrackErrors).length > 0) errors.push({ index, ...subrackErrors });
    });
  
    // 2. Manejar errores
    if (errors.length > 0) {
      errors.forEach((error) => {
        const pathPrefix = `subracks.${error.index}` as const;
  
        if (error.shelfNumber) {
          methods.setError(`${pathPrefix}.shelfNumber` as SubrackErrorPath, {
            message: error.shelfNumber,
          });
        }
  
        if (error.shelfName) {
          methods.setError(`${pathPrefix}.shelfName` as SubrackErrorPath, {
            message: error.shelfName,
          });
        }
  
        if (error.position) {
          methods.setError(`${pathPrefix}.position` as SubrackErrorPath, {
            message: error.position,
          });
        }
      });
  
      return; // Detener el submit si hay errores
    }
  
    // 3. Si todo está OK
    methods.clearErrors(); // Limpiar errores
    onSubmit(data);
  }
  
  if (queryVendors.isLoading)
    return (
      <div className='flex flex-col gap-3 my-3 font-oswald'>
        <p className='uppercase text-center'>Buscando Vendors...</p>
        <Spinner />
      </div>
    )

  return (
    <>
      <FormProvider {...methods}>
        <form
          className='flex gap-2 mx-4 px-3 py-2 font-roboto_condensed text-sm bg-slate-100 text-black rounded-lg'
          noValidate
          onSubmit={methods.handleSubmit(handleFormData)}
        >
          <div className='w-1/4'>
            {/* Formulado con los datos del subrack */}
            <FormBodyNE
              isDeleted={isDeleted}
              vendors={queryVendors.data || []}
              centralName={centralSelected[0]?.centralName}
              showCentralModal={setShowModalCentral}
              cleanCentral={() => setCentralSelected([])}
            />
            <BtnForm buttonLabel={buttonLabel} reset={methods.reset} status={status} />
          </div>
          <div className='flex flex-col gap-2 w-3/4'>
            {/* Agregar subracks */}
            <AddSubrack
              append={append}
              vendorNE={vendorNE}
              vendors={queryVendors.data || []}
              quantitySubracks={fields.length}
              subracksAdded={subracksAdded}
              setSubracksAdded={setSubracksAdded}
            />
            {/* Mustro y listo los subracks agregados */}
            <Shelfs fields={fields} subracksAdded={subracksAdded} remove={remove} />
          </div>
        </form>
      </FormProvider>
      {/* Modal Para buscar el centro a cargar el equipo */}
      {showModalCentral && <SearchCentralModal onCentralSelect={handleCentralSelect} onClose={setShowModalCentral} />}
    </>
  )
}
