import { useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { BoardFormData, BoardPortType } from '../../../types';
import { BtnAddPort } from './BtnAddPort';
import { AddPort } from './AddPort';

interface Props {
    requiredFields?: boolean;
}
export const FormBodyBoardPorts = ( { requiredFields }: Props ) => {

    const { control, setValue } = useFormContext<BoardFormData>()

    const { fields, append, remove, move } = useFieldArray( {
        control,
        name: "ports",
    } );

    const ports = useWatch( {
        control,
        name: "ports",
        // defaultValue: [],
    } );

    console.log({ports});

    const physical = useMemo( () => ports?.map( port => port.physical ), [ports] );
    const nms = useMemo( () => ports?.map( port => port.NMS ), [ports] );

    useEffect( () => {
        if ( ports && ports.length > 0 ) {
            ports.forEach( ( port, index ) => {
                const expectedFullName = `${port.NMS}(${port.physical})`;
                if ( port.physical && port.NMS && port.fullName !== expectedFullName ) {
                    setValue( `ports.${index}.fullName`, expectedFullName );
                }
            } );
        }
    }, [physical, nms, setValue] );

    return (
        <div className='font-roboto text-sm px-3 py-2 rounded-lg'>
            <button
                type="button"
                className='font-oswald uppercase flex items-center justify-center gap-2 bg-emerald-500 px-3 py-1 my-2 rounded-md w-full cursor-pointer transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-600/100'
                onClick={() => append( {
                    port: fields.length + 1,
                    type: BoardPortType.client,
                    physical: '',
                    NMS: '',
                    equipments: [],
                    logicalFacilities: {},
                    fullName: ''
                } )}
            >
                Agregar Port <span className="material-symbols-outlined">add_circle</span>
            </button>
            <div className='h-[560px] overflow-y-auto text-xs'>
                {
                    fields.map( ( field, index ) => (
                        <div
                            key={field.id}
                            className='flex flex-wrap'
                        >
                            <AddPort
                                field={field}
                                index={index}
                                requiredFields={requiredFields}
                            />
                            <BtnAddPort
                                append={append}
                                fields={fields}
                                index={index}
                                move={move}
                                ports={ports}
                                remove={remove}
                            />
                        </div>
                    ) )
                }
            </div>
        </div>
    )
}
// import { useEffect, useMemo } from 'react';
// import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
// // import { Control, FieldErrors, useFieldArray, useFormContext, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form';
// import { BoardFormData, BoardPortType } from '../../../types';
// import { AddPort } from './AddPort';
// import { BtnAddPort } from './BtnAddPort';

// // interface Props {
// //     control: Control<BoardFormData>;
// //     errors: FieldErrors<BoardFormData>;
// //     register: UseFormRegister<BoardFormData>;
// //     setValue: UseFormSetValue<BoardFormData>;
// // }

// export const FormBodyBoardPorts = () => {
// // export const FormBodyBoardPorts = ({ control, register, errors, setValue }: Props) => {

//     const { control, register, formState: { errors }, setValue } = useFormContext<BoardFormData>()

//     const { fields, append, remove, move } = useFieldArray({
//         control,
//         name: "ports",
//     });

//     const ports = useWatch({
//         control,
//         name: "ports",
//         defaultValue: [],
//     });

//     const physical = useMemo(() => ports?.map(port => port.physical), [ports]);
//     const nms = useMemo(() => ports?.map(port => port.NMS), [ports]);

//     useEffect(() => {
//         if (ports && ports.length > 0) {
//             ports.forEach((port, index) => {
//                 const expectedFullName = `${port.NMS}(${port.physical})`;
//                 if (port.physical && port.NMS && port.fullName !== expectedFullName) {
//                     setValue(`ports.${index}.fullName`, expectedFullName);
//                 }
//             });
//         }
//     }, [physical, nms, setValue]);

//     return (
//         <div className='font-roboto text-sm px-3 py-2 rounded-lg'>
//             <button
//                 type="button"
//                 className='font-oswald uppercase flex items-center justify-center gap-2 bg-emerald-500 px-3 py-1 my-2 rounded-md w-full cursor-pointer transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-600/100'
//                 onClick={() => append({
//                     port: fields.length + 1,
//                     type: BoardPortType.client,
//                     physical: '',
//                     NMS: '',
//                     logicalFacilities: {},
//                     fullName: ''
//                 })}
//             >
//                 Agregar Port <span className="material-symbols-outlined">add_circle</span>
//             </button>
//             <div className='h-[560px] overflow-y-auto text-xs'>
//                 {
//                     fields.map((field, index) => (
//                         <div
//                             key={field.id}
//                             className='flex'
//                         >
//                             <AddPort
//                                 // control={control}
//                                 // register={register}
//                                 // errors={errors}
//                                 field={field}
//                                 index={index}
//                             />
//                             <BtnAddPort
//                                 append={append}
//                                 fields={fields}
//                                 index={index}
//                                 move={move}
//                                 ports={ports}
//                                 remove={remove}
//                             />
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }
