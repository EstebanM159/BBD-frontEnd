import { Link, useNavigate } from 'react-router-dom'
import Hamburger from './Icons/Hamburger'
import { useState } from 'react'
import CloseIcon from './Icons/CloseIcon'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../hooks/useAuth'

export default function Header () {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [toggleMenu, setToggleMenu] = useState(false)
  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.removeItem('access_token')
    queryClient.invalidateQueries({ queryKey: ['user'] })
    queryClient.resetQueries({ queryKey: ['user'] })
    navigate('/auth/login')
  }
  return (
        <>
        <nav className="flex justify-between md:items-center relative p-4 md:py-5 md:px-8 ">
            <Link to='/'className="flex items-center">
                <img src="/scissorsBalck.svg" alt="Barber Shop Logo" className="h-10 mr-2"/>
                <h1 className="text-xl md:text-3xl font-bold">Barber Shop</h1>
            </Link>
            <ul className={`bg-nevada-400 z-20 flex items-center py-8 absolute flex-col
                            gap-4 w-full right-0 ${toggleMenu ? ' top-16 ' : '-top-64'} transition-all
                            md:static md:bg-ship-gray-100/0 md:w-auto md:flex-row  md:py-0 md:transition-none
                            
                            `
                            }>
                <li><Link className='text-xl  font-semibold md:font-medium text-ship-gray-100
                                     md:text-ship-gray-950 md:border-b-0 md:hover:border-b-2 md:pb-2 md:transition-all'
                onClick={() => setToggleMenu(!toggleMenu)}to='/'>Inicio</Link></li>
                <li><Link className='text-xl font-semibold md:font-medium text-ship-gray-100
                                  md:text-ship-gray-950  md:border-b-0 md:hover:border-b-2 md:pb-2 md:transition-all'
                onClick={() => setToggleMenu(!toggleMenu)}to='/perfil'>Perfil</Link></li>
                 {
                    isAdmin
                      ? (<li><Link className='text-xl  font-semibold md:font-medium text-ship-gray-100
                                     md:text-ship-gray-950 md:border-b-0 md:hover:border-b-2 md:pb-2 md:transition-all'
                onClick={() => setToggleMenu(!toggleMenu)}to='/admin'>Admin</Link></li>)
                      : null
                }
                <li><Link to={'/auth/login'} className='text-xl font-semibold md:font-medium text-ship-gray-100
                                       md:text-ship-gray-950 md:border-b-0 md:hover:border-b-2 md:pb-2 md:transition-all'
                onClick={logout}>Cerrar sesión</Link></li>

            </ul>
            <button onClick={() => setToggleMenu(!toggleMenu)} className='w-fit md:hidden'>
                {
                    toggleMenu
                      ? <CloseIcon/>
                      : <Hamburger/>
                }
            </button>
        </nav>
        </>
  )
}
