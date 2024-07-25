import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AdminLayout () {
  const { isAdmin } = useAuth()

  if (isAdmin) {
    return (
      <section className='my-2'>
          <Outlet></Outlet>
      </section>
    )
  } else {
    return <Navigate to='/'/>
  }
}
