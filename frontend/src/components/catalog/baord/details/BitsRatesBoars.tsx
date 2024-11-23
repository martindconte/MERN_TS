import { useMemo } from 'react';
import { BoardType, colors, ICategories } from '../../../../types';
import { groupBitRates } from '../../../../helpers';

interface Props {
  data: BoardType;
}

export const BitsRatesBoars = ({ data }: Props) => {

  const groupedBitRates = useMemo(() => {
    return data ? groupBitRates(data.bitsRates) : ({} as { [key in keyof ICategories]: string[] });
  }, [data]);

  return (
    <div className="bg-white px-3 py-4 rounded-lg text-sm">
      <p className="uppercase font-bold">Señales Soportadas</p>
      {Object.keys(groupedBitRates).map((category: string) => (
        <div key={category} className="flex my-1 px-2 py-2 border border-gray-400 rounded-lg">
          <p className="font-bold w-20">{category}</p>
          <ul className="grid grid-cols-3 gap-1 content-start">
            {groupedBitRates[category as keyof ICategories]
              .sort((a: string, b: string) => a.localeCompare(b))
              .map((bitRate: string) => (
                <li
                  key={bitRate}
                  className={`px-2 py-2 mx-1 text-center rounded-md cursor-auto break-normal ${colors[Math.floor(Math.random() * colors.length)]}`}
                >
                  {bitRate}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};