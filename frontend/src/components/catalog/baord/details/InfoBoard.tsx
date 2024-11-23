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
          return (
            <p key={key} className="break-words">
              <strong className="uppercase mr-1">{key}:</strong> {value instanceof Date ? value.toLocaleString() : value?.toString()}
            </p>
          );
        }
      })}
    </div>
  );
};
