import { Route, Routes } from "react-router-dom"
import { DeletedNEView, DetailsTransceiverView, EditNEView, IndexNEView, NewNEView, SearchNEView } from "../../pages"

export const NetworkElementRoutes = () => {
  return (
    <Routes>
        <Route index element={ <IndexNEView /> } />
        <Route path='new' element={ <NewNEView /> } />
        <Route path='search' element={ <SearchNEView /> } />
        <Route path='deleted' element={ <DeletedNEView /> } />
        <Route path='details/:networkElementId' element={ <DetailsTransceiverView /> } />
        <Route path='edit/:networkElementId' element={ <EditNEView /> } />
    </Routes>
  )
}
