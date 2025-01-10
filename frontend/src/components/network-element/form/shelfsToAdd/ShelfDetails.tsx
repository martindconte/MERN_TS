import { Control, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form';
import { SubrackType, NEFormData, LogicalSignal } from '../../../../types';
import { ShelfInfo } from './ShelfInfo';
import { ShelfDataInputs } from './ShelfDataInputs';
import { NESlotInput } from './NESlotInput';
import { useState } from 'react';

interface Props {
  subracksAdded: SubrackType[];
  register: UseFormRegister<NEFormData>;
  control: Control<NEFormData, any>;
  setValue: UseFormSetValue<NEFormData>;
  id: string;
  index: number;
}
enum Status {
  new = 'NEW',
  change = 'CHANGE',
  delete = 'DELETE',
}

export const ShelfDetails = ({ register, control, subracksAdded, id, index, setValue }: Props) => {
  const subrackInfo = subracksAdded.find(subrack => subrack.id === id);
  const [baordsStatus, setBaordsStatus] = useState<Map<number, Status>>(new Map());

  const subrack = useWatch({
    control,
    name: `subracks.${index}`,
  });

  if (!subrackInfo) return <p>Error al cargar información del subrack...</p>;

  // Auxiliares para validación y estado
  const isBoardValid = (indexSlot: number) => {
    const board = subrack.slots[indexSlot]?.board;
    return board && board.id !== '' && Array.isArray(board.ports) && board.ports.length === 0;
  };

  const getBoardStatus = (indexSlot: number) => baordsStatus.get(indexSlot);

  const updateBoardStatus = (indexSlot: number, status: Status) => {
    setBaordsStatus(prev => new Map(prev).set(indexSlot, status));
  };

  const removeBoardStatus = (indexSlot: number) => {
    setBaordsStatus(prev => {
      const updated = new Map(prev);
      updated.delete(indexSlot);
      return updated;
    });
  };

  console.log(subrack);

  // Handlers consolidados
  const handleBoardAction = (action: 'confirm' | 'delete' | 'change', indexSlot: number) => {
    switch (action) {
      case 'confirm': {
        const boardId = subrack.slots[indexSlot].board?.id;
        if (!boardId) return;
        const ports = subrackInfo.slots[indexSlot].boards
          ?.find(board => board.id === boardId)
          ?.ports.map(port => ({
            port: port.port,
            physical: port.physical,
            NMS: port.NMS,
            type: port.type,
            fullName: port.fullName,
            equipment: '',
            logicalFacilities: {} as Record<LogicalSignal, string[]>,
          }));
        setValue(`subracks.${index}.slots.${indexSlot}.board.ports`, ports || []);
        updateBoardStatus(indexSlot, Status.new);
        break;
      }
      case 'delete':
        setValue(`subracks.${index}.slots.${indexSlot}.board`, { id: '', ports: [] });
        removeBoardStatus(indexSlot);
        break;
      // case 'change': {
      //   const boardId = subrack.slots[indexSlot].board?.id;
      //   if (boardId) {
      //     // const ports = subrackInfo.slots[indexSlot].boards
      //     //   ?.find(board => board.id === boardId)
      //     //   ?.ports.map(port => ({
      //     //     port: port.port,
      //     //     physical: port.physical,
      //     //     NMS: port.NMS,
      //     //     type: port.type,
      //     //     fullName: port.fullName,
      //     //     equipment: '',
      //     //     logicalFacilities: {} as Record<LogicalSignal, string[]>,
      //     //   })) || [];
      //     setValue(`subracks.${index}.slots.${indexSlot}.board`, { id: '', ports: [] });
      //     // setValue(`subracks.${index}.slots.${indexSlot}.board`, { id: '', ports });
      //     updateBoardStatus(indexSlot, Status.change);
      //   }
      //   break;
      // }
    }
  };

  // Renderizar acciones condicionales
  const renderActions = (indexSlot: number) => {
    const status = getBoardStatus(indexSlot);
    if (status === Status.new) {
      return (
        <div className='flex flex-wrap items-center gap-2'>
          <button type='button' className='bg-sky-400 uppercase px-2 py-1 rounded text-xs hover:bg-sky-800 hover:text-white'>
            Ver Ports
          </button>
          <button
            type='button'
            className='bg-emerald-400 uppercase px-2 py-1 rounded text-xs hover:bg-emerald-800 hover:text-white'
            onClick={() => updateBoardStatus( indexSlot, Status.change )}
            // onClick={() => handleBoardAction('change', indexSlot)}
          >
            Modificar
          </button>
          <button
            type='button'
            className='bg-red-400 uppercase px-2 py-1 rounded text-xs hover:bg-red-800 hover:text-white'
            onClick={() => handleBoardAction('delete', indexSlot)}
          >
            Eliminar
          </button>
        </div>
      );
    }
    if (status === Status.change) {
      return (
        <button
        type='button'
        className='bg-fuchsia-400 uppercase px-2 py-1 rounded text-xs hover:bg-fuchsia-800 hover:text-white'
        onClick={() => handleBoardAction('confirm', indexSlot)}
      >
        Confirmar Cambio
      </button>
      )
    }
    return null;
  };

  return (
    <div className='flex flex-col gap-2'>
      <ShelfInfo
        modelName={subrackInfo.modelName}
        observations={subrackInfo.observations}
        partNumber={subrackInfo.partNumber}
        subrackFamily={subrackInfo.subrackFamily}
        subrackType={subrackInfo.subrackType}
        vendorName={subrackInfo.vendor.vendorName || 's/d'}
      />
      <ShelfDataInputs register={register} indexShelf={index} />
      <div className='text-sm font-roboto_condensed flex flex-col gap-1 border border-black px-2 py-1 rounded-lg bg-white h-[390px] overflow-auto'>
        {subrackInfo?.slots.map((slot, indexSlot) => (
          <div key={slot.number} className='flex gap-3 items-center'>
            <NESlotInput
              indexShelf={index}
              indexSlot={indexSlot}
              register={register}
              slot={slot}
              isBoardConfirm={getBoardStatus(indexSlot) === Status.new}
            />
            {isBoardValid(indexSlot) && getBoardStatus(indexSlot) === undefined && (
              <button
                type='button'
                className='bg-orange-400 uppercase px-2 py-1 rounded text-xs'
                onClick={() => handleBoardAction('confirm', indexSlot)}
              >
                Confirmar Placa
              </button>
            )}
            {renderActions(indexSlot)}
          </div>
        ))}
      </div>
    </div>
  );
};


// import { useState } from 'react';
// import { Control, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form';
// import { SubrackType, NEFormData } from '../../../../types';
// import { ShelfInfo } from './ShelfInfo';
// import { ShelfDataInputs } from './ShelfDataInputs';
// import { NESlotInput } from './NESlotInput';

// interface Props {
//   subracksAdded: SubrackType[];
//   register: UseFormRegister<NEFormData>;
//   control: Control<NEFormData, any>;
//   setValue: UseFormSetValue<NEFormData>;
//   id: string;
//   index: number;
// }

// export const ShelfDetails = ({ register, control, subracksAdded, id, index, setValue }: Props) => {
//   const [boardToConfirm, setBoardToConfirm] = useState<{ idBoard: string; indexSlot: number }[]>([]);
//   const [boardToModify, setBoardToModify] = useState<{ idBoard: string; indexSlot: number }[]>([]);
//   const subrackInfo = subracksAdded.find(subrack => subrack.id === id);

//   const subrack = useWatch({
//     control,
//     name: `subracks.${index}`,
//   });

//   const handleChangeBoard = (idBoard: string, indexSlot: number) => {
//     const currentBoard = subrack.slots[indexSlot].board?.id;

//     //* ANTES DE CONFIRMAR LA PLACA EN EL SLOT
//     if (idBoard === '' && currentBoard !== undefined && !boardToModify.some( item => item.indexSlot === indexSlot )) {
//       // Caso: Slot con HW. Se Elimina el HW
//       setBoardToConfirm((prev) => prev.filter((item) => item.indexSlot !== indexSlot));
//       setBoardToModify((prev) => prev.filter((item) => item.indexSlot !== indexSlot));
//       setValue(`subracks.${index}.slots.${indexSlot}.board.id`, idBoard);
//       return;
//     }

//     if (idBoard !== '' && currentBoard === undefined) {
//       // Caso: Slots EMPTY. Se selecciona una placa por primera vez.
//       setBoardToConfirm(prev => [...prev, { idBoard, indexSlot }]);
//       setBoardToModify(prev => prev.filter(item => item.indexSlot !== indexSlot));
//       setValue(`subracks.${index}.slots.${indexSlot}.board.id`, idBoard);
//       return;
//     }

//     if (idBoard !== '' && currentBoard !== idBoard) {
//       // Caso: Cambio de placa antes de confirmar
//       setBoardToConfirm(prev => [...prev.filter(item => item.indexSlot !== indexSlot), { idBoard, indexSlot }]);
//       setBoardToModify(prev => prev.filter(item => item.indexSlot !== indexSlot));
//       setValue(`subracks.${index}.slots.${indexSlot}.board.id`, idBoard);
//     }
//   };

//   const handleBoardConfirm = (indexSlot: number) => {
//     // Confirmar placa y mover de "Confirmar" a "Modificar"
//     setBoardToConfirm(prev => prev.filter(item => item.indexSlot !== indexSlot));
//     const confirmedBoard = boardToConfirm.find(item => item.indexSlot === indexSlot);
//     if (confirmedBoard) {
//       setBoardToModify(prev => [...prev, confirmedBoard]);
//     }
//     setValue(`subracks.${index}.slots.${indexSlot}.board.ports`, []); // Resetea los puertos si es necesario
//   };

//   console.log({boardToConfirm, boardToModify});

//   if (!subrackInfo) return <p>Error Al Cargar información del Subrack...</p>;

//   return (
//     <div className='flex flex-col gap-2'>
//       <ShelfInfo
//         modelName={subrackInfo.modelName}
//         observations={subrackInfo.observations}
//         partNumber={subrackInfo.partNumber}
//         subrackFamily={subrackInfo.subrackFamily}
//         subrackType={subrackInfo.subrackType}
//         vendorName={subrackInfo.vendor.vendorName || 's/d'}
//       />
//       <ShelfDataInputs register={register} indexShelf={index} />
//       <div className='text-sm font-roboto_condensed flex flex-col gap-1 border border-black px-2 py-1 rounded-lg bg-white h-[390px] overflow-auto'>
//         {subrackInfo?.slots.map((slot, indexSlot) => (
//           <div key={slot.number} className='flex gap-3 items-center'>
//             <NESlotInput
//               indexShelf={index}
//               indexSlot={indexSlot}
//               register={register}
//               slot={slot}
//               handleChangeBoard={handleChangeBoard}
//             />
//             {/* Mostrar botón de "Confirmar Placa" */}
//             {boardToConfirm.some(item => item.indexSlot === indexSlot) && (
//               <button
//                 type='button'
//                 className='bg-orange-400 uppercase px-2 py-1 rounded text-xs'
//                 onClick={() => handleBoardConfirm(indexSlot)}
//               >
//                 Confirmar Placa
//               </button>
//             )}
//             {/* Mostrar botón de "Modificar Placa" */}
//             {boardToModify.some(item => item.indexSlot === indexSlot) && (
//               <button
//                 type='button'
//                 className='bg-blue-400 uppercase px-2 py-1 rounded text-xs'
//                 onClick={() => {
//                   // Acción para modificar placa
//                   console.log('Modificar placa en slot:', indexSlot);
//                 }}
//               >
//                 Ver Puertos
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// import { Control, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form'
// import { SubrackType, NEFormData, LogicalSignal } from '../../../../types'
// import { ShelfInfo } from './ShelfInfo'
// import { ShelfDataInputs } from './ShelfDataInputs'
// import { NESlotInput } from './NESlotInput'
// import { useState } from 'react'

// interface Props {
//   subracksAdded: SubrackType[]
//   register: UseFormRegister<NEFormData>
//   control: Control<NEFormData, any>
//   setValue: UseFormSetValue<NEFormData>
//   id: string
//   index: number
// }

// interface BoardStatus {
//   indexSlot: number
//   status: Status
// }

// enum Status {
//   new = 'NEW',
//   change = 'CHANGE',
//   delete = 'DELETE',
// }

// export const ShelfDetails = ({ register, control, subracksAdded, id, index, setValue }: Props) => {
//   const subrackInfo = subracksAdded.find(subrack => subrack.id === id)

//   const [baordsStatus, setBaordsStatus] = useState<BoardStatus[]>([])

//   const subrack = useWatch({
//     control,
//     name: `subracks.${index}`,
//   })

//   if (!subrackInfo) return <p>Error Al Cargar información del Subrack...</p>

//   const handleBoardConfirm = (indexSlot: number) => {
//     const boardId = subrack.slots[indexSlot].board?.id
//     if (!boardId) return
//     const ports = subrackInfo.slots[indexSlot].boards
//       ?.find(board => board.id === boardId)
//       ?.ports.map(port => ({
//         port: port.port,
//         physical: port.physical,
//         NMS: port.NMS,
//         type: port.type,
//         fullName: port.fullName,
//         equipment: '',
//         logicalFacilities: {} as Record<LogicalSignal, string[]>,
//       }))
//     setValue(`subracks.${index}.slots.${indexSlot}.board.ports`, ports || [])
//     setBaordsStatus(prev => [...prev, { indexSlot, status: Status.new }])
//   }

//   const handleDeleteBoard = (indexSlot: number) => {
//     if (subrack.slots[indexSlot].board?.id) {
//       setValue(`subracks.${index}.slots.${indexSlot}.board`, { id: '', ports: [] })
//       setBaordsStatus(prev => prev.filter(status => status.indexSlot !== indexSlot))
//     }
//   }

//   const handleChangeBoard = (indexSlot: number) => {
//     setBaordsStatus(prev => prev.map(status => (status.indexSlot === indexSlot ? { ...status, status: Status.change } : status)))
//   }

//   const handleChangeBoard2 = (indexSlot: number) => {
//     if (subrack.slots[indexSlot].board?.id) {
//       const ports =
//         subrackInfo.slots[indexSlot].boards
//           ?.find(board => board.id === subrack.slots[indexSlot].board?.id)
//           ?.ports.map(port => ({
//             port: port.port,
//             physical: port.physical,
//             NMS: port.NMS,
//             type: port.type,
//             fullName: port.fullName,
//             equipment: '',
//             logicalFacilities: {} as Record<LogicalSignal, string[]>,
//           })) || [] // Asegurarse de que ports sea un array

//       setValue(`subracks.${index}.slots.${indexSlot}.board`, {
//         id: '',
//         ports: ports,
//       })
//     }
//   }

//   return (
//     <div className='flex flex-col gap-2'>
//       <ShelfInfo
//         modelName={subrackInfo.modelName}
//         observations={subrackInfo.observations}
//         partNumber={subrackInfo.partNumber}
//         subrackFamily={subrackInfo.subrackFamily}
//         subrackType={subrackInfo.subrackType}
//         vendorName={subrackInfo.vendor.vendorName || 's/d'}
//       />
//       <ShelfDataInputs register={register} indexShelf={index} />
//       <div className='text-sm font-roboto_condensed flex flex-col gap-1 border border-black px-2 py-1 rounded-lg bg-white h-[390px] overflow-auto'>
//         {subrackInfo?.slots.map((slot, indexSlot) => (
//           <div key={slot.number} className='flex gap-3 items-center'>
//             <NESlotInput
//               indexShelf={index}
//               indexSlot={indexSlot}
//               register={register}
//               slot={slot}
//               isBoardConfirm={ baordsStatus.find( boardStatus => boardStatus.indexSlot === indexSlot )?.status !== 'CHANGE' }
//             />
//             {/* Mostrar botón de "Confirmar Placa" */}
//             {(subrack.slots[indexSlot].board &&
//               subrack.slots[indexSlot].board.id !== '' &&
//               subrack.slots[indexSlot].board.ports &&
//               subrack.slots[indexSlot].board.ports.length === 0) && (
//                 <button type='button' className='bg-orange-400 uppercase px-2 py-1 rounded text-xs' onClick={() => handleBoardConfirm(indexSlot)}>
//                   Confirmar Placa
//                 </button>
//               )}
//             {baordsStatus.find(status => status.indexSlot === indexSlot)?.status === 'NEW' && (
//               <div className='flex flex-wrap items-center gap-2'>
//                 <button type='button' className='bg-sky-400 uppercase px-2 py-1 rounded text-xs hover:bg-sky-800 hover:text-white'>
//                   Ver Ports
//                 </button>
//                 <button
//                   type='button'
//                   className='bg-emerald-400 uppercase px-2 py-1 rounded text-xs hover:bg-emerald-800 hover:text-white'
//                   onClick={() => handleChangeBoard(indexSlot)}
//                 >
//                   Modificar
//                 </button>
//                 <button
//                   type='button'
//                   className='bg-red-400 uppercase px-2 py-1 rounded text-xs hover:bg-red-800 hover:text-white'
//                   onClick={() => handleDeleteBoard(indexSlot)}
//                 >
//                   Eliminar
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
// // import { useState } from 'react';
// // import { Control, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form';
// // import { SubrackType, NEFormData } from '../../../../types';
// // import { ShelfInfo } from './ShelfInfo';
// // import { ShelfDataInputs } from './ShelfDataInputs';
// // import { NESlotInput } from './NESlotInput';

// // interface Props {
// //   subracksAdded: SubrackType[];
// //   register: UseFormRegister<NEFormData>;
// //   control: Control<NEFormData, any>;
// //   setValue: UseFormSetValue<NEFormData>;
// //   id: string;
// //   index: number;
// // }

// // export const ShelfDetails = ({ register, control, subracksAdded, id, index, setValue }: Props) => {
// //   const [boardToConfirm, setBoardToConfirm] = useState<{ idBoard: string; indexSlot: number }[]>([]);
// //   const [boardToModify, setBoardToModify] = useState<{ idBoard: string; indexSlot: number }[]>([]);
// //   const subrackInfo = subracksAdded.find(subrack => subrack.id === id);

// //   const subrack = useWatch({
// //     control,
// //     name: `subracks.${index}`,
// //   });

// //   const handleChangeBoard = (idBoard: string, indexSlot: number) => {
// //     const currentBoard = subrack.slots[indexSlot].board?.id;

// //     //* ANTES DE CONFIRMAR LA PLACA EN EL SLOT
// //     if (idBoard === '' && currentBoard !== undefined && !boardToModify.some( item => item.indexSlot === indexSlot )) {
// //       // Caso: Slot con HW. Se Elimina el HW
// //       setBoardToConfirm((prev) => prev.filter((item) => item.indexSlot !== indexSlot));
// //       setBoardToModify((prev) => prev.filter((item) => item.indexSlot !== indexSlot));
// //       setValue(`subracks.${index}.slots.${indexSlot}.board.id`, idBoard);
// //       return;
// //     }

// //     if (idBoard !== '' && currentBoard === undefined) {
// //       // Caso: Slots EMPTY. Se selecciona una placa por primera vez.
// //       setBoardToConfirm(prev => [...prev, { idBoard, indexSlot }]);
// //       setBoardToModify(prev => prev.filter(item => item.indexSlot !== indexSlot));
// //       setValue(`subracks.${index}.slots.${indexSlot}.board.id`, idBoard);
// //       return;
// //     }

// //     if (idBoard !== '' && currentBoard !== idBoard) {
// //       // Caso: Cambio de placa antes de confirmar
// //       setBoardToConfirm(prev => [...prev.filter(item => item.indexSlot !== indexSlot), { idBoard, indexSlot }]);
// //       setBoardToModify(prev => prev.filter(item => item.indexSlot !== indexSlot));
// //       setValue(`subracks.${index}.slots.${indexSlot}.board.id`, idBoard);
// //     }
// //   };

// //   const handleBoardConfirm = (indexSlot: number) => {
// //     // Confirmar placa y mover de "Confirmar" a "Modificar"
// //     setBoardToConfirm(prev => prev.filter(item => item.indexSlot !== indexSlot));
// //     const confirmedBoard = boardToConfirm.find(item => item.indexSlot === indexSlot);
// //     if (confirmedBoard) {
// //       setBoardToModify(prev => [...prev, confirmedBoard]);
// //     }
// //     setValue(`subracks.${index}.slots.${indexSlot}.board.ports`, []); // Resetea los puertos si es necesario
// //   };

// //   console.log({boardToConfirm, boardToModify});

// //   if (!subrackInfo) return <p>Error Al Cargar información del Subrack...</p>;

// //   return (
// //     <div className='flex flex-col gap-2'>
// //       <ShelfInfo
// //         modelName={subrackInfo.modelName}
// //         observations={subrackInfo.observations}
// //         partNumber={subrackInfo.partNumber}
// //         subrackFamily={subrackInfo.subrackFamily}
// //         subrackType={subrackInfo.subrackType}
// //         vendorName={subrackInfo.vendor.vendorName || 's/d'}
// //       />
// //       <ShelfDataInputs register={register} indexShelf={index} />
// //       <div className='text-sm font-roboto_condensed flex flex-col gap-1 border border-black px-2 py-1 rounded-lg bg-white h-[390px] overflow-auto'>
// //         {subrackInfo?.slots.map((slot, indexSlot) => (
// //           <div key={slot.number} className='flex gap-3 items-center'>
// //             <NESlotInput
// //               indexShelf={index}
// //               indexSlot={indexSlot}
// //               register={register}
// //               slot={slot}
// //               handleChangeBoard={handleChangeBoard}
// //             />
// //             {/* Mostrar botón de "Confirmar Placa" */}
// //             {boardToConfirm.some(item => item.indexSlot === indexSlot) && (
// //               <button
// //                 type='button'
// //                 className='bg-orange-400 uppercase px-2 py-1 rounded text-xs'
// //                 onClick={() => handleBoardConfirm(indexSlot)}
// //               >
// //                 Confirmar Placa
// //               </button>
// //             )}
// //             {/* Mostrar botón de "Modificar Placa" */}
// //             {boardToModify.some(item => item.indexSlot === indexSlot) && (
// //               <button
// //                 type='button'
// //                 className='bg-blue-400 uppercase px-2 py-1 rounded text-xs'
// //                 onClick={() => {
// //                   // Acción para modificar placa
// //                   console.log('Modificar placa en slot:', indexSlot);
// //                 }}
// //               >
// //                 Ver Puertos
// //               </button>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };
