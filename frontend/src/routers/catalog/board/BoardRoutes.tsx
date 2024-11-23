import { Routes, Route } from 'react-router-dom'
import { DeletedBoardsView, DetailsBoardView, EditBoardView, IndexBoardView, NewBoardView, SearchBoardView } from '../../../pages'

//* Ruta --> catalog/board

export const BoardRoutes = () => {
    return (
        <Routes>
            <Route index element={<IndexBoardView />} />
            <Route path="new" element={<NewBoardView />} />
            <Route path="search" element={<SearchBoardView />} />
            <Route path="deleted" element={ <DeletedBoardsView /> } />
            <Route path="details/:boardId" element={<DetailsBoardView />} />
            <Route path="edit/:boardId" element={<EditBoardView />} />
        </Routes>
    )
}
