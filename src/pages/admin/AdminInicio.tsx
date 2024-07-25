import { useQuery } from '@tanstack/react-query'
import { getAllDates } from '../../api/AdminApi'
import { formatDate } from '../../utils/formatDate'

export default function AdminInicio () {
  const { data, isLoading } = useQuery({
    queryFn: getAllDates,
    queryKey: ['dates']
  })
  if (data) {
    return (
        <>
        <h1 className="text-2xl text-center">Administrador</h1>
        <div className=" w-full bg-ship-gray-50 rounded-md p-2 my-5 flex flex-col gap-4">
          <h1 className="text-center text-xl">Turnos</h1>
          {
            isLoading
              ? <p>Cargando...</p>
              : (<>
                {
                data.map(date => (
                  <div key={date.clientId._id} className="border border-ship-gray-950 flex gap-5 justify-between p-3 rounded-md">
                    <div className='flex items-center justify-center'>
                      <img className='size-16 rounded-full' src={`${date.clientId.picture !== '' ? date.clientId.picture : './user.svg'}`} alt={`Imagen de perfil de ${date.clientId.userName}`} />
                    </div>
                    <div className="text-ship-gray-950">
                        <h1 className="text-lg">{date.clientId.userName}</h1>
                        <p>Hora: {date.time} {''} </p>
                        <p>Día: {formatDate(date.date)}</p>
                    </div>

                  </div>
                ))
                }
            </>)

          }
        </div>
        <div className='h-28'>
          <h1 className='text-2xl text-center'>Cambiar disponibilidad</h1>
          <p className='text-center'>Formulario</p>
        </div>
        <div className='h-28'>
          <h1 className='text-2xl text-center'>Avisos</h1>
          <p>Formulario</p>
        </div>
        </>
    )
  }
}
