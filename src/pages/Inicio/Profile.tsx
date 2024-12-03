import { Link, useNavigate } from 'react-router-dom'
import { KeyIcon, PencilIcon, PayMethodIcon, LogOutIcon } from '../../components/Icons/ProfileIcons'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../hooks/useAuth'
import Spinner from '../../components/Spinner'
export default function Profile () {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data, canChangePassword, isLoading } = useAuth()
  const logout = () => {
    localStorage.removeItem('access_token')
    queryClient.invalidateQueries({ queryKey: ['user'] })
    queryClient.resetQueries({ queryKey: ['user'] })
    navigate('/auth/login')
  }
  if (isLoading) return <Spinner/>
  if (data) {
    return (
    <>
     <div className='bg-ship-gray-200 items-center flex flex-col w-full py-4 rounded-md '>

            {
              data?.picture === ''
                ? (
                  <img src="./user.svg" className='bg-ship-gray-300 p-2 rounded-full size-28' alt="foto perfil" />
                  )
                : (
                <img className='rounded-full' src={data.picture} width={112} height={112}/>
                  )
            }
            <h1 className="text-2xl mt-3 capitalize">{data.userName}</h1>
            </div>
    <section className=' w-full h-full mt-2 mb-3 flex flex-col gap-10 py-10 pl-10 items-start'>
      {
        !canChangePassword && <Link to='/perfil/cambiar-contraseña' className='flex gap-3 text-xl items-center' ><KeyIcon/>Cambiar contraseña</Link>
      }
      <Link to='/perfil/editar-perfil' className='flex gap-3 text-xl items-center'><PencilIcon/> Editar perfil</Link>
      <Link to='/perfil/metodos-de-pago' className=' flex gap-3 text-xl items-center' ><PayMethodIcon/>Metodos de pago</Link>
      <Link to='#' className=' flex gap-3 text-xl items-center' onClick={logout}><LogOutIcon/>Cerrar sesión</Link>
    </section>
    </>
    )
  }
}
