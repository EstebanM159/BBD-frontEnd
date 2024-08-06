import { useForm } from 'react-hook-form'
import { ForgotPasswordToken, NewPasswordT } from '../../schemas'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updatePasswordWithToken } from '../../api/AuthApi'

type NewPasswordFormProps = {
  token: ForgotPasswordToken['token']
}
export default function NewPasswordForm ({ token }:NewPasswordFormProps) {
  const navigate = useNavigate()
  const initialValues: NewPasswordT = {
    password: '',
    password_confirmation: ''
  }
  const { handleSubmit, register, reset, watch, formState: { errors } } = useForm({ defaultValues: initialValues })
  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => { toast.error(error.message) },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      navigate('/auth/iniciar-sesion')
    }
  })
  const handleNewPassword = (formData:NewPasswordT) => {
    const data = {
      formData,
      token
    }
    mutate(data)
  }
  const password = watch('password')

  return (
    <>

      <h1 className="text-5xl font-black text-center ">Restablecer contraseña</h1>
      <p className="text-2xl font-light text-center mt-5 ">
          Ingresa tu nueva {''}
          <span className=" text-fuchsia-500 font-bold">contraseña</span>
      </p>
      <form onSubmit={handleSubmit(handleNewPassword)} noValidate className='space-y-8 p-10  bg-white mt-10 flex flex-col'>
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
        <input type="submit" value='Guardar contraseña'
            className='w-full max-w-96 rounded-lg bg-envy-950 text-ship-gray-50 px-7 py-5 mt-7 cursor-pointer font-medium text-xl'
          />
      </form>
    </>
  )
}
