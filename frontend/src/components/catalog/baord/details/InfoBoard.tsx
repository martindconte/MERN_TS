import { regExHelper } from '../../../../helpers';
import { BoardType } from '../../../../types';

interface Props {
  data: BoardType;
}

export const InfoBoard = ({ data }: Props) => {
  return (
    <div className="bg-white px-3 py-4 rounded-lg text-sm">
      {(Object.keys(data) as (keyof BoardType)[]).map(key => {
        if (key === 'vendor') {
          const value = data[key];
          return (
            <p key={key} className="break-words">
              <strong className="uppercase mr-1">{key}:</strong>
              {value?.vendorName}
            </p>
          );
        } else if (key !== 'ports' && key !== 'bitsRates') {
          const value = data[key];
          const isDeleted = key === 'boardName' || key === 'partNumber' ? regExHelper.containsDeleteSequence( value as string) : false
          return (
            <p key={key} className="break-words">
              <strong className="uppercase mr-1">{key}: </strong><span className={`${ isDeleted ? 'bg-red-300 px-2 py-1 rounded-md' : ''}`}>{value instanceof Date ? value.toLocaleString() : value?.toString()}</span>
            </p>
          );
        }
      })}
    </div>
  );
};
