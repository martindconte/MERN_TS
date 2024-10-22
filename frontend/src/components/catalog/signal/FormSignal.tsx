import { useForm } from "react-hook-form";
import { BtnFormSignal } from "./BtnFormSignal";
import { FormBodySignal } from "./FormBodySignal";
import { SignalFormData } from "../../../types";
import { useState } from "react";

interface Props {
  onSubmit: (formData: SignalFormData) => Promise<void>;
  requiredFields?: boolean;
  buttonLabel: string;
  defaultValues?: SignalFormData;
}

export const FormSignal = ({ onSubmit, defaultValues, requiredFields = true, buttonLabel }: Props) => {

  const [showBandwidth, setShowBandwidth] = useState<boolean>(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
  // const { register, handleSubmit, reset, formState: { errors }, control, setError, clearErrors } = useForm({
    defaultValues: defaultValues || {
      type: '',
      subType: '',
      observation: '',
      // bandwidth: { amount: '', unit: '' }
    }
  });

  const onSubmitHandler = async (formData: SignalFormData) => {
    console.log(showBandwidth);
    if( !showBandwidth ) formData.bandwidth = undefined
    await onSubmit(formData);
  };

  return (
    <form className="mx-auto w-4/5" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
      <FormBodySignal
        register={register}
        errors={errors}
        requiredFields={requiredFields}
        // control={control}
        // setError={setError}
        // clearErrors={clearErrors}
        showBandwidth={showBandwidth}
        setShowBandwidth={ setShowBandwidth }
      />
      <div className="w-4/5 mx-auto mb-4">
        <BtnFormSignal buttonLabel={buttonLabel} reset={reset} />
      </div>
    </form>
  );
};