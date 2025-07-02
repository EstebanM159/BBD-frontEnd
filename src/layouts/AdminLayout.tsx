import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoadingPage from '../components/LoadingPage'

export default function AdminLayout () {
  const { isAdmin, isLoading } = useAuth()
  if (isLoading) return (<LoadingPage/>)
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
