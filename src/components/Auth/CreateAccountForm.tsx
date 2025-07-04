import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { User } from '../../schemas'
import { useMutation } from '@tanstack/react-query'
import { createAccount } from '../../api/AuthApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Spinner from '../Spinner'
export default function CreateAccountForm () {
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  const { handleSubmit, reset, register, formState: { errors }, watch } = useForm<User>()
  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
        toast.error(error.message)
        setIsLoading(false)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      navigate('/inicio')
    }
  })
  const handleCreateAccount = (data:User) => {
    setIsLoading(true)
    mutate(data)
  }
  const password = watch('password')
  return (
    <>
        <form onSubmit={handleSubmit(handleCreateAccount)}
                    className='flex flex-col items-center gap-2'
                noValidate
                >
                    <input id='userName'type="userName" placeholder="Nombre de usuario"
                            className='w-full max-w-96 bg-ship-gray-100  rounded-lg
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
                     <button type="submit" className='w-full max-w-96 rounded-lg bg-ship-gray-950 text-ship-gray-50 px-7 py-6 flex justify-center  cursor-pointer font-medium'>
                        {!isLoading ? <span className='text-2xl'>Iniciar sesion</span> : <Spinner spinnerClass='w-8 h-8'/>}
                    </button>
                </form>
    </>
  )
}
