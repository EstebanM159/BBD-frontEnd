import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteDate, getDate } from '../../api/DateApi'
import BentoGrid from '../../components/Inicio/BentoGrid'
import { toast } from 'react-toastify'

export default function Inicio () {
  const queryClient = useQueryClient()
  const { data: user } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['date'],
    queryFn: getDate
  })
  const { mutate } = useMutation({
    mutationFn: deleteDate,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['date'] })
    }
  })
  if (data && user) {
    return (
    <>
      <section className="pt-6">
        <div className="flex items-center px-4 justify-between bg-ship-gray-50 w-full h-20 rounded-md">
            <h1 className='font-semibold text-xl'>Hola, {user.userName}!</h1>
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
        <div className='flex flex-col items-center w-full py-8 px-4 gap-4 bg-ship-gray-400 rounded-md mt-8'>
         {
          isLoading
            ? ('Cargando...')
            : (
            <>
             {
              data.date !== 'No tenes turno'
                ? (<div className='w-full flex flex-col gap-4 items-center justify-center md:flex-row md:justify-around'>
                    <h1 className='text-lg font-bold '>Tenes turno</h1>
                    <p>El dia {data.date.replace(/\sde\s\d{4}$/, '')} a las {data.time}</p>
                    <button onClick={() => mutate(data._id)}>Eliminar</button>
                  </div>)
                : (
                <div className='w-full flex flex-col gap-4 items-center justify-center md:flex-row md:justify-around'>
                  <h1 className='text-lg font-bold '>No solicitaste ningún turno</h1>
                  <Link
                    className='bg-envy-950 w-fit py-3 px-8 rounded-md text-ship-gray-50 font-normal
                    text-xl hover:shadow-md hover:shadow-ship-gray-50' to={'/crear-turno'}>
                    Agendar turno
                  </Link>
                  <p className='text-center'>Horarios de la barbería: {' '}
                    <br className='md:hidden '/>
                    <span className='font-semibold'>13:00 hs a 20:00 hs</span>
                  </p>
                </div>
                  )
              }
            </>
              )
         }

        </div>
      </section>
      <section className='pt-5'>
        <h1 className='font-semibold text-md'>Necesitas inspiracion para tu corte? Revisa la galeria</h1>
         <BentoGrid/>
      </section>
      <section className='p-6'>
        <h1 className='font-semibold text-md text-center'>Contacto del barbero</h1>
        <div className='flex justify-around items-center pt-5'>
          <img className='cursor-pointer' src="/brand-gmail.svg" alt="" />
          <img className='cursor-pointer' src="/brand-instagram.svg" alt="" />
          <img className='cursor-pointer' src="/brand-whatsapp.svg" alt="" />
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
