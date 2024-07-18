/* eslint-disable @typescript-eslint/no-unused-vars */
import 'react-datepicker/dist/react-datepicker.css'
import './CustomDatePicker.css'
import { useForm } from 'react-hook-form'
import DatePicker, { registerLocale } from 'react-datepicker'
import { es } from 'date-fns/locale/es'
import { DateT } from '../../schemas/ShiftSchemas'
import ErrorMessage from '../ErrorMessage'
export default function DateForm () {
  registerLocale('es', es)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<DateT>()
  const registerDate = (formData:DateT) => {
    console.log(formData)
  }
  const handleDateChange = (date: Date) => {
    if (date) {
      const formatedDate = date.toDateString()
      setValue('date', formatedDate)
    }
  }
  return (
        <>
            <div className='flex items-center  w-full h-full flex-col gap-20'>
                <h1 className='text-2xl mt-10 px-3 font-semibold text-wrap text-center'>Seleccione servicio, fecha y horario</h1>
                <form onSubmit={handleSubmit(registerDate)}
                    className='flex flex-col'
                >

                <DatePicker
                  minDate={new Date()}
                  inline
                  calendarClassName="custom-calendar" // Clase personalizada para estilizar el calendario
                  dayClassName={(date) => 'custom-day'}
                  locale="es"
                  // onSelect={() => handleDateSelect} // when day is clicked
                  onChange={ handleDateChange }
                />
                    <input type="hidden" {...register('date', {
                      required: 'La fecha es obligatoria'
                    })} />
                    <label className='py-3 text-xl'>Servicio</label>
                    <select id=""
                        className='rounded bg-crowshead-700 px-7 py-2'
                        defaultValue='fade'
                        {...register('service', {
                          required: 'El servicio es obligatorio'
                        })}
                    >
                        <option value="fade">Fade</option>
                        <option value="barba">Barba</option>
                        <option value="corte">Corte simple</option>
                        <option value="rapado">Rapado</option>
                    </select>
                    {errors.service && (
                      <ErrorMessage>{errors.service.message}</ErrorMessage>
                    )}
                    {errors.date && (
                      <ErrorMessage>{errors.date.message}</ErrorMessage>
                    )}
                    <label className='py-3 text-xl'>Horario</label>
                    <input type="time" min="09:00" max="20:00" className='rounded bg-crowshead-700 px-7 py-2' value={'10:00'}
                    {...register('time', {
                      required: 'La hora es obligatoria'
                    })}
                    />
                    {errors.time && (
                      <ErrorMessage>{errors.time.message}</ErrorMessage>
                    )}
                    <input type="submit" value='Guardar turno' className='rounded bg-oscuro px-7 py-2 mt-10 cursor-pointer'/>
                </form>
            </div>

        </>
  )
}
