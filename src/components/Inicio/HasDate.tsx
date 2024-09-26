import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteDate, getDateByClientId } from '../../api/DateApi'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'

export default function HasDate () {
  const queryClient = useQueryClient()

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
  if (data) {
    return (
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
                      <p className='text-ship-gray-50 md:text-lg px-1'>El dia {formatDate(data.date).replace(/\sde\s\d{4}$/, '')} a las {data.time}</p>
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
                      className='bg-envy-950 text-center border border-ship-gray-50/0 w-fit sm:py-3 sm:px-8 rounded-md text-ship-gray-50 font-normal text-lg px-2 py-2
                      sm:text-xl hover:shadow-sm hover:border hover:border-ship-gray-50 hover:shadow-ship-gray-50 transition-all' to={'/crear-turno'}>
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
    )
  }
}
