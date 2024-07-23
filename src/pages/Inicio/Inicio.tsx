import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteDate, getDateByClientId } from '../../api/DateApi'
import BentoGrid from '../../components/Inicio/BentoGrid'
import { toast } from 'react-toastify'
import { formatDate } from '../../utils/formatDate'

export default function Inicio () {
  const queryClient = useQueryClient()
  const { data: user } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['date'],
    queryFn: getDateByClientId
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
        <div className='flex flex-col items-center w-full py-8 px-4 gap-4 bg-envy-800 rounded-md mt-8'>
         {
          isLoading
            ? ('Cargando...')
            : (
            <>
             {
              data.date !== 'No tenes turno'
                ? (<div className='w-full flex  items-center justify-around md:flex-row md:justify-around'>
                    <div>
                      <h1 className='text-lg md:text-xl font-bold text-ship-gray-50 tracking-wider'>Tenes turno</h1>
                      <p className='text-ship-gray-50 md:text-lg'>El dia {formatDate(data.date).replace(/\sde\s\d{4}$/, '')} a las {data.time}</p>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-5 items-center'>
                      <Link to={`/editar-turno/${data._id}`}><img className='md:size-9' src="/pencil.svg" alt="Edit Icon" /></Link>
                      <button onClick={() => mutate(data._id)}><img className='md:size-9' src="/trash.svg" alt="Delete Icon" /></button>
                    </div>
                  </div>)
                : (
                  <div className='w-full flex flex-col gap-4 items-center justify-center lg:flex-row md:justify-around'>
                    <h1 className='text-lg font-bold text-ship-gray-50 tracking-wider md:text-xl '>No solicitaste ningún turno</h1>
                    <Link
                      className='bg-envy-950 text-center border border-ship-gray-50/0 w-fit py-3 px-8 rounded-md text-ship-gray-50 font-normal
                      text-xl hover:shadow-sm hover:border hover:border-ship-gray-50 hover:shadow-ship-gray-50 transition-all' to={'/crear-turno'}>
                      Agendar turno
                    </Link>
                    <p className='text-center text-ship-gray-50 md:text-lg'>Horarios de la barbería: {' '}
                      <br className='md:hidden '/>
                      <span className='font-semibold'>13:00 hs a 20:00 hs</span>
                    </p>
                  </div>)
              }
            </>
              )
         }

        </div>
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
