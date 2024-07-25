import { useAuth } from '../../hooks/useAuth'
import BentoGrid from '../../components/Inicio/BentoGrid'
import HasDate from '../../components/Inicio/HasDate'

export default function Inicio () {
  const { data: user } = useAuth()
  if (user) {
    return (
    <>
      <section className="pt-6">
        <div className="flex items-center px-4 justify-between bg-ship-gray-50 w-full h-20 rounded-md">
            <h1 className='font-semibold text-xl md:text-3xl'>Hola, {user.userName}!</h1>
            {
              user?.picture === ''
                ? (
                    <img src="./user.svg" className='bg-ship-gray-300 p-2 rounded-full' alt="foto perfil" />
                  )
                : (
                    <img className='rounded-full' src={user.picture} width={50} height={50}/>
                  )
            }
        </div>
        <HasDate/>
      </section>
      <section className='pt-5'>
        <h1 className='font-semibold text-md md:text-xl '>Necesitas inspiracion para tu corte? Revisa la galeria</h1>
         <BentoGrid/>
      </section>
      <section className='p-6'>
        <h1 className='font-semibold text-md md:text-xl  text-center'>Contacto del barbero</h1>
        <div className='flex justify-around items-center pt-5'>
          <img className='cursor-pointer md:size-7' src="/brand-gmail.svg" alt="" />
          <img className='cursor-pointer md:size-7' src="/brand-instagram.svg" alt="" />
          <img className='cursor-pointer md:size-7' src="/brand-whatsapp.svg" alt="" />
        </div>
      </section>
      {/* <h1 className="pt-4 text-3xl">Noticias</h1>
      <section className="pt-6">
        <div
          className="flex items-center px-4 justify-between border
          border-x-ship-gray-600 bg-ship-gray-400 w-full h-20 rounded-lg font-semibold">
            <img className="size-14" src="./desc.svg" alt="" />
            <h1>Hoy hay descuento del 25%</h1>
        </div>
      </section> */}
    </>

    )
  }
}
