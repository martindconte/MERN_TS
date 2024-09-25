import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { AppLayout } from '../layouts/home'
import { HomePageView } from '../pages'
import { CentralRoutes } from './central/CentralRoutes'
import { CatalogRoutes } from './catalog/CatalogRoutes'

const queryClient = new QueryClient()

export const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <AppLayout /> }>
            <Route index element={ <HomePageView /> } />
            <Route path='/central/*' element={ <CentralRoutes /> } />
            <Route path='/catalog/*' element={ <CatalogRoutes /> } />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
