import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import { useAuth } from '../../hooks/useAuth'
import { UpdateProfile } from '../../schemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from '../../api/ProfileApi'
import { toast } from 'react-toastify'
import ButtonBack from '../../components/ButtonBack'

export default function EditProfile () {
  const { data } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const initialvalues :UpdateProfile = {
    _id: data?._id || '',
    userName: data?.userName || '',
    email: data?.email || ''
  }
  const { register, formState: { errors }, handleSubmit } = useForm<UpdateProfile>({ defaultValues: initialvalues })
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => { toast.error(error.message) },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      navigate('/perfil')
    }
  })
  const handleChangeProfile = (formData:UpdateProfile) => {
    mutate(formData)
  }

  return (
    <>
    <div className='w-full flex gap-5 mb-6'>
      <ButtonBack route='/perfil'/>
      <h1 className="text-2xl font-black text-center ">Editar</h1>
    </div>
      <form onSubmit={handleSubmit(handleChangeProfile)}
                    className='flex flex-col items-center gap-3 h-[75vh]'
                noValidate
                >
                    <input id='userName'type="userName" placeholder="Nombre de usuario"
                            className='w-full bg-ship-gray-100 max-w-96 rounded-lg
                            placeholder:text-md placeholder:font-medium p-4 border-2 border-ship-gray-600'
                            defaultValue={initialvalues.userName}
                    {...register('userName', {
                      required: 'El nombre de usuario es obligatorio'
                    })}
                    />
                    {errors.userName && (
                      <ErrorMessage>{errors.userName.message}</ErrorMessage>
                    )}
                    <input type="email" placeholder="Email"
                          className='w-full max-w-96 rounded-lg  bg-ship-gray-100
                                      placeholder:text-md placeholder:font-medium p-4 border-2 border-ship-gray-600'
                          defaultValue={initialvalues.email}
                    {...register('email', {
                      required: 'El email es obligatorio'
                    })}
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                    {/* <input id="phone" type="tel" placeholder="Nro. de telefono"
                            className='w-full max-w-96 rounded-lg bg-ship-gray-100
                                      placeholder:text-md placeholder:font-medium p-4 border-2 border-ship-gray-600'
                    {...register('phone', {
                      required: 'El telefono es obligatorio'
                    })}
                    />
                    {errors.phone && (
                      <ErrorMessage>{errors.phone.message}</ErrorMessage>
                    )} */}
                    <input type="submit" value='Guardar cambios'
                          className='w-full max-w-96 rounded-lg bg-ship-gray-950 text-ship-gray-50 px-7 py-5 mt-7 cursor-pointer font-medium text-xl'
                    />
        </form>
    </>
  )
}
