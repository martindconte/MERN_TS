import { Route, Routes } from "react-router-dom"
import { CentralIndexView, NewCentralView, SearchCentralView } from "../../pages"

export const CentralRoutes = () => {
  return (
    <Routes>
        <Route index element={ <CentralIndexView /> } />
        <Route path="new" element={ <NewCentralView /> } />
        <Route path="search" element={ <SearchCentralView /> } />
    </Routes>
  )
}
