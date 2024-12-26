import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { MutationStatus } from '@tanstack/react-query'
import { useVendors } from '../../../../hook'
import { SubrackFormData } from '../../../../types/catalog/subrackTypes'
import { Spinner } from '../../../shared/spinners/Spinner'
import { BtnForm } from '../../../shared/form/BtnForm'
import { SlotsSubracks } from './SlotsSubracks'
import { FormBodySubrack } from './FormBodySubrack'

interface Props {
  onSubmit: (data: SubrackFormData) => void
  buttonLabel: string
  requiredFields?: boolean
  status?: MutationStatus
  defaultValues?: SubrackFormData
  isDeleted?: boolean
}

export const FormSubrack = ({ onSubmit, buttonLabel, status, requiredFields, defaultValues }: Props) => {
  const { pathname } = useLocation()
  const { queryVendors } = useVendors({})
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<SubrackFormData>({ defaultValues })
  const { append, fields, move, remove } = useFieldArray({
    control,
    name: 'slots',
  })

  useEffect(() => {
    setValue('totalSlots', fields.length)
  }, [fields])

  useEffect(() => {
    if (status === 'success') reset()
  }, [status, reset])

  if (queryVendors.isLoading)
    return (
      <div className='flex flex-col gap-3 my-3 font-oswald'>
        <p className='uppercase'>Buscando Vendors...</p>
        <Spinner />
      </div>
    )

  return (
    <form className='flex items-start font-roboto_condensed gap-3 my-2' noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className='bg-emerald-950 text-white px-4 py-3 ml-6 rounded-lg'>
        <FormBodySubrack vendors={queryVendors.data || []} register={register} errors={errors} requiredFields={requiredFields} />
        <BtnForm status={status} buttonLabel={buttonLabel} reset={reset} />
      </div>

      {!pathname.includes('subrack/search') && (
        <div className='w-2/3 px-4 py-3 mr-6 bg-emerald-950 rounded-lg space-y-3 max-h-[750px] overflow-y-auto'>
          <button
            type='button'
            className='bg-emerald-400 px-3 py-1 rounded-md uppercase flex items-center gap-1 text-sm w-full'
            onClick={() =>
              append({
                number: fields.length + 1,
                logical: (fields.length + 1).toString(),
                physical: (fields.length + 1).toString(),
                boards: [],
              })
            }
          >
            <span className='material-symbols-outlined'>add_circle</span>Agregar Slot
          </button>
          {fields.map((field, index) => (
            <SlotsSubracks
              key={field.id}
              control={control}
              index={index}
              value={field}
              setValue={setValue}
              register={register}
              errors={errors}
              append={append}
              move={move}
              remove={remove}
              totalSlots={fields.length}
              vendors={queryVendors.data || []}
            />
          ))}
        </div>
      )}
    </form>
  )
}
