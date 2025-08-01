import { useState } from 'react'
import { FieldArrayWithId, UseFieldArrayRemove, useFormContext } from 'react-hook-form'
import { NEFormData, SubrackType } from '../../../../types'
import { ListOfShelfs, ShelfDetails, ErrorShelfsComponent } from './'

interface Props {
  fields: FieldArrayWithId<NEFormData, 'subracks', 'key'>[]
  subracksAdded: SubrackType[]
  remove: UseFieldArrayRemove
}

export enum Status {
  new = 'NEW',
  change = 'CHANGE',
  delete = 'DELETE',
}

export const Shelfs = ({ fields, subracksAdded, remove }: Props) => {
  // state para almacenar el key (clave unica de react hook form que asigna a cada subrack) del subrack seleccionado
  const [subrackKeySelected, setSubrackKeySelected] = useState<string | undefined>(undefined)

  const {
    formState: { errors },
  } = useFormContext<NEFormData>()

  const handleSubrackKeySelected = (keyField: string | undefined) => {
    if (keyField !== subrackKeySelected) setSubrackKeySelected(keyField)
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* Listo los errores */}
      <ErrorShelfsComponent errors={errors} />
      {/* List of Subracks */}
      <div className='flex gap-3 px-3 py-2 items-center justify-start overflow-x-auto'>
        {fields.map((field, index) => (
          // listado de los subracks agregados al NE
          <ListOfShelfs
            key={field.key}
            index={index}
            remove={remove}
            isSelected={subrackKeySelected === field.key}
            onSelectShelf={() => handleSubrackKeySelected(field.key)}
          />
        ))}
      </div>

      {/* Detalle del subrack seleccionado */}
      {fields.map(
        (field, index) =>
          subrackKeySelected &&
          subrackKeySelected === field.key && (
            <ShelfDetails key={`details-${field.key}`} subracksAdded={subracksAdded} id={field.id} indexShelf={index} />
          ),
      )}
    </div>
  )
}
