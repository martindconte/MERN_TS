interface Props {
  vendorName: string;
  subrackType: string;
  subrackFamily: string;
  partNumber: string;
  modelName: string;
  observations: string;
}

export const ShelfInfo = ({ vendorName, subrackType, subrackFamily, partNumber, modelName, observations }: Props) => {
  return (
    <div className='flex flex-wrap items-center justify-between gap-2 border border-black px-2 py-1 rounded-lg font-oswald bg-yellow-100'>
      <p><span className='uppercase font-semibold'>Vendor: </span>{vendorName}</p>
      <p><span className='uppercase font-semibold'>Subrack: </span>{subrackType} {subrackFamily}</p>
      <p><span className='uppercase font-semibold'>PN: </span>{partNumber}</p>
      <p><span className='uppercase font-semibold'>Model: </span>{modelName}</p>
      <p><span className='uppercase font-semibold'>Obs: </span>{observations}</p>
    </div>
  )
}
