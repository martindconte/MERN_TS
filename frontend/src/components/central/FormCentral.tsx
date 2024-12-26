import { useForm } from 'react-hook-form'
import { FormBodyCentral } from './FormBodyCentral'
import { CentralFormData } from '../../types'
import { MutationStatus } from '@tanstack/react-query'
import { BtnFormCentral } from './BtnFormCentral'

interface Props {
  onSubmit: (data: CentralFormData) => void
  requiredFields: boolean
  buttonLabel: string
  status?: MutationStatus
  defaultValues?: CentralFormData
}

export const FormCentral = ({ onSubmit, status, requiredFields, buttonLabel, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues })

  return (
    <form className='bg-white px-3 py-2 rounded-lg font-roboto' onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormBodyCentral register={register} errors={errors} requiredFields={requiredFields} />

      <BtnFormCentral buttonLabel={buttonLabel} status={status} reset={reset} />
    </form>
  )
}
