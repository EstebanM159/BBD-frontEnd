import { ReactNode } from 'react'

export default function ErrorMessage ({ children }:{children:ReactNode }) {
  return (
    <div className=" flex gap-2 items-center text-center my-2 bg-envy-800 text-ship-gray-100 font-bold p-3 uppercase text-xs rounded-sm">
      <img src="/alert.svg" alt="Icono alerta" className='size-2' />  <p>{children}</p>
    </div>
  )
}
