import { Link, useNavigate } from 'react-router-dom'
import { KeyIcon, PencilIcon, PayMethodIcon, LogOutIcon } from '../../components/Icons/ProfileIcons'
import { useQueryClient } from '@tanstack/react-query'
export default function Profile () {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('access_token')
    queryClient.invalidateQueries({ queryKey: ['user'] })
    queryClient.resetQueries({ queryKey: ['user'] })
    navigate('/auth/login')
  }
  return (
    <section className='bg-ship-gray-200 w-full h-full mt-2 mb-3 flex flex-col gap-10 py-10 pl-10 items-start'>
            <Link to='/perfil/cambiar-contraseña' className='flex gap-3 text-xl items-center' ><KeyIcon/>Cambiar contraseña</Link>
            <Link to='/perfil/editar-perfil' className='flex gap-3 text-xl items-center'><PencilIcon/> Editar perfil</Link>
            <Link to='/perfil/metodos-de-pago' className=' flex gap-3 text-xl items-center' ><PayMethodIcon/>Metodos de pago</Link>
            <Link to='#' className=' flex gap-3 text-xl items-center' onClick={logout}><LogOutIcon/>Cerrar sesión</Link>
          </section>
  )
}
