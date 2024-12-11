import { Link, NavLink, useNavigate } from 'react-router-dom'
import Hamburger from './Icons/Hamburger'
import { useState } from 'react'
import CloseIcon from './Icons/CloseIcon'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../hooks/useAuth'
type NavLinkProps = {
  isActive: boolean
}
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
  const navLinkClasses = ({ isActive }: NavLinkProps) => (
    isActive
      ? 'border-b-2 text-xl font-semibold md:font-medium text-ship-gray-100 md:text-ship-gray-950'
      : 'border-b-0  text-xl font-semibold md:font-medium text-ship-gray-100 md:text-ship-gray-950'
  )
  return (
        <>
        <nav className="flex justify-between md:items-center relative p-4 md:py-5 md:px-8 ">
            <Link to='/inicio'className="flex items-center">
                <img src="/scissorsBalck.svg" alt="Barber Shop Logo" className="h-10 mr-2"/>
                <h1 className="text-xl md:text-3xl font-bold">Barber Shop</h1>
            </Link>
            <ul className={`bg-nevada-400 z-20 flex items-center py-8 absolute flex-col
                            gap-4 w-full right-0 ${toggleMenu ? ' top-16 ' : '-top-64'} transition-all
                            md:static md:bg-ship-gray-100/0 md:w-auto md:flex-row  md:py-0 md:transition-none
                            
                            `
                            }>
                              <NavLink to='/inicio' onClick={() => setToggleMenu(!toggleMenu)} className={navLinkClasses}>Inicio</NavLink>
                              <NavLink to='/perfil' onClick={() => setToggleMenu(!toggleMenu)} className={navLinkClasses}>Perfil</NavLink>

                              {
                                isAdmin
                                  ? (<NavLink to='/admin' onClick={() => setToggleMenu(!toggleMenu)} className={navLinkClasses}>Admin</NavLink>)
                                  : null
                              }
                              <NavLink to='/auth/iniciar-sesion' onClick={logout} className={navLinkClasses}>Cerrar sesión</NavLink>
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
