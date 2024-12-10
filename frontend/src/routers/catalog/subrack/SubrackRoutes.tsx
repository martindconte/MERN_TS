import { Routes, Route } from 'react-router-dom'
import {
  DeletedSubracksView,
  DetailsSubrackView,
  EditSubrackView,
  IndexSubrackView,
  NewSubrackView,
  SearchSubrackView,
} from '../../../pages'

//* Ruta --> catalog/subrack
export const SubrackRoutes = () => {
  return (
    <Routes>
      <Route index element={<IndexSubrackView />} />
      <Route path='new' element={<NewSubrackView />} />
      <Route path='search' element={<SearchSubrackView />} />
      <Route path='deleted' element={<DeletedSubracksView />} />
      <Route path='details/:subrackId' element={<DetailsSubrackView />} />
      <Route path='edit/:subrackId' element={<EditSubrackView />} />
    </Routes>
  )
}
