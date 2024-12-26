import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BoardFormData, TransceiverFormData } from '../../../../types'
import { InputsBoardsPorts } from './InputsBoardsPorts'
import { useTransceivers } from '../../../../hook'
import { Spinner } from '../../../shared/spinners/Spinner'
import { TableV2 } from '../../../shared/table_v2/TableV2'

interface Props {
  selectedData: BoardFormData['ports'][number]['equipments']
  setSelectedData: Dispatch<SetStateAction<BoardFormData['ports'][number]['equipments']>>
}

export const SearchPortEquipment = ({ selectedData, setSelectedData }: Props) => {
  const [search, setSearch] = useState<Partial<TransceiverFormData>>({ isDeleted: true })
  const [enabled, setEnabled] = useState(false)
  const { queryTransceivers, limit, page, setLimit, setPage } = useTransceivers({ enabled, search })

  useEffect(() => {
    setPage(1)
  }, [limit])

  const handleSearch = (formData: Partial<TransceiverFormData>) => {
    setSearch(formData)
    setEnabled(true)
    setPage(1)
  }

  return (
    <div className='flex flex-col items-center gap-2 bg-gray-200 px-2 py-3 mx-4 rounded-md h-9/12'>
      <InputsBoardsPorts handleSearch={handleSearch} selectedData={selectedData} setSelectedData={setSelectedData} />
      <div className='overflow-auto w-[1000px] h-[35rem]'>
        {queryTransceivers.isLoading ? (
          <Spinner />
        ) : (
          queryTransceivers.data && (
            <TableV2
              data={queryTransceivers.data.payload}
              pagination={queryTransceivers.data.pagination}
              info={'catalogTransceiver'}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              fnSelectRows={setSelectedData}
              selectedRows={selectedData}
            />
          )
        )}
      </div>
    </div>
  )
}
