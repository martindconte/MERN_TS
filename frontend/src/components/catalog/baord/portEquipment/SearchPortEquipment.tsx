import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TransceiverFormData, TransceiverType } from '../../../../types';
import { InputsBoardsPorts } from './InputsBoardsPorts';
import { useTransceivers, /* useTransceiversDeleted */ } from '../../../../hook';
import { Table } from '../../../shared/table/Table';
import { Spinner } from '../../../shared/spinners/Spinner';

interface Props {
    selectedData: TransceiverType[];
    setSelectedData: Dispatch<SetStateAction<TransceiverType[]>>;
}

export const SearchPortEquipment = ({ selectedData, setSelectedData }: Props) => {

    const [search, setSearch] = useState<Partial<TransceiverFormData>>({ isDeleted: true })
    const [enabled, setEnabled] = useState(false)
    const { queryTransceivers, limit, page, setLimit, setPage } = useTransceivers({ enabled, search })
    // const { queryTransceiversDeleted } = useTransceiversDeleted({})

        // console.log('quewry --->', queryTransceivers.data);

        // console.log('eliminados', queryTransceiversDeleted.data?.transceivers);

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
            <InputsBoardsPorts
                handleSearch={handleSearch}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
            />
            <div className='overflow-auto w-[1000px] h-[35rem]'>
                {
                    queryTransceivers.isLoading
                        ? <Spinner />
                        : (
                            queryTransceivers.data &&
                            <Table
                                data={queryTransceivers.data.payload}
                                pagination={queryTransceivers.data.pagination}
                                info={'catalogTransceiver'}
                                page={page}
                                setPage={setPage}
                                limit={limit}
                                setLimit={setLimit}
                                fnSelected={setSelectedData}
                                selectedData={selectedData || []}
                            />
                        )
                }
            </div>
        </div>
    )
}
