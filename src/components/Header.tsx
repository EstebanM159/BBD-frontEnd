import { Link, useNavigate } from 'react-router-dom'
import Hamburger from './Icons/Hamburger'
import { useState } from 'react'
import CloseIcon from './Icons/CloseIcon'
import { useQueryClient } from '@tanstack/react-query'

export default function Header () {
  const navigate = useNavigate()
  const [toggleMenu, setToggleMenu] = useState(false)
  const queryClient = useQueryClient()
  const isOpen = toggleMenu ? 'w-0 h-0 hidden' : null
  const logout = () => {
    localStorage.removeItem('access_token')
    queryClient.invalidateQueries({ queryKey: ['user'] })
    navigate('/auth/login')
  }
  return (
        <>
        <nav className="flex justify-between relative p-4">
            <Link to='/'className="flex items-center">
                <img src="./scissorsBalck.svg" alt="Barber Shop Logo" className="h-10 mr-2"/>
                <h1 className="text-lg font-bold">Barber Shop</h1>
            </Link>
            <ul className={`bg-nevada-400 z-20 flex items-center py-8 absolute flex-col gap-4 w-full right-0 ${toggleMenu ? ' top-16 ' : '-top-64'} transition-all`}>
                <li className={`${toggleMenu ? '' : { isOpen }}`}><Link className='text-xl font-semibold text-ship-gray-100' onClick={() => setToggleMenu(!toggleMenu)}to='/'>Inicio</Link></li>
                <li className={`${toggleMenu ? '' : { isOpen }}`}><Link className='text-xl font-semibold text-ship-gray-100' onClick={() => setToggleMenu(!toggleMenu)}to='/'>Perfil</Link></li>
                <li className={`${toggleMenu ? '' : { isOpen }}`}><button className='text-xl font-semibold text-ship-gray-100' onClick={logout}>Cerrar sesión</button></li>
            </ul>
            <button onClick={() => setToggleMenu(!toggleMenu)} className='w-fit'>
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
