import { Route, Routes } from 'react-router-dom';
import { EditSignalView, SignalView } from '../../../pages';

export const SignalRoutes = () => {
  return (
    <Routes>
      <Route index element={ <SignalView /> }/>
      <Route path='edit/:signalId' element={ <EditSignalView /> }/>
    </Routes>
  )
}
