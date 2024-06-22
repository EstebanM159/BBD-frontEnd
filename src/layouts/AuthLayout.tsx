import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export default function AuthLayout () {
  return (
    <>
        <section className='h-screen'>
            <Outlet></Outlet>
        </section>
        <ToastContainer stacked position='bottom-left'/>
    </>
  )
}
