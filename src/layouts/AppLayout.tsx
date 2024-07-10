/* eslint-disable curly */
import { Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/Header'
export default function AppLayout () {
  const { data, isError, isLoading } = useAuth()
  if (isLoading) return <p>Cargando</p>
  if (isError) return <Navigate to='/auth/login'/>
  if (data) return (
    <>
        <Header/>
        <main className="h-screen px-7">
            <Outlet/>
        </main>
        <ToastContainer stacked />
    </>
  )
}
