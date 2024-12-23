import { UseFormReset, FieldValues } from 'react-hook-form';
import { MutationStatus } from '@tanstack/react-query';

interface Props<T extends FieldValues> {
  reset?: UseFormReset<T>;
  status?: MutationStatus;
  buttonLabel: string;
}

export const BtnForm = <T extends FieldValues>({ buttonLabel, reset, status }: Props<T>) => {
  return (
    <div className='flex flex-col gap-2 mt-3'>
      <button
        className={`${status === 'pending' ? 'opacity-50' : ''} text-black uppercase grow bg-blue-400 font-semibold py-1 px-3 rounded-lg hover cursor-pointer transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/100 hover:text-white`}
        type='submit'
        disabled={status === 'pending'}
      >
        {buttonLabel}
      </button>
      {reset && (
        <button
          className={`${status === 'pending' ? 'opacity-50' : ''} text-black uppercase grow bg-red-400 font-semibold py-1 px-3 rounded-lg hover cursor-pointer transition hover:bg-red-700 hover:shadow-lg hover:shadow-red-300/100 hover:text-white`}
          type='reset'
          disabled={status === 'pending'}
          onClick={() => reset()}
        >
          Limpiar Formulario
        </button>
      )}
    </div>
  );
};