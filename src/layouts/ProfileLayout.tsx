import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProfileLayout () {
  const { data } = useAuth()
  if (data) {
    return (
    <>
        <div className="h-[85vh] flex flex-col items-center mt-2">
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
            <Outlet/>

        </div>
    </>
    )
  }
}
