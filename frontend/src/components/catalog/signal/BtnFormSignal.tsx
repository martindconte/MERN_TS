import { UseFormReset } from "react-hook-form";
import { SignalFormData } from "../../../types";
import { MutationStatus } from "@tanstack/react-query";

interface Props {
  reset: UseFormReset<SignalFormData>;
  status?: MutationStatus;
  buttonLabel: string;
}

export const BtnFormSignal = ({ reset, status, buttonLabel }: Props) => {
  return (
    <div className="flex flex-col gap-1 mt-3">
      <button
        className='text-black grow bg-blue-400 font-semibold py-1 px-3 rounded-lg hover cursor-pointer transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/100 hover:text-white'
        type="submit"
        disabled={status === 'pending'}
      >{buttonLabel}</button>
      <button
        className='text-black grow bg-red-400 font-semibold py-1 px-3 rounded-lg hover cursor-pointer transition hover:bg-red-700 hover:shadow-lg hover:shadow-red-300/100 hover:text-white'
        type="reset"
        disabled={status === 'pending'}
        onClick={() => reset()}
      >Limpiar Formulario</button>
    </div>
  )
}