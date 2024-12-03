import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteDateAdmin, deletePastAppointments, getDatesByDay } from '../../api/AdminApi'
import { formatDate } from '../../utils/formatDate'
import { useState } from 'react'
import { es } from 'date-fns/locale/es'
import { getDay } from 'date-fns'

import DatePicker, { registerLocale } from 'react-datepicker'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'

export default function AdminInicio () {
  registerLocale('es', es)

  const [visibleClients, setVisibleClients] = useState(3)
  const initialDateSelect = ():string => {
    const adjustedDate = new Date()
    const dayOfWeek = adjustedDate.getDay()
    if (dayOfWeek === 0) {
      adjustedDate.setDate(adjustedDate.getDate() + 2)
    }
    if (dayOfWeek === 1) {
      adjustedDate.setDate(adjustedDate.getDate() + 1)
    }
    return adjustedDate.toDateString()
  }
  const [dateSelected, setDateSelected] = useState(initialDateSelect)
  const queryClient = useQueryClient()
  const showMoreClients = () => {
    setVisibleClients(prevVisibleClients => prevVisibleClients + 1)
  }
  const isBarberDay = (date:Date) => {
    const day = getDay(date)
    return day !== 0 && day !== 1
  }
  const { data, isLoading } = useQuery({
    queryFn: () => getDatesByDay(dateSelected),
    queryKey: ['datesDay', dateSelected]
  })
  const { mutate } = useMutation({
    mutationFn: deleteDateAdmin,
    onError: (error) => { toast.error(error.message) },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['datesDay'] })
      toast.success(data)
    }
  })
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDateSelected(date.toDateString())
    }
  }
  const handleDeletePastAppointments = async () => {
    const dateString = new Date().toDateString()
    const deleteForm = {
      dateString, time: '18:00'
    }
    const result = await deletePastAppointments(deleteForm)
    toast.success(result)
    // cancelar querys
  }
  if (isLoading) return (<Spinner/>)
  if (data) {
    return (
        <>
        <h1 className="text-2xl text-center">Administrador</h1>
        <div className=" w-full h-[60vh] bg-ship-gray-50 rounded-md p-2 my-5 flex flex-col items-center gap-4">
              <h1 className="text-center text-xl">Turnos</h1>
               <button className='border hover:bg-ship-gray-50 hover:text-ship-gray-950 px-2 md:py-1 md:px-3 rounded-md
                                  bg-ship-gray-700 text-ship-gray-50'
                        onClick={handleDeletePastAppointments}>Borrar turnos viejos
                </button>
          <div className='flex justify-between items-center gap-5'>
                <DatePicker
                  minDate={new Date()}
                  locale="es"
                  filterDate={isBarberDay}
                  selected={new Date(dateSelected)}
                  onChange={ handleDateChange }
                  className='w-fit text-center text-ship-gray-950 cursor-pointer' placeholderText='Elegir fecha'
                />

          </div>
          {
            data.length
              ? (<>
                {
                data.slice(0, visibleClients).map(date => (
                  <div key={date.clientId._id}
                       className="border border-ship-gray-950 flex gap-5 justify-between md:justify-start md:max-w-lg p-3 rounded-md"
                  >
                    <div className='flex items-center justify-center'>
                      <img className='size-16 rounded-full' src={`${date.clientId.picture !== '' ? date.clientId.picture : './user.svg'}`} alt={`Imagen de perfil de ${date.clientId.userName}`} />
                    </div>
                    <div className="text-ship-gray-950">
                      <span className='flex justify-between'>
                        <h1 className="text-lg">{date.clientId.userName}</h1>
                        <button onClick={() => mutate(date._id)} className='bg-ship-gray-600'>
                          <img className='md:size-9' src="/trash.svg" alt="Delete Icon" />
                        </button>
                      </span>
                        {
                          date.clientId.phone &&
                          <span className='flex items-center gap-3'>
                            <p>Telefono: {date.clientId.phone}</p>
                            <a href={`https://wa.me/${date.clientId.phone}`} target="_blank" rel="noopener noreferrer">
                              <img src='/brand-whatsapp.svg' className='size-5'/>
                            </a>
                        </span>
                        }
                        <p>Hora: {date.time} {''} </p>
                        <p>Día: {formatDate(date.date)}</p>
                    </div>

                  </div>
                ))
                }
                {
                  (data.length > visibleClients) &&
                  <p className='cursor-pointer' onClick={showMoreClients}>Mostrar más...</p>
                }
            </>)
              : <p>No hay turnos este día</p>

          }
        </div>
        <div className='h-28'>
          <h1 className='text-2xl text-center'>Cambiar disponibilidad</h1>
          <p className='text-center'>Proximamente</p>
        </div>
        <div className='h-28'>
          <h1 className='text-2xl text-center'>Avisos</h1>
          <p className='text-center'>Proximamente</p>
        </div>
        </>
    )
  }
}
