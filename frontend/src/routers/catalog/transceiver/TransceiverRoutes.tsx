import { Route, Routes } from 'react-router-dom'
import { DeletedTransceiversView, DetailsTransceiverView, IndexTransceiverView, NewTransceiverView, SearchTransceiverView } from '../../../pages'
import EditTransceiverView from '../../../pages/catalog/transceiver/EditTransceiverView'

//* Ruta --> catalog/transceiver

export const TransceiverRoutes = () => {
  return (
    <Routes>
        <Route index element={ <IndexTransceiverView /> } />
        <Route path="new" element={ <NewTransceiverView /> } />
        <Route path="search" element={ <SearchTransceiverView /> } />
        <Route path="deleted" element={ <DeletedTransceiversView /> } />
        <Route path="details/:transceiverId" element={ <DetailsTransceiverView /> } />
        <Route path="edit/:transceiverId" element={ <EditTransceiverView /> } />

    </Routes>
  )
}
