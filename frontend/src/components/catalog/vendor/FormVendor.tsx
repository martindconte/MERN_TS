import { useForm } from 'react-hook-form'
import { VendorFormData } from '../../../types';
import { MutationStatus } from '@tanstack/react-query';
import { FormBodyVendor } from './FormBodyVendor';
import { BtnFormVendor } from './BtnFormVendor';


interface Props {
  onSubmit: (data: VendorFormData) => void;
  requiredFields: boolean;
  buttonLabel: string;
  status?: MutationStatus;
  defaultValues?: VendorFormData;
}

export const FormVendor = ({ onSubmit, status, requiredFields, buttonLabel, defaultValues }: Props) => {

  const { register, handleSubmit, reset, formState: { errors }, } = useForm({ defaultValues })

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
      />

      <BtnFormVendor
        reset={ reset }
        buttonLabel={ buttonLabel }
        status={ status }
      />

      {/* <BtnForm
                buttonLabel={ buttonLabel }
                status={ status }
                reset={ reset }
            /> */}
    </form>
  )
}