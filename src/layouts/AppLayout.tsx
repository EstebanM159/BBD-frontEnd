/* eslint-disable curly */
import { Link, Navigate, Outlet } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AppLayout () {
  const { data, isError, isLoading } = useAuth()
  if (isLoading) return <p>Cargando</p>
  if (isError) return <Navigate to='/auth/iniciar-sesion'/>
  if (data?.phone === null) {
    toast.info(<Link to={'/perfil/editar-perfil'}>Agregar telefono para que el local se comunique con usted</Link>)
  }
  if (data) return (
    <>
        <Header/>
        <main className="px-4 md:mx-16 ">
            <Outlet/>
        </main>
        <ToastContainer stacked position='bottom-center' />

        <Footer/>
    </>
  )
}
