import { MutationStatus } from '@tanstack/react-query'
import { BoardFormData } from '../../../../types'
import { FormBodyBoard } from './FormBodyBoard'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BtnFormBoard } from './BtnFormBoard'
import { FormBodyBoardPorts } from './FormBodyBoardPorts'

interface Props {
  onSubmit: (formData: BoardFormData) => void
  status?: MutationStatus
  requiredFields: boolean
  buttonLabel: string
  defaultValues?: BoardFormData
  isDeleted?: boolean
}

export const FormBoard = ({ onSubmit, status, requiredFields, buttonLabel, defaultValues, isDeleted }: Props) => {
  const location = useLocation()
  const showFormBodyBoardPorts = location.pathname.includes('board/search')

  const methods = useForm<BoardFormData>({ defaultValues })

  useEffect(() => {
    if (status === 'success') methods.reset()
  }, [status, methods.reset])

  return (
    <FormProvider {...methods}>
      <form className='flex flex-col font-roboto bg-gray-100 px-3 py-4 rounded-lg mx-8' onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <div className='flex gap-3'>
          <FormBodyBoard requiredFields={requiredFields} isDeleted={isDeleted} />
          {!showFormBodyBoardPorts && <FormBodyBoardPorts requiredFields={requiredFields} />}
        </div>
        <BtnFormBoard status={status} buttonLabel={buttonLabel} />
      </form>
    </FormProvider>
  )
}
