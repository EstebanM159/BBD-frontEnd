import { useForm } from 'react-hook-form'
import ButtonBack from '../../components/ButtonBack'
import ErrorMessage from '../../components/ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '../../api/AuthApi'
import { toast } from 'react-toastify'
import { ForgotPasswordForm } from '../../schemas'

export default function ForgotPasswordView () {
  const initialValues = { email: '' }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })
  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })
  const handleForgotPassword = (formData:ForgotPasswordForm) => {
    mutate(formData)
  }
  return (
   <>
        <div className="px-3 py-6 flex flex-col">
             <ButtonBack route={'/auth'}/>
            <h1 className="my-14 md:mx-auto text-3xl font-semibold text-center">
                Ingrese su mail para enviarle un codigo de restauración
            </h1>

            <form onSubmit={handleSubmit(handleForgotPassword)}
                  className='flex flex-col items-center gap-2'
                  noValidate
            >
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
                    <input type="submit" value='Enviar códido'
                          className='w-full max-w-96 rounded-lg bg-ship-gray-950 text-ship-gray-50 px-7 py-5 mt-8  cursor-pointer font-medium text-xl'
                    />
            </form>

        </div>
    </>
  )
}
