import { useForm } from 'react-hook-form'
import { Date } from '../../schemas'
import ErrorMessage from '../ErrorMessage'

export default function DateForm () {
  const { register, handleSubmit, formState: { errors } } = useForm<Date>()
  const registerDate = (formData:Date) => {
    console.log(formData)
  }
  return (
        <>
            <div className='flex items-center  w-full h-full flex-col gap-20'>
                <h1 className='text-2xl mt-10 px-3 font-semibold text-wrap text-center'>Seleccione servicio, fecha y horario</h1>
                <form onSubmit={handleSubmit(registerDate)}
                    className='flex flex-col w-full'
                >
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
                    <label className='py-3 text-xl'>Fecha</label>
                    <input type="date" className='rounded bg-crowshead-700 px-7 py-2'
                    {...register('date', {
                      required: 'La fecha es obligatoria'
                    })}
                    />
                    {errors.date && (
                      <ErrorMessage>{errors.date.message}</ErrorMessage>
                    )}
                    <label className='py-3 text-xl'>Horario</label>
                    <input type="time" min="09:00" max="20:00" className='rounded bg-crowshead-700 px-7 py-2'
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
