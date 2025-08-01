import { NEFormData, SubrackType } from '../../../../types'
import { PathDataInput, PortInfo, TransceiverDetail } from './portsDetailsComponents'

interface Props {
  portInfo: NonNullable<NEFormData['subracks'][number]['slots'][number]['board']>['ports'][number]
  transceiverData?: Pick<NonNullable<SubrackType['slots'][number]['boards']>[number]['ports'][number], 'equipments'>
  indexShelf: number
  indexSlot: number
  indexPort: number
}

export const PortsDetails = ({ portInfo, transceiverData, indexShelf, indexSlot, indexPort }: Props) => {
  return (
    <div className='relative flex items-center gap-2 px-2 pt-3 pb-2 border-2 border-black hover:ring-2 hover:ring-blue-800 group'>
      <PortInfo {...portInfo} />
      <TransceiverDetail
        indexShelf={indexShelf}
        indexSlot={indexSlot}
        indexPort={indexPort}
        transceivers={transceiverData?.equipments || []}
      />
      <PathDataInput
        indexShelf={indexShelf}
        indexSlot={indexSlot}
        indexPort={indexPort}
        toggleName='Accesible'
      />
    </div>
  )
}
