import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { validateToken } from '../../api/AuthApi'
import { toast } from 'react-toastify'
import { ForgotPasswordToken } from '../../schemas'
type NewPasswordTokenProps = {
    token:string,
    tokenId:string,
    setToken:Dispatch<SetStateAction<string>>
    setIsValidToken:Dispatch<SetStateAction<boolean>>
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NewPasswordToken ({ token, tokenId, setToken, setIsValidToken }:NewPasswordTokenProps) {
  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      setIsValidToken(true)
    }
  })
  const handleChange = (token:ForgotPasswordToken['token']) => { setToken(token) }
  const handleComplete = (token:ForgotPasswordToken['token']) => {
    const data = {
      token,
      tokenId
    }
    mutate(data)
  }
  return (
    <>
            <h1 className="text-5xl font-black text-center ">Restablecer contraseña</h1>
            <p className="text-2xl font-light text-center mt-5 ">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold">por e-mail</span>
            </p>
            <form
                className="space-y-8 p-10 rounded-lg mt-5 w-full"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-2 md:gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="size-12 p-3 rounded-lg border-ship-gray-500 border placeholder-ship-gray-50" />
                        <PinInputField className="size-12 p-3 rounded-lg border-ship-gray-500 border placeholder-ship-gray-50" />
                        <PinInputField className="size-12 p-3 rounded-lg border-ship-gray-500 border placeholder-ship-gray-50" />
                        <PinInputField className="size-12 p-3 rounded-lg border-ship-gray-500 border placeholder-ship-gray-50" />
                        <PinInputField className="size-12 p-3 rounded-lg border-ship-gray-500 border placeholder-ship-gray-50" />
                        <PinInputField className="size-12 p-3 rounded-lg border-ship-gray-500 border placeholder-ship-gray-50" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4 items-center">
                <Link
                    to='/auth/forgotPassword'
                    className="text-center bg-envy-950 text-ship-gray-50 w-fit px-8 py-4 text-lg rounded-md"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
  )
}
