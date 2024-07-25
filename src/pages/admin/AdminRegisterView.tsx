import ButtonBack from '../../components/ButtonBack'
import { toast, ToastContainer } from 'react-toastify'
import ErrorMessage from '../../components/ErrorMessage'
import { User } from '../../schemas'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { createAdminAccount } from '../../api/AdminApi'

export default function AdminRegisterView () {
  const { handleSubmit, reset, register, formState: { errors }, watch } = useForm<User>()
  const { mutate } = useMutation({
    mutationFn: createAdminAccount,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })
  const handleCreateAccount = (data:User) => mutate(data)
  const password = watch('password')
  return (
    <>
        <div className="px-3 py-6 flex flex-col">
            <ButtonBack route={'/auth'}/>
            <h1 className="mt-10 mb-8 md:mx-auto text-3xl font-semibold text-balance">¡Bienvenido! Únete a barberia</h1>
            <form onSubmit={handleSubmit(handleCreateAccount)}
                    className='flex flex-col items-center gap-3'
                noValidate
            >
                    <input type="hidden" value={'admin'} id='role'
                      {...register('role', {
                        required: 'El nombre de usuario es obligatorio'
                      })}
                    />
                    <input id='userName'type="userName" placeholder="Nombre de usuario"
                            className='w-full bg-ship-gray-100 max-w-96 rounded-lg
                            placeholder:text-md placeholder:font-medium p-4 border-2 border-ship-gray-600'
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
                    {...register('email', {
                      required: 'El email es obligatorio'
                    })}
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                    <input id="phone" type="tel" placeholder="Nro. de telefono"
                            className='w-full max-w-96 rounded-lg bg-ship-gray-100
                                      placeholder:text-md placeholder:font-medium p-4 border-2 border-ship-gray-600'
                    {...register('phone', {
                      required: 'El telefono es obligatorio'
                    })}
                    />
                    {errors.phone && (
                      <ErrorMessage>{errors.phone.message}</ErrorMessage>
                    )}
                    <input type="password" placeholder="Contraseña"
                            className='w-full max-w-96 rounded-lg bg-ship-gray-100
                            placeholder:text-md placeholder:font-medium p-4 border-2 border-ship-gray-600'
                      {...register('password', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                          value: 8,
                          message: 'La contraseña debe tener mínimo de 8 caracteres'
                        }
                      })}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                    <input id="password_confirmation" type="password" placeholder="Repetir contraseña"
                      className='w-full max-w-96 rounded-lg bg-ship-gray-100
                              placeholder:text-md placeholder:font-medium p-4 border-2 border-ship-gray-600'
                      {...register('password_confirmation', {
                        required: 'Repetir la contraseña es obligatorio',
                        validate: value => value === password || 'Las contraseñas no son iguales'
                      })}
                    />
                    {errors.password_confirmation && (
                      <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                    <input type="submit" value='Registrar'
                          className='w-full max-w-96 rounded-lg bg-ship-gray-950 text-ship-gray-50 px-7 py-5 mt-7 cursor-pointer font-medium text-xl'
                    />

                </form>
            <ToastContainer/>
        </div>
    </>
  )
}
