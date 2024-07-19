/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'react-datepicker/dist/react-datepicker.css'
import './CustomDatePicker.css'
import { useForm } from 'react-hook-form'
import DatePicker, { registerLocale } from 'react-datepicker'
import { es } from 'date-fns/locale/es'
import { DateT } from '../../schemas/ShiftSchemas'
import ErrorMessage from '../ErrorMessage'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createDate, getTimes } from '../../api/DateApi'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DateForm () {
  registerLocale('es', es)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [dateSelected, setDateSelected] = useState(new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<DateT>()
  const { mutate } = useMutation({
    mutationFn: createDate,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => toast.success(data)
  })
  const { data } = useQuery({
    queryKey: ['times', dateSelected],
    queryFn: () => getTimes(dateSelected)
  })

  const registerDate = (formData:DateT) => {
    mutate(formData)
    queryClient.invalidateQueries({ queryKey: ['date', 'times'] })
    navigate('/')
  }
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const dateString = date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      setDateSelected(dateString)
      setValue('date', dateString)
    }
  }
  const horarios = [
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30']
  const horariosDisponibles = horarios.filter(horario => !data?.includes(horario))
  return (
        <>
            <div className='flex items-center  w-full h-full flex-col gap-10'>
                <h1 className='text-2xl mt-10 px-3 font-semibold text-wrap text-center'>Seleccione servicio, fecha y horario</h1>
                <form onSubmit={handleSubmit(registerDate)}
                    className='flex flex-col gap-2 mb-5'
                >
                <DatePicker
                  minDate={new Date()}
                  inline
                  calendarClassName="custom-calendar" // Clase personalizada para estilizar el calendario
                  dayClassName={() => 'custom-day'}
                  locale="es"
                  onChange={ handleDateChange }
                />
                    <input type="hidden" value={new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} {...register('date', {
                      required: 'La fecha es obligatoria'
                    })} />
                    {errors.date && (<ErrorMessage>{errors.date.message}</ErrorMessage>)}
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
                    <label className='py-3 text-xl'>Horario</label>
                      <select id="timeSelect" className='rounded bg-crowshead-700 px-7 py-2'
                      {...register('time', { required: 'La hora es obligatoria' })}
                      >
                        <option value="">Seleccione una hora</option>
                        {horariosDisponibles.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>

                    {errors.time && (
                      <ErrorMessage>{errors.time.message}</ErrorMessage>
                    )}
                    <input type="submit" value='Guardar turno' className='rounded bg-nevada-700 text-xl text-ship-gray-50 px-7 py-2 mt-10 cursor-pointer'/>
                </form>
            </div>

        </>
  )
}
