import { Outlet } from 'react-router-dom'

export default function ProfileLayout () {
  return (
    <>
        <div className=" flex flex-col items-center h-[85vh]">
          <h1 className='text-center mb-2 text-2xl'>Perfil</h1>
            <Outlet/>
        </div>
    </>
  )
}
