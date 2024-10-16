import { Route, Routes } from 'react-router-dom'
import { DetailsTransceiverView, NewTransceiverView, SearchTransceiverView, TransceiverIndexView } from '../../../pages'
import EditTransceiverView from '../../../pages/catalog/transceiver/EditTransceiverView'

//* Ruta --> catalog/transceiver

export const TransceiverRoutes = () => {
  return (
    <Routes>
        <Route index element={ <TransceiverIndexView /> } />
        <Route path="new" element={ <NewTransceiverView /> } />
        <Route path="search" element={ <SearchTransceiverView /> } />
        <Route path="details/:transceiverId" element={ <DetailsTransceiverView /> } />
        <Route path="edit/:transceiverId" element={ <EditTransceiverView /> } />

    </Routes>
  )
}
