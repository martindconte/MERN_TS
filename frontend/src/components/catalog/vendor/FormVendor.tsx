import { useForm } from 'react-hook-form'
import { VendorFormData } from '../../../types';
import { MutationStatus } from '@tanstack/react-query';
import { FormBodyVendor } from './FormBodyVendor';
import { BtnFormVendor } from './BtnFormVendor';
import { useEffect } from 'react';
import { Spinner } from '../../shared/spinners/Spinner';


interface Props {
  onSubmit: (data: VendorFormData) => void;
  requiredFields: boolean;
  buttonLabel: string;
  status?: MutationStatus;
  defaultValues?: VendorFormData;
  isDeleted?: boolean;
}

export const FormVendor = ({ onSubmit, status, requiredFields, buttonLabel, defaultValues, isDeleted = false }: Props) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<VendorFormData>({ defaultValues })

  useEffect(() => {
    if (status === 'success') reset();
  }, [status, reset]);

  if (status === "pending") return <Spinner />

  return (
    <form
      className="mx-5 mb-6 px-3 rounded-lg font-roboto"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FormBodyVendor
        register={register}
        errors={errors}
        requiredFields={requiredFields}
        isDeleted={isDeleted}
      />

      <BtnFormVendor
        reset={reset}
        buttonLabel={buttonLabel}
        status={status}
      />
    </form>
  )
}