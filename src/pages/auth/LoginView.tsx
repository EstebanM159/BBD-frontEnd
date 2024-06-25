import { Link, useNavigate } from 'react-router-dom'
import ButtonBack from '../../components/ButtonBack'
import { useForm } from 'react-hook-form'
import { UserLogin } from '../../schemas'
import ErrorMessage from '../../components/ErrorMessage'
import LoginButton from '../../components/Auth/LoginButton'
import { FacebookLoginClient } from '@greatsumini/react-facebook-login'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { getUser, login } from '../../api/AuthApi'

export default function LoginView () {
  const navigate = useNavigate()
  const { handleSubmit, register, formState: { errors } } = useForm<UserLogin>()
  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate('/inicio')
    }

  })
  const handleLoginAccount = (formData:UserLogin) => {
    mutate(formData)
  }
  const logout = () => {
    FacebookLoginClient.logout(() => {
      console.log('logout completed!')
    })
    toast.success('Desloguedo')
  }
  const getuser = async () => {
    const user = await getUser()
    if (user) {
      console.log(user)
      toast.success('Hay usuario')
    } else {
      console.log('no hay tal user')
      toast.success('no hay usuario')
    }
  }
  return (
    <>
        <div className="px-3 py-6 flex flex-col">
             <ButtonBack route={'/'}/>
            <h1 className="my-14 md:mx-auto text-3xl font-semibold  ">
              Bienvenido de nuevo a barbería me alegro de que estés aquí</h1>

            <form onSubmit={handleSubmit(handleLoginAccount)}
                  className='flex flex-col items-center gap-6'
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
                      <Link to='#' className='text-bianca-500 font-semibold'>Restablecer</Link>
                    </p>
                    <input type="submit" value='Iniciar Sesión'
                          className='w-full max-w-96 rounded-lg bg-ship-gray-950 text-ship-gray-50 px-7 py-5  cursor-pointer font-medium text-xl'
                    />
            </form>

            <p className="text-center mt-8 font-semibold text-ship-gray-600 ">O inicia sesión con</p>
            <div className="flex justify-center items-center mt-8 gap-28 ">
                <LoginButton/>
                <img src="/google.svg" alt="" className="size-6 cursor-pointer hover:drop-shadow-lg"/>
                <img src="/apple.svg" alt="" className="size-6 cursor-pointer hover:drop-shadow-lg"/>
            </div>
            <p className="text-center mt-12 font-medium text-ship-gray-950 ">¿No tienes cuenta? {' '}
              <Link className="text-bianca-500 hover:underline font-semibold" to='/auth/create-account'>Crea una!</Link>
            </p>

        {/* <button onClick={logout}>LOGOUT</button>
        <button onClick={getuser}>GETUSER</button> */}
        </div>
    </>
  )
}
