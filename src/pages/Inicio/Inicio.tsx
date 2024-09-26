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
        {/* https://www.instagram.com/barberiadeapolo/ */}
        <h1 className='font-semibold text-lg md:text-2xl '>Necesitas inspiracion para tu corte? Revisa la galeria</h1>
         <BentoGrid/>
         <div className='flex gap-1 justify-center items-center w-full'>
          <p>Si necesitas mas cortes ingresa {' '}</p>
          <a target='_blank' className='underline' href="https://www.instagram.com/barberiadeapolo/">aca</a>
         </div>
      </section>
      <section className='p-6'>
        <h1 className='font-semibold text-md md:text-xl  text-center'>Contacto del barbero</h1>
        <div className='flex justify-around items-center pt-5'>
          <img className='cursor-pointer md:size-7' src="/brand-gmail.svg" alt="" />
          <a href="https://www.instagram.com/barberiadeapolo/" target='_blank'><img className='cursor-pointer md:size-7' src="/brand-instagram.svg" alt=""/></a>
          <a href='https://wa.me/3412715472' target='_blank'><img className='cursor-pointer md:size-7' src="/brand-whatsapp.svg" alt="" /></a>
        </div>
      </section>
    </>

    )
  }
}
