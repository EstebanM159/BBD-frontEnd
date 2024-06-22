import { Link } from 'react-router-dom'
import CreateAccountForm from '../../components/CreateAccountForm'
import ButtonBack from '../../components/ButtonBack'
import { ToastContainer } from 'react-toastify'
import RegisterButton from '../../components/Auth/RegisterButton'

export default function RegisterView () {
  return (
    <>
        <div className="px-3 py-6">
            <ButtonBack route={'/'}/>
            <h1 className="mt-10 mb-8 text-3xl font-semibold text-balance max-w-xl">¡Bienvenido! Únete a barberia pepe para empezar</h1>
            <CreateAccountForm/>
            <p className="text-center mt-8 font-semibold text-ship-gray-600 ">O registrate con</p>

            <div className="flex justify-around mt-6 ">
                <RegisterButton/>
                <img src="/google.svg" alt="" className="size-6 cursor-pointer hover:drop-shadow-lg"/>
                <img src="/apple.svg" alt="" className="size-6 cursor-pointer hover:drop-shadow-lg"/>
            </div>
            <p className="text-center mt-10 font-medium text-ship-gray-950 ">¿Ya tienes cuenta? {' '}
                <Link className="text-bianca-500 hover:underline font-semibold" to='/auth/login'>Inicia sesión</Link>
            </p>
            <ToastContainer/>
        </div>
    </>
  )
}
