import { Link, useLocation, useParams } from 'react-router-dom';
import { keyToShowInTable } from '../../../components/shared/table/keysToShowInTable';
import { BtnNavTransceiver, Spinner } from '../../../components';
import { useTransceiver } from '../../../hook';
import { useMemo } from 'react';


//todo: rearmar en componentes y reutilizar las interfaces (Rearmar como DetailBoard)
interface Categories {
  SDH: string[];
  SONNET: string[];
  ETHERNET: string[];
  FLEXE: string[];
  SAN: string[];
  OTN: string[];
  VIDEO: string[];
}

const colors = [
  'bg-red-500', 'bg-red-400', 'bg-red-300', 'bg-red-200',
  'bg-orange-500', 'bg-orange-400', 'bg-orange-300', 'bg-orange-200',
  'bg-amber-500', 'bg-amber-400', 'bg-amber-300', 'bg-amber-200',
  'bg-yellow-500', 'bg-yellow-400', 'bg-yellow-300', 'bg-yellow-200',
  'bg-lime-500', 'bg-lime-400', 'bg-lime-300', 'bg-lime-200',
  'bg-green-500', 'bg-green-400', 'bg-green-300', 'bg-green-200',
  'bg-emerald-500', 'bg-emerald-400', 'bg-emerald-300', 'bg-emerald-200',
  'bg-teal-500', 'bg-teal-400', 'bg-teal-300', 'bg-teal-200',
  'bg-cyan-500', 'bg-cyan-400', 'bg-cyan-300', 'bg-cyan-200',
  'bg-sky-500', 'bg-sky-400', 'bg-sky-300', 'bg-sky-200',
  'bg-blue-500', 'bg-blue-400', 'bg-blue-300', 'bg-blue-200',
  'bg-indigo-500', 'bg-indigo-400', 'bg-indigo-300', 'bg-indigo-200',
  'bg-violet-500', 'bg-violet-400', 'bg-violet-300', 'bg-violet-200',
  'bg-purple-500', 'bg-purple-400', 'bg-purple-300', 'bg-purple-200',
  'bg-fuchsia-500', 'bg-fuchsia-400', 'bg-fuchsia-300', 'bg-fuchsia-200',
  'bg-pink-500', 'bg-pink-400', 'bg-pink-300', 'bg-pink-200',
  'bg-rose-500', 'bg-rose-400', 'bg-rose-300', 'bg-rose-200',
  'bg-slate-500', 'bg-slate-400', 'bg-slate-300', 'bg-slate-200',
  'bg-gray-500', 'bg-gray-400', 'bg-gray-300', 'bg-gray-200',
  'bg-zinc-500', 'bg-zinc-400', 'bg-zinc-300', 'bg-zinc-200',
  'bg-neutral-500', 'bg-neutral-400', 'bg-neutral-300', 'bg-neutral-200',
  'bg-stone-500', 'bg-stone-400', 'bg-stone-300', 'bg-stone-200'
];

const categories: Categories = {
  OTN: [
    'OTS', 'OMS', 'OSC', 'OCH', 'OTU1', 'OTU2', 'OTU3', 'OTU4', 'OTUCn', 'OTU25', 'OTU50', 'ODU0', 'ODU1', 'ODU2',
    'ODU2e', 'ODU3', 'ODU4', 'ODUflex', 'ODUCn', 'OPU0', 'OPU1', 'OPU2', 'OPU2e', 'OPU3', 'OPU4', 'OPUflex', 'OPUCn'
  ],
  SDH: ["STM-1", "STM-4", "STM-16", "STM-64"],
  SONNET: ["OC-3", "OC-12", "OC-48", "OC-192"],
  ETHERNET: ["FE", "GE", "10GE WAN", "10GE LAN", "25GE", "40GE", "50GE", "100GE", "200GE", "400GE"],
  FLEXE: ["FlexE 100G unaware", "FlexE 200G unaware"],
  SAN: ["FDDI", "ESCON", "FC100/FICON", "FC200/FICON Express", "FC400/FICON4G", "FC800/FICON8G", "FC1200/FICON10G", "FC1600", "FC3200"],
  VIDEO: ["DVB-ASI", "SD-SDI", "HD-SDI", "HD-SDIRBR", "3G-SDI", "3G-SDIRBR"]
};

