import { Link } from 'react-router-dom';
import { BoardType, ICategories } from '../../../../types';

interface Props {
  data: BoardType;
  categories?: ICategories;
}

export const PortsBoardDetails = ({ data: { ports } }: Props) => {
  return (
    <div className="bg-white grow rounded-lg px-3 py-4 h-fit">
      <p className="uppercase font-bold">Ports</p>
      {ports.length > 0 ? (
        <div className="text-xs">
          {ports.map((port, index) => {
            const dataPortField: JSX.Element[] = [];
            return (
              <div key={index + 3000} className="flex border border-gray-400 px-2 py-1 my-1 rounded-lg space-x-2 bg-orange-100 h-40">
                <div className='w-1/6'>
                  <p className="uppercase text-center font-bold mb-2">Informacion</p>
                  {dataPortField}
                </div>
                {Object.keys(port).map((keyPort, index) => {
                  const key = keyPort as keyof typeof port;
                  if (key === 'equipments') {
                    return (
                      <div key={index + 1000} className="overflow-y-auto w-1/4">
                        <p className="uppercase text-center font-bold mb-2">{key}</p>
                        <ul className="flex flex-col space-y-1">
                          {port[key].map((equipment) => (
                            <Link 
                              key={equipment.id}
                              to={`/catalog/transceiver/details/${equipment.id}`}
                              className={`flex items-center justify-between gap-1 px-1 py-1 rounded-md cursor-pointer ${ equipment.partNumber.includes('_DELETED_') ? 'bg-red-400' : "bg-emerald-300"} hover:bg-emerald-600 `}>
                              <p>{equipment.partNumber} {equipment.modelName}</p>
                              <p className="material-symbols-outlined text-sm font-bold cursor-pointer">info</p>
                            </Link>
                          ))}
                        </ul>
                      </div>
                    );
                  } else if (key === 'logicalFacilities') {
                    return (
                      <div key={index + 2000} className="overflow-y-auto grow">
                        <p className="uppercase mb-2 font-bold text-center">{key}</p>
                        {Object.entries(port.logicalFacilities).map(([lpKey, lpValue]) => (
                          <div key={lpKey} className="flex items-center mb-2 space-x-3 border border-black px-2 py-1">
                            <p className="font-bold">{lpKey}</p>
                            {lpValue.length > 0 ? (
                              <ul className="">
                                {lpValue.map((value, index) => (
                                  <li key={index} className="text-sm">
                                    {value}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm italic text-gray-500">No values</p>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  } else {
                    dataPortField.push(
                      <p key={keyPort}>
                        <strong className="uppercase">{key}: </strong>
                        {port[key]}
                      </p>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No se han registrado Puertos para la placa consultada</p>
      )}
    </div>
  );
};
// import { BoardType, EquipmentType, ICategories } from '../../../../types';

// interface Props {
//   data: BoardType;
//   categories?: ICategories;
// }

// export const PortsBoardDetails = ({ data: { ports } }: Props) => {
//   return (
//     <div className="bg-white grow rounded-lg px-3 py-4 h-fit">
//       <p className="uppercase font-bold">Ports</p>
//       {ports.length > 0 ? (
//         <div className="text-sm">
//           {ports.map(port => (
//             <div key={port.port} className='flex px-3 py-1 border border-gray-400 my-1 rounded-lg space-x-4'>
//               {Object.keys(port).map((keyPort, index) => {
//                 const key = keyPort as keyof typeof port;
//                 if (key === 'equipments') {
//                   return (
//                   <div key={index + 1000}>
//                     <p>{ key }</p>
//                     <ul key={index}>
//                       {
//                         port[key].map( equipment => (
//                           <li>
//                             {
//                               Object.entries((equipment) ).map(([ eqKey, value ]) => {
//                                 if ( eqKey === ' vendor' ) {
//                                   const vendorValue = value as EquipmentType['vendor']
//                                   return (
//                                     <p><strong>{ key }: </strong>{ vendorValue.vendorName }</p>
//                                   )
//                                 } else if (eqKey !== 'bitsRates' && eqKey !==' vendor' && typeof value === 'string') {
//                                   return (
//                                     <p key={eqKey}>
//                                       <strong>{eqKey}: </strong>
//                                       {value}
//                                     </p>
//                                   );
//                                 }
//                               })
//                             }
//                           </li>
//                         ))
//                       }
//                     </ul>
//                   </div>
//                   )
//                 } else if (key === 'logicalFacilities') {
//                   return 'TODO LP';
//                 } else {
//                   return (
//                     <p>
//                       <strong className="uppercase">{keyPort}: </strong>
//                       {port[key]}
//                     </p>
//                   );
//                 }
//                 // <p><strong className='uppercase'>{keyPort}</strong>{ port[keyPort] }</p>
//               })}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No se han registrado Puertos para la placa consultada</p>
//       )}
//     </div>
//   );
// };
