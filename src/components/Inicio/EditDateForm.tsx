import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { es } from 'date-fns/locale/es'
import { getDay } from 'date-fns'

import ErrorMessage from '../ErrorMessage'
import { useDateTimes } from '../../hooks/useDateTimes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { DateInicioT, DateT } from '../../schemas/ShiftSchemas'
import { updateDate } from '../../api/DateApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
type EditDateFormProps= {
    data :DateInicioT,
    dateId:string
}
export default function EditDateForm ({ data, dateId } :EditDateFormProps) {
  registerLocale('es', es)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [dateSelected, setDateSelected] = useState(data.date)
  const horariosDisponibles = useDateTimes(dateSelected)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<DateT>()
  const { mutate } = useMutation({
    mutationFn: updateDate,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['date'] })
      queryClient.invalidateQueries({ queryKey: ['times'] })
      queryClient.invalidateQueries({ queryKey: ['dateEdit', dateId] })
      toast.success(data)
    }
  })
  const handleUpdateDate = (formData:DateT) => {
    const dataUpdate = {
      formData,
      dateId
    }
    mutate(dataUpdate)
    navigate('/')
  }
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDateSelected(date.toDateString())
      setValue('date', date.toDateString())
    }
  }
  const isBarberDay = (date:Date) => {
    const day = getDay(date)
    return day !== 0 && day !== 1
  }
  return (
    <>
            <div className='flex items-center justify-center w-full h-full md:h-[85vh] flex-col gap-10'>
                <h1 className='text-2xl mt-10 px-3 font-semibold text-wrap text-center md:mt-0'>Edite el servicio, fecha u horario</h1>
                <form onSubmit={handleSubmit(handleUpdateDate)}
                    className='flex flex-col gap-2 mb-5 md:flex-row md:items-center md:gap-16'
                >
                <DatePicker
                  minDate={new Date()}
                  // este selected tiene que cambiar si hago click
                  selected={new Date(dateSelected)}
                  inline
                  calendarClassName="custom-calendar" // Clase personalizada para estilizar el calendario
                  dayClassName={() => 'custom-day'}
                  locale="es"
                  onChange={ handleDateChange }
                  filterDate={isBarberDay}
                />
                  <div className='md:flex md:flex-col flex-col flex'>
                    <input type="hidden" value={new Date(data.date).toDateString()} {...register('date', {
                      required: 'La fecha es obligatoria'
                    })} />
                    {errors.date && (<ErrorMessage>{errors.date.message}</ErrorMessage>)}
                    <label className='py-3 text-xl'>Horario</label>
                      <select id="timeSelect" className='rounded bg-crowshead-700 px-7 py-2'
                      {...register('time', { required: 'La hora es obligatoria' })}
                      >
                        <option value="">{horariosDisponibles.length === 0
                          ? 'No hay horario disponible'
                          : 'Seleccione una hora'}</option>
                        {horariosDisponibles.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>

                    {errors.time && (
                      <ErrorMessage>{errors.time.message}</ErrorMessage>
                    )}
                    <label className='py-3 text-xl'>Servicio</label>
                    <select id=""
                        className='rounded bg-crowshead-700 px-7 py-2'
                        defaultValue={data.service}
                        {...register('service', { required: 'El servicio es obligatorio' })}>
                        <option value="fade">Fade</option>
                        <option value="barba">Barba</option>
                        <option value="corte">Corte simple</option>
                        <option value="rapado">Rapado</option>
                    </select>
                    {errors.service && (<ErrorMessage>{errors.service.message}</ErrorMessage>)}

                    <input type="submit" value='Guardar turno' className='rounded bg-nevada-700 text-xl text-ship-gray-50 px-7 py-2 mt-10 cursor-pointer'/>
                </div>
                </form>
            </div>
            </>
  )
}
