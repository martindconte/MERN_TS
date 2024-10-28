import { Route, Routes } from 'react-router-dom'
import { DetailsBoardView, EditBoardView, IndexBoardView, NewBoardView, SearchBoardView } from '../../../pages'

//* Ruta --> catalog/board

export const BoardRoutes = () => {
    return (
        <Routes>
            <Route index element={<IndexBoardView />} />
            <Route path="new" element={<NewBoardView />} />
            <Route path="search" element={<SearchBoardView />} />
            <Route path="details/:transceiverId" element={<DetailsBoardView />} />
            <Route path="edit/:transceiverId" element={<EditBoardView />} />
        </Routes>
    )
}
