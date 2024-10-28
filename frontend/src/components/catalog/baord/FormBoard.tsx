import { MutationStatus } from '@tanstack/react-query';
import { BoardFormData } from '../../../types';
import { FormBodyBoard } from './FormBodyBoard';
import { useForm } from 'react-hook-form';
import { BtnFormBoard } from './BtnFormBoard';
import { FormBodyBoardPorts } from './FormBodyBoardPorts';

interface Props {
  onSubmit: (formData: BoardFormData) => void;
  status: MutationStatus;
  requiredFields: boolean;
  buttonLabel: string;
  defaultValues?: BoardFormData;
}

export const FormBoard = ({ onSubmit, status, requiredFields, buttonLabel, defaultValues }: Props) => {

  const { handleSubmit, register, formState: { errors }, reset, control, setValue } = useForm<BoardFormData>({ defaultValues })

  return (
    <form
      className="flex flex-col font-roboto bg-gray-100 px-3 py-4 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className='flex gap-3'>
        <FormBodyBoard
          register={register}
          errors={errors}
          requiredFields={requiredFields}
        />

        <FormBodyBoardPorts
          control={control}
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </div>

      <BtnFormBoard
        reset={reset}
        status={status}
        buttonLabel={buttonLabel}
      />
    </form>
  )
}
