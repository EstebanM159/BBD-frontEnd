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
            <Link to='home'className="flex items-center">
                <img src="./scissorsBalck.svg" alt="Barber Shop Logo" className="h-10 mr-2"/>
                <h1 className="text-lg font-bold">Barber Shop</h1>
            </Link>
            <ul className={`bg-ship-gray-400 flex items-center pt-3 absolute flex-col h-56 w-3/4 right-0 ${toggleMenu ? ' top-16 ' : '-top-64'} transition-all`}>
                <li className={`${toggleMenu ? '' : { isOpen }}`}><a href='#'>inicio</a></li>
                <li className={`${toggleMenu ? '' : { isOpen }}`}><a href='#'>perfil</a></li>
                <li className={`${toggleMenu ? '' : { isOpen }}`}><button onClick={logout}>Cerrar sesión</button></li>
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
