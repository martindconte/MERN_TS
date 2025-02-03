import { useState } from 'react'
import { MutationStatus } from '@tanstack/react-query'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { Central, NEFormData, SubrackType } from '../../../types'
import { useVendors } from '../../../hook'
import { BtnForm } from '../../shared/form/BtnForm'
import { Spinner } from '../../shared/spinners/Spinner'
import { FormBodyNE } from './FormBodyNE'
import { SearchCentralModal } from './SearchCentralModal'
import { AddSubrack } from './AddSubrack'
import { Shelfs } from './shelfsToAdd/Shelfs'

interface Props {
  onSubmit: (data: NEFormData) => void
  buttonLabel: string
  requiredFields?: boolean
  status?: MutationStatus
  defaultValues?: NEFormData
  isDeleted?: boolean
}

export const FormNE = ({ buttonLabel, onSubmit, defaultValues, status, isDeleted }: Props) => {
  const [showModalCentral, setShowModalCentral] = useState<boolean>(false)
  const [centralSelected, setCentralSelected] = useState<Central[]>([])
  // almaceno los datos de los subracks que voy agregando al NE para luego poder completar los datos de los shelfs
  const [subracksAdded, setSubracksAdded] = useState<SubrackType[]>([])

  const { queryVendors } = useVendors({})

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<NEFormData>({ defaultValues })

  const { append, fields } = useFieldArray({
    control,
    name: 'subracks',
    keyName: 'key',
  })

  // Observo el valor de vendor para la creacion del NE y lo comparo con el valor de vendor para agregar un subrack
  const vendorNE = useWatch({
    control,
    name: 'vendor',
  })

  // Almaceno el valor de vendor para la creacion del NE. La tabla retorna un array de objetos, por eso se toma el primer elemento
  const handleCentralSelect = (centrals: Central[]) => {
    setCentralSelected([centrals[0]])
    setValue('central', centrals[0].id) // Actualiza el valor en el formulario
    setShowModalCentral(false) // Cierra el modal
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
      <form
        className='flex gap-2 mx-4 px-3 py-2 font-roboto_condensed text-sm bg-slate-100 text-black rounded-lg'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-1/4'>
          {/* Formulado con los datos del subrack */}
          <FormBodyNE
            errors={errors}
            isDeleted={isDeleted}
            register={register}
            vendors={queryVendors.data || []}
            centralName={centralSelected[0]?.centralName}
            showCentralModal={setShowModalCentral}
            cleanCentral={() => setCentralSelected([])}
          />
          <BtnForm buttonLabel={buttonLabel} reset={reset} status={status} />
        </div>
        <div className='flex flex-col gap-2 w-3/4'>
        {/* Agregar subracks */}
          <AddSubrack
            append={append}
            vendorNE={vendorNE}
            vendors={queryVendors.data || []}
            quantitySubracks={fields.length}
            setSubracksAdded={setSubracksAdded}
          />
          {/* Mustro y listo los subracks agregados */}
          <Shelfs control={control} register={register} setValue={setValue} fields={fields} subracksAdded={subracksAdded}/>
        </div>
      </form>
      {/* Modal Para buscar el centro a cargar el equipo */}
      {showModalCentral && <SearchCentralModal onCentralSelect={handleCentralSelect} onClose={setShowModalCentral} />}
    </>
  )
}
