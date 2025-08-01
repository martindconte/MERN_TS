import { FieldErrors } from 'react-hook-form'
import { NEFormData } from '../../../../types'

interface Props {
  errors: FieldErrors<NEFormData>
}

export const ErrorShelfsComponent = ({ errors }: Props) => {
  return (
    Array.isArray(errors.subracks) &&
    errors.subracks.length > 0 && (
      <div className='bg-red-100 text-red-600 p-2 rounded'>
        <p className='font-semibold'>Por favor, revisa los siguientes errores:</p>
        <ul className='list-disc list-inside'>
          {errors.subracks.map((subrackError, index) => {
            if (!subrackError) return null
            return (
              <li key={index} className='mt-1'>
                {index}
                {subrackError.shelfNumber?.message && (
                  <p className='flex items-center gap-1'>
                    <span className='material-symbols-outlined text-sm'>warning</span>
                    Shelf Number: {subrackError.shelfNumber.message}
                  </p>
                )}
                {subrackError.shelfName?.message && (
                  <p className='flex items-center gap-1'>
                    <span className='material-symbols-outlined text-sm'>warning</span>
                    Shelf Name: {subrackError.shelfName.message}
                  </p>
                )}
                {subrackError.position?.message && (
                  <p className='flex items-center gap-1'>
                    <span className='material-symbols-outlined text-sm'>warning</span>
                    Position: {subrackError.position.message}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  )
}
