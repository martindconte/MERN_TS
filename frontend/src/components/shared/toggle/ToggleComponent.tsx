import { UseFormRegister, Path, FieldValues, useWatch, Control } from 'react-hook-form';
import { NEFormData } from '../../../types';

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  control: Control<NEFormData, any>
  toggleName: string
  indexShelf: number
  indexSlot: number
  indexPort: number
  registerName: Path<T>;
  labelName: string;
}

export const ToggleComponent = <T extends FieldValues>({ register, control, indexShelf, indexSlot, indexPort, registerName, labelName }: Props<T>) => {

    const currentValue = useWatch({
      control,
      name: `subracks.${indexShelf}.slots.${indexSlot}.board.ports.${indexPort}.path.available`,
    })

  return (
    <label className='flex items-center gap-2 cursor-pointer'>
      <span className='text-sm uppercase'>{labelName}</span>
      <span className='relative inline-block w-12 h-6'>
        <input
          type='checkbox'
          className='peer opacity-0 w-0 h-0'
          defaultChecked={true}
          checked={currentValue}
          {...register(registerName)}  // Aquí se pasa la ruta dinámica
        />
        <span className='absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-colors duration-300 peer-checked:bg-blue-500'></span>
        <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-6'></span>
      </span>
    </label>
  );
};

// import { NEFormData } from '../../../types';
// import { UseFormRegister } from 'react-hook-form';

// interface Props {
//     register: UseFormRegister<NEFormData>;
//     registerName: string;
//   labelName: string;
// }

// export const ToggleComponent = ({ register, registerName, labelName }: Props) => {
//   // const [enabled, setEnabled] = useState<boolean>(true)

//   return (
//     <label className='flex items-center gap-2 cursor-pointer'>
//       {/* Texto descriptivo */}
//       <span className='text-sm uppercase'>{labelName}</span>
//       {/* Switch */}
//       <span className='relative inline-block w-12 h-6'>
//         <input
//           type='checkbox'
//           className='peer opacity-0 w-0 h-0'
//           {...register(registerName)}
//           // checked={enabled}
//           // onChange={() => setEnabled(!enabled)}
//           // aria-label='Toggle disponible'
//         />
//         {/* Fondo del switch */}
//         <span className='absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-colors duration-300 peer-checked:bg-blue-500'></span>
//         {/* "Thumb" del switch */}
//         <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-6'></span>
//       </span>
//     </label>
//   )
// }
