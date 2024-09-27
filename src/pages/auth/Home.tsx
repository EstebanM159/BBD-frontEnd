import { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Home () {
  const [active, setActive] = useState('')
  return (
    <div className=" flex items-center justify-center h-screen w-full flex-col gap-20 ">
            <img src="/scissorsBalck.svg" className={`size-32 ${active} rounded-full p-5 transition-transform`} alt="Imagen barber" />
            <h1 className="text-2xl font-bold text-center">Barbería pepe</h1>
            <div className="flex flex-col gap-8">
              <Link to='/auth/iniciar-sesion'
              className="border border-blanco bg-oscuro px-7 py-3 rounded-lg
                        text-blanco
                        transition-colors font-semibold
                        hover:bg-blanco hover:text-oscuro
                        ">
              Iniciar Sesión
              </Link>
              <Link
                onMouseEnter={() => setActive('rotate-90')}
                onMouseLeave={() => setActive('rotate-0')}
                to='/auth/crear-cuenta'
                className=" px-7 py-3 rounded-lg
                            bg-ship-gray-900
                            text-ship-gray-100
                            transition-colors font-semibold hover:border-blanco
                            hover:hover:text-blanco
                            ">
                Crear cuenta
              </Link>
            </div>

    </div>
  )
}
