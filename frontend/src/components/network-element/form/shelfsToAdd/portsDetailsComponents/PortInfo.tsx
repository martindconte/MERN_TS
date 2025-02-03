interface Props {
    port: number;
    NMS: string;
    physical: string;
    fullName: string;
    type: string;
}

export const PortInfo = ({ NMS, fullName, physical, port, type }: Props) => {
  return (
    <div className='absolute -top-2 left-2 bg-yellow-100 px-2 text-sm flex gap-2 rounded-md group-hover:bg-orange-800 group-hover:text-white'>
      <p className='uppercase whitespace-nowrap'>Port Info</p>
      <p className='flex gap-1'>
        <span className='font-semibold'>No.</span> {port}
      </p>
      <p className='flex gap-1'>
        <span className='font-semibold whitespace-nowrap'>NMS Port</span> {NMS}
      </p>
      <p className='flex gap-1'>
        <span className='font-semibold'>Fisico</span> {physical}
      </p>
      <p className='flex gap-1'>
        <span className='font-semibold'>Nombre</span> {fullName}
      </p>
      <p className='flex gap-1'>
        <span className='font-semibold'>Tipo</span> {type}
      </p>
    </div>
  )
}
