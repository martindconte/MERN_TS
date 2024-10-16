import { Route, Routes } from "react-router-dom"
import { CentralIndexView, DetailsCentralView, EditCentralView, NewCentralView, SearchCentralView } from "../../pages"

export const CentralRoutes = () => {
  return (
    <Routes>
        <Route index element={ <CentralIndexView /> } />
        <Route path="new" element={ <NewCentralView /> } />
        <Route path="search" element={ <SearchCentralView /> } />
        <Route path="details/:centralId" element={ <DetailsCentralView /> } />
        <Route path="edit/:centralId" element={ <EditCentralView /> } />
    </Routes>
  )
}
