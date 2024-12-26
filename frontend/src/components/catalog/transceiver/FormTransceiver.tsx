import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MutationStatus } from '@tanstack/react-query'
import { TransceiverFormData } from '../../../types'
import { useVendors } from '../../../hook'
import { FormBodyTransceiver } from './FormBodyTransceiver'
import { BtnFormTransceiver } from './BtnFormTransceiver'
import { Spinner } from '../../shared/spinners/Spinner'

interface Props {
  onSubmit: (data: TransceiverFormData) => void
  requiredFields: boolean
  buttonLabel: string
  status?: MutationStatus
  defaultValues?: TransceiverFormData
  isDeleted?: boolean
}

export const FormTransceiver = ({ onSubmit, status, requiredFields, buttonLabel, defaultValues, isDeleted }: Props) => {
  const { queryVendors } = useVendors({ enabled: true })
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TransceiverFormData>({ defaultValues })

  useEffect(() => {
    if (status === 'success') reset()
  }, [status, reset])

  if (queryVendors.isLoading) return <Spinner />

  return (
    <form className='font-roboto bg-gray-100 px-3 py-4 rounded-lg' onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormBodyTransceiver
        register={register}
        errors={errors}
        vendors={queryVendors.data || []}
        requiredFields={requiredFields}
        isDeleted={isDeleted}
      />
      <BtnFormTransceiver reset={reset} status={status} buttonLabel={buttonLabel} />
    </form>
  )
}
