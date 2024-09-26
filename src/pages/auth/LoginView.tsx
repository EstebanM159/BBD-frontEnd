import { Link, useNavigate } from 'react-router-dom'
import ButtonBack from '../../components/ButtonBack'
import { useForm } from 'react-hook-form'
import { UserLogin } from '../../schemas'
import ErrorMessage from '../../components/ErrorMessage'
import LoginButton from '../../components/Auth/LoginButton'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { loginWithEmail, loginWithGoogle } from '../../api/AuthApi'
import { GoogleLogin } from '@react-oauth/google'
export default function LoginView () {
  const navigate = useNavigate()
  const initialValues: UserLogin = {
    email: '',
    password: ''
  }
  const { handleSubmit, register, formState: { errors } } = useForm<UserLogin>({
    defaultValues: initialValues
  })
  const { mutate } = useMutation({
    mutationFn: loginWithEmail,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate('/')
    }
  })

  const handleLoginAccount = (formData:UserLogin) => {
    mutate(formData)
  }
  return (
    <>
        <div className="px-3 py-6 flex flex-col">
             <ButtonBack route={'/auth'}/>
            <h1 className="my-14 md:mx-auto text-3xl font-semibold  text-center">
              Bienvenido de nuevo a barbería me alegro de que estés aquí</h1>

            <form onSubmit={handleSubmit(handleLoginAccount)}
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
                    <p className="text-sm text-right max-w-96 flex gap-2 justify-end w-full py-2 text-ship-gray-900">¿Olvidaste tu contraseña?
                      {' '}
                      <Link to='/auth/recuperar-contraseña' className='text-bianca-500 font-semibold'>Restablecer</Link>
                    </p>
                    <input type="submit" value='Iniciar Sesión'
                          className='w-full max-w-96 rounded-lg bg-ship-gray-950 text-ship-gray-50 px-7 py-5  cursor-pointer font-medium text-xl'
                    />
            </form>

            <p className="text-center mt-8 font-semibold text-ship-gray-600 ">O inicia sesión con</p>
            <div className="flex justify-center items-center mt-8 gap-28 ">
                <LoginButton/>
                <GoogleLogin
                  type='icon'
                  shape='pill'
                  onSuccess={async (credentialResponse) => {
                    const result = await loginWithGoogle(credentialResponse)
                    toast.success(result)
                    navigate('/')
                  }}
                  onError={() => {
                    toast.error('Error al iniciar sesion con Google')
                  }}
                />
                <img src="/apple.svg" alt="" className="size-6 cursor-pointer hover:drop-shadow-lg"/>
            </div>
            <p className="text-center mt-12 font-medium text-ship-gray-950 ">¿No tienes cuenta? {' '}
              <Link className="text-bianca-500 hover:underline font-semibold" to='/auth/crear-cuenta'>Crea una!</Link>
            </p>

        </div>
    </>
  )
}
