import {useForm} from 'react-hook-form'
import { Date } from '../schemas'
export default function DateForm() {
const { register, handleSubmit, formState:{errors}} = useForm<Date>()
    const registerDate = (formData:Date)=>{
        console.log(formData)
    }
  return (
        <>
            <div className='flex items-center justify-center w-full flex-col gap-20'>
                <h1 className='text-2xl px-3 font-semibold text-wrap text-center'>Seleccione servicio, fecha y horario</h1>
                <form onSubmit={handleSubmit(registerDate)}
                    className='flex flex-col w-2/3 max-w-80 bg-fondoOscuro p-10'
                >
                    <label className='py-3 text-lg'>Servicio</label>
                    <select id=""
                        className='rounded bg-crowshead-700 px-7 py-2'
                        defaultValue='fade'
                        {...register('service',{
                            required:'El servicio es obligatorio'
                        })}
                    >
                        <option value="fade">Fade</option>
                        <option value="barba">Barba</option>
                        <option value="corte">Corte simple</option>
                        <option value="rapado">Rapado</option>
                    </select>
                    <label className='py-3 text-lg'>Fecha</label>
                    <input type="date" className='rounded bg-crowshead-700 px-7 py-2'
                    {...register('date', {
                      required: 'La fecha es obligatoria'
                    })}
                    />
                    {/* */}
                    <label className='py-3 text-lg'>Horario</label>
                    <input type="time" min="09:00" max="20:00" className='rounded bg-crowshead-700 px-7 py-2'
                    {...register('time', {
                      required: 'La hora es obligatoria'
                    })}
                    />
                    <input type="submit" value='Guardar cita' className='rounded bg-oscuro px-7 py-2 mt-10 cursor-pointer'/>
                </form>
            </div>
            
        </>
  )
}
