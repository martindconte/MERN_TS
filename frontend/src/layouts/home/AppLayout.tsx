import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Header } from "./Header"
import { Footer } from "./Footer"


export const AppLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />

            <ToastContainer
                pauseOnHover={true}
                pauseOnFocusLoss={true}
            />
        </>
    )
}
