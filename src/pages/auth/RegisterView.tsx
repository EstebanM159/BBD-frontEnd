import { Link } from 'react-router-dom'
import CreateAccountForm from '../../components/Auth/CreateAccountForm'
// import ButtonBack from '../../components/ButtonBack'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'
import { createAccountWithGoogle } from '../../api/AuthApi'
import { useMutation } from '@tanstack/react-query'
import RegisterFacebookButton from '../../components/Auth/RegisterFacebookButton'

export default function RegisterView () {
  // const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: createAccountWithGoogle,
    onError: (error) => { toast.error(error.message) },
    onSuccess: (data) => {
      toast.success(data)
    }
  })
  return (
    <>
        <div className="px-3 py-6  flex flex-col  mt-6">
            {/* <ButtonBack route={'/'}/> */}
            <h1 className="mt-4 mb-8 md:mx-auto text-3xl font-semibold text-center">¡Bienvenido! Únete a barberia pepe para empezar</h1>
            <CreateAccountForm/>
            <p className="text-center mt-8 font-semibold text-ship-gray-600 ">O registrate con</p>

            <div className="flex justify-center items-center mt-8 gap-11 md:gap-28 pointer-events-none">

                <RegisterFacebookButton/>
                <div className='pointer-events-none'>

                <GoogleLogin
                  type='icon'
                  shape='pill'
                  onSuccess={async (credentialResponse) => {
                    mutate(credentialResponse)
                  }}
                  onError={() => {
                    toast.error('Usuario no registrado')
                  }}
                />
                </div>
                <img src="/apple.svg" alt="" className="size-6 cursor-pointer hover:drop-shadow-lg"/>
            </div>
            <p className="text-center mt-12 font-medium text-ship-gray-950 ">¿Ya tienes cuenta? {' '}
                <Link className="text-bianca-500 hover:underline font-semibold" to='/auth/iniciar-sesion'>Inicia sesión</Link>
            </p>
        </div>
    </>
  )
}
