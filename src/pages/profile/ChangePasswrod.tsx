import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ChangePasswordForm } from '../../schemas'
import ErrorMessage from '../../components/ErrorMessage'
import { changePassword } from '../../api/ProfileApi'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ButtonBack from '../../components/ButtonBack'

export default function ChangePasswrod () {
  const navigate = useNavigate()
  const initialValues: ChangePasswordForm = {
    currentPassword: '',
    newPassword: '',
    newPassword_confirmation: ''
  }
  const { handleSubmit, register, reset, watch, formState: { errors } } = useForm({ defaultValues: initialValues })
  const password = watch('newPassword')
  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => { toast.error(error.message) },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      navigate('/inicio')
    }
  })
  const handleNewPassword = (formData:ChangePasswordForm) => {
    mutate(formData)
  }
  return (
    <>
    <div className='w-full flex gap-5'>
      <ButtonBack route='/perfil'/>
      <h1 className="text-2xl font-black text-center ">Cambiar contraseña</h1>
    </div>
      {/* <p className="text-2xl font-light text-center mt-5 ">
          Ingresa tu {''}
          <span className=" text-fuchsia-500 font-bold">contraseña actual</span>
      </p> */}
      <form noValidate onSubmit={handleSubmit(handleNewPassword)} className='space-y-8 p-10  bg-white mt-2 flex flex-col'>
        <input type="password" placeholder="Contraseña actual"
                            className='w-full max-w-96 rounded-lg bg-ship-gray-100
                            placeholder:text-md placeholder:font-medium p-4 border-2 border-ship-gray-600'
                      {...register('currentPassword', {
                        required: 'La contraseña actual es obligatoria',
                        minLength: {
                          value: 8,
                          message: 'La contraseña debe tener mínimo de 8 caracteres'
                        }
                      })}
                    />
                    {errors.currentPassword && (
                      <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>
                    )}
         <input type="password" placeholder="Contraseña nueva"
                            className='w-full max-w-96 rounded-lg bg-ship-gray-100
                            placeholder:text-md placeholder:font-medium p-4 border-2 border-ship-gray-600'
                      {...register('newPassword', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                          value: 8,
                          message: 'La contraseña debe tener mínimo de 8 caracteres'
                        }
                      })}
                    />
                    {errors.newPassword && (
                      <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
                    )}
        <input id="newPassword_confirmation" type="password" placeholder="Repetir contraseña nueva"
                      className='w-full max-w-96 rounded-lg bg-ship-gray-100
                              placeholder:text-md placeholder:font-medium p-4 border-2 border-ship-gray-600'
                      {...register('newPassword_confirmation', {
                        required: 'Repetir la contraseña es obligatorio',
                        validate: value => value === password || 'Las contraseñas no son iguales'
                      })}
                    />
                    {errors.newPassword_confirmation && (
                      <ErrorMessage>{errors.newPassword_confirmation.message}</ErrorMessage>
                    )}
        <input type="submit" value='Guardar contraseña'
            className='w-full max-w-96 rounded-lg bg-envy-950 text-ship-gray-50 px-7 py-5 mt-7 cursor-pointer font-medium text-xl'
          />
      </form>
    </>
  )
}