const groupBitRates = (data: string[]): { [key in keyof Categories]: string[] } => {
  return Object.keys(categories).reduce((acc, category) => {
    acc[category as keyof Categories] = data.filter(service => categories[category as keyof Categories].includes(service));
    return acc;
  }, {} as { [key in keyof Categories]: string[] });
};

//TODO: REVOLVER PROBLEMA CON VENDOR SALE [object Object]
export const DetailsTransceiverView = () => {

  const transceiverKeys = keyToShowInTable['catalogTransceiver']
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const { transceiverId } = useParams<{ transceiverId: string }>();
  const { queryTransceiver } = useTransceiver({ id: transceiverId!, searchParams: search })

  const groupedBitRates = useMemo(() => {
    return queryTransceiver.data ? groupBitRates(queryTransceiver.data.bitsRates) : {} as { [key in keyof Categories]: string[] };
  }, [queryTransceiver.data])

  if (queryTransceiver.isLoading) return <Spinner />;
  if (!queryTransceiver.data) return <div className="flex-1 bg-stone-900 text-4xl text-white font-oswald uppercase font-bold text-center px-3 py-4">No se Encontraron datos</div>;

  return (

    <main className="flex-1 bg-stone-900 font-roboto">
      {
        queryParams.get('isDeleted') === 'true' &&
        <div className="text-white bg-red-600 shadow-xl shadow-red-900 px-4 py-2 mx-auto my-6 text-center uppercase font-semibold w-3/5 rounded-lg">
          <p>El Transceiver consultado se encuentra eliminado. Aun Puede volver a habilitarlo</p>
        </div>
      }
      <h2 className="uppercase text-2xl font-extrabold text-white px-4 py-4">
        <span className="text-blue-500">Datos de </span>Transceiver/Modulo:
      </h2>
      <div className="flex align-top font-oswald gap-3">
        <div className="w-80 h-fit bg-gray-50 px-3 py-4 rounded-lg text-sm space-y-2">
          {
            transceiverKeys.map(({ key, label }) => {
              if (key === 'vendor') {
                const value = queryTransceiver.data?.[key]
                return (
                  <p key={key} className="break-words">
                    <strong className="uppercase mr-1">{label}:</strong>{value?.vendorName}</p>
                );
              }
              const value = queryTransceiver.data![key as keyof typeof queryTransceiver.data];
              return (
                <p key={key} className="break-words">
                  <strong className="uppercase mr-1">{label}:</strong> {value instanceof Date ? value.toLocaleString() : value?.toString()}
                </p>
              );
            })
          }
        </div>
        <div className="bg-white px-3 py-4 rounded-lg text-sm">
          {
            Object.keys(groupedBitRates).map((category: string) => (
              <div
                key={category}
                className="flex my-1 px-2 py-2 border border-gray-400 rounded-lg"
              >
                <p className="font-bold w-20">{category}</p>
                <ul className="grid grid-cols-3 gap-1 content-start">
                  {
                    groupedBitRates[category as keyof Categories].sort((a: string, b: string) => a.localeCompare(b)).map((bitRate: string) => (
                      <li
                        key={bitRate}
                        className={`px-2 py-2 mx-1 text-center rounded-md cursor-auto ${colors[Math.floor(Math.random() * colors.length)]}`}
                      >
                        {bitRate}
                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>
        <div className="h-fit flex gap-4">
          <Link
            to={`/catalog/transceiver/edit/${transceiverId}`}
            className="bg-blue-600 text-center text-sm px-2 py-1 w-48 rounded-lg font-bold uppercase hover:bg-blue-800 hover:text-white">Editar</Link>
        </div>
      </div>
      <div className='w-1/4 mx-auto'>
        <BtnNavTransceiver />
      </div>
    </main>
  );
}
