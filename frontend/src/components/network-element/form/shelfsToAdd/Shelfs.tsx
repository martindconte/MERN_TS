import { useState } from 'react';
import { Control, FieldArrayWithId, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form';
import { NEFormData, SubrackType } from '../../../../types';
import { ListOfShelfs } from './ListOfShelfs';
import { ShelfDetails } from './ShelfDetails';

interface Props {
  fields: FieldArrayWithId<NEFormData, "subracks", "key">[];
  subracksAdded: SubrackType[];
  control: Control<NEFormData, any>;
  register: UseFormRegister<NEFormData>;
  setValue: UseFormSetValue<NEFormData>;
}

export enum Status {
  new = 'NEW',
  change = 'CHANGE',
  delete = 'DELETE',
}

export const Shelfs = ({ fields, subracksAdded, register, control, setValue }: Props) => {
  // state para almacenar el key (clave unica de react hook form que asigna a cada subrack) del subrack seleccionado
  const [subrackKeySelected, setSubrackKeySelected] = useState<string | undefined>(undefined);

  const handleSubrackKeySelected = (keyField: string | undefined) => {
    if( keyField !== subrackKeySelected ) setSubrackKeySelected(keyField);
  };

  const subracks = useWatch({
    control,
    name: 'subracks'
  })

  console.log(subracks);

  return (
    <div className="flex flex-col gap-4">
      {/* List of Subracks */}
      <div className="flex gap-3 px-3 py-2 items-center justify-start overflow-x-auto">
        {fields.map((field, index) => (
          <ListOfShelfs
            key={field.key}
            control={control}
            index={index}
            isSelected={subrackKeySelected === field.key}
            onSelectShelf={() => handleSubrackKeySelected(field.key)}
          />
        ))}
      </div>

      {/* //todo: Revisar codigo para evitar el map sobre fields... Ver si es posible pasar directamente el key del subrack a renderizar  */}
      {/* Subrack Details */}
      {fields.map((field, index) =>
        subrackKeySelected && subrackKeySelected === field.key ? (
          <ShelfDetails
            key={`details-${field.key}`}
            register={register}
            control={control}
            setValue={setValue}
            subracksAdded={subracksAdded}
            id={field.id}
            index={index}
          />
        ) : null
      )}
    </div>
  );
};
