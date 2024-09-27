/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'react-datepicker/dist/react-datepicker.css'
import './CustomDatePicker.css'
import { useForm } from 'react-hook-form'
import { getDay } from 'date-fns'
import DatePicker, { registerLocale } from 'react-datepicker'
import { es } from 'date-fns/locale/es'
import { DateT } from '../../schemas/ShiftSchemas'
import ErrorMessage from '../../components/ErrorMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDate } from '../../api/DateApi'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDateTimes } from '../../hooks/useDateTimes'

export default function DateForm () {
  registerLocale('es', es)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<DateT>()
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
  const horariosDisponibles = useDateTimes(dateSelected)
  const { mutate } = useMutation({
    mutationFn: createDate,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['date', 'times'] })
      navigate('/inicio')
      toast.success(data)
    }
  })
  const registerDate = (formData:DateT) => {
    mutate(formData)
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
                <h1 className='text-2xl mt-10 px-3 font-semibold text-wrap text-center md:mt-0'>Seleccione servicio, fecha y horario</h1>
                <form onSubmit={handleSubmit(registerDate)}
                    className='flex flex-col gap-2 mb-5 md:flex-row md:items-center md:gap-16'
                >
                <DatePicker
                  minDate={new Date()}
                  inline
                  selected={new Date(dateSelected)}
                  calendarClassName="custom-calendar" // Clase personalizada para estilizar el calendario
                  dayClassName={() => 'custom-day'}
                  locale="es"
                  filterDate={isBarberDay}
                  onChange={ handleDateChange }
                />
                <div className='md:flex md:flex-col flex-col flex'>
                    <input type="hidden" value={dateSelected} {...register('date', {
                      required: 'La fecha es obligatoria'
                    })} />
                    {errors.date && (<ErrorMessage>{errors.date.message}</ErrorMessage>)}
                     <label className='py-3 text-xl'>Horario</label>
                      <select id="timeSelect" className='rounded bg-crowshead-700 px-7 py-2'
                      {...register('time', { required: 'La hora es obligatoria' })}
                      >
                        <option value="">{horariosDisponibles.length === 0
                          ? 'No hay horario disponible'
                          : 'Seleccione una hora'}
                        </option>
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
                        defaultValue='fade'
                        {...register('service', { required: 'El servicio es obligatorio' })}>
                        <option value="fade">Fade</option>
                        <option value="barba">Barba</option>
                        <option value="corte">Corte simple</option>
                        <option value="rapado">Rapado</option>
                    </select>
                    {errors.service && (<ErrorMessage>{errors.service.message}</ErrorMessage>)}

                    <input type="submit" value='Guardar turno' className='rounded bg-nevada-700 text-xl text-ship-gray-50 px-7 py-2 mt-10 md:mt-5 cursor-pointer'/>
                </div>
                </form>
            </div>

        </>
  )
}
